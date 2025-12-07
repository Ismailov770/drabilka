"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { SelectField } from "@/components/select-field"
import { ApiError, get, post } from "@/styles/lib/api"

type PayrollRecord = {
  id: string
  employee: string
  department: string
  role: string
  month: string
  baseSalary: number
  overtime: number
  deductions: number
  total: number
  advance: number
  remaining: number
  status: string
  payoutDate: string
}

type PayrollFiltersResponse = {
  departments?: string[]
  statuses?: string[]
}

type PayrollPayment = {
  id: string
  amount: number
  paymentDate: string
  notes?: string | null
  createdBy: string
  createdAt: string
}

type AuthUser = {
  id: string
  username: string
  role: string
  name: string
}

function mapPayrollDtoToRecord(item: any): PayrollRecord {
  const id = item.id ?? item.payrollId ?? ""

  const employeeName =
    item.employee ??
    item.employeeName ??
    item.fullName ??
    item.name ??
    (item.employeeCode ? String(item.employeeCode) : "UNKNOWN")

  const department = item.department ?? item.departmentName ?? "-"
  const role = item.role ?? item.position ?? ""

  const month =
    item.month ??
    item.monthLabel ??
    (item.year != null && item.monthNumber != null ? `${item.year} M${String(item.monthNumber).padStart(2, "0")}` : "")

  const baseSalary = item.baseSalary ?? item.salary ?? 0
  const overtime = item.overtime ?? 0
  const deductions = item.deductions ?? 0
  const total = item.total ?? item.totalSalary ?? baseSalary
  const advance = item.advance ?? 0
  const remaining = item.remaining ?? total - advance
  const status = item.status ?? ""
  const payoutDate = item.payoutDate ?? item.date ?? item.loggedAt ?? item.createdAt ?? ""

  return {
    id: String(id),
    employee: employeeName,
    department,
    role,
    month,
    baseSalary,
    overtime,
    deductions,
    total,
    advance,
    remaining,
    status,
    payoutDate,
  }
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "employee", label: "Xodim", sortable: true },
  { key: "role", label: "Lavozim", sortable: false },
  { key: "month", label: "Oyi", sortable: true },
  { key: "baseSalary", label: "Asosiy oylik (so'm)", sortable: true },
  { key: "overtime", label: "Qo'shimcha (so'm)", sortable: true },
  { key: "deductions", label: "Ushlab qolinishi (so'm)", sortable: true },
  { key: "total", label: "Umumiy oyligi (so'm)", sortable: true },
  { key: "advance", label: "Olgan avansi (so'm)", sortable: true },
  { key: "remaining", label: "Qoldiq (so'm)", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "payoutDate", label: "To'lov sanasi", sortable: true },
]

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
})

const today = new Date()
const currentYear = today.getFullYear()
const defaultDateFrom = ""
const defaultDateTo = ""

const isCashierRole = (role: string | undefined | null) => (role ?? "").toLowerCase() === "cashier"

export default function CashierPayrollPage() {
  const [filters, setFilters] = useState({
    dateFrom: defaultDateFrom,
    dateTo: defaultDateTo,
    status: "all",
  })
  const [records, setRecords] = useState<PayrollRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPaySalaryModalOpen, setIsPaySalaryModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollRecord | null>(null)
  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentDate: "",
    notes: "",
  })
  const [payError, setPayError] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [payrollStatuses, setPayrollStatuses] = useState<string[]>([])
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [paymentsByPayrollId, setPaymentsByPayrollId] = useState<Record<string, PayrollPayment[]>>({})
  const [openPaymentsPayrollId, setOpenPaymentsPayrollId] = useState<string | null>(null)
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false)
  const [paymentsError, setPaymentsError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("authUser")
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed && parsed.username && parsed.role) {
        setCurrentUser({
          id: String(parsed.id ?? ""),
          username: String(parsed.username),
          role: String(parsed.role),
          name: String(parsed.name ?? parsed.username ?? ""),
        })
      }
    } catch {
    }
  }, [])

  const fetchPayroll = async (override?: { dateFrom?: string; dateTo?: string; status?: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      const effectiveFilters = {
        ...filters,
        ...override,
      }

      const response = await get<any[] | { items?: any[] }>("/payroll", {
        params: {
          dateFrom: effectiveFilters.dateFrom || undefined,
          dateTo: effectiveFilters.dateTo || undefined,
          status: effectiveFilters.status === "all" ? undefined : effectiveFilters.status,
        },
      })

      const items = Array.isArray(response) ? response : response.items ?? []
      setRecords(items.map((item) => mapPayrollDtoToRecord(item)))
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) || err.message || "Oylik yozuvlarini yuklashda xatolik yuz berdi"
        setError(backendMessage)
      } else {
        setError("Oylik yozuvlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPayroll()
  }, [filters.dateFrom, filters.dateTo, filters.status])

  useEffect(() => {
    let cancelled = false

    const fetchMeta = async () => {
      try {
        const filtersResponse = await get<PayrollFiltersResponse>("/payroll/filters")
        if (cancelled) return
        const payrollStats = filtersResponse.statuses ?? []
        setPayrollStatuses(payrollStats)
      } catch {
      }
    }

    fetchMeta()

    return () => {
      cancelled = true
    }
  }, [])

  const withinRange = (dateStr: string) => {
    const hasFrom = !!filters.dateFrom
    const hasTo = !!filters.dateTo

    if (!hasFrom && !hasTo) {
      return true
    }

    if (!dateStr) {
      return false
    }

    const current = new Date(dateStr).getTime()
    const from = hasFrom ? new Date(filters.dateFrom).getTime() : undefined
    const to = hasTo ? new Date(filters.dateTo).getTime() : undefined
    const afterFrom = typeof from === "number" ? current >= from : true
    const beforeTo = typeof to === "number" ? current <= to : true
    return afterFrom && beforeTo
  }

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesStatus = filters.status === "all" || record.status === filters.status
        return matchesStatus && withinRange(record.payoutDate)
      }),
    [records, filters.status, filters.dateFrom, filters.dateTo],
  )

  const totals = filteredRecords.reduce(
    (acc, record) => {
      acc.total += record.total
      acc.count += 1
      return acc
    },
    { total: 0, count: 0 },
  )

  const avgSalary = totals.count ? totals.total / totals.count : 0

  const handleOpenPaymentsHistory = async (record: PayrollRecord) => {
    const payrollId = record.id
    setPaymentsError(null)
    setOpenPaymentsPayrollId(payrollId)

    if (paymentsByPayrollId[payrollId]) {
      return
    }

    setIsPaymentsLoading(true)
    try {
      const response = await get<PayrollPayment[] | { items?: PayrollPayment[] }>(`/payroll/${payrollId}/payments`)
      const items = Array.isArray(response) ? response : response.items ?? []
      setPaymentsByPayrollId((prev) => ({
        ...prev,
        [payrollId]: items,
      }))
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) ||
          err.message ||
          "To'lovlar tarixini yuklashda xatolik yuz berdi"
        setPaymentsError(backendMessage)
      } else {
        setPaymentsError("To'lovlar tarixini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } finally {
      setIsPaymentsLoading(false)
    }
  }

  const getRecipientRestrictionMessage = (record: PayrollRecord): string | null => {
    if (isCashierRole(record.role)) {
      return "Kassir boshqa kassirlarga ish haqi bera olmaydi"
    }

    if (currentUser) {
      const employeeLower = (record.employee || "").toLowerCase()
      const currentNameLower = (currentUser.name || "").toLowerCase()
      const currentUsernameLower = (currentUser.username || "").toLowerCase()

      if (employeeLower && (employeeLower === currentNameLower || employeeLower === currentUsernameLower)) {
        return "Kassir o'ziga o'zi ish haqi bera olmaydi"
      }
    }

    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Ishchilar oyligi</h1>
        <p className="text-[#64748B] mt-1">Bo'limlar kesimidagi to'lovlar holati</p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Boshlanish sanasi</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Tugash sanasi</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Status</label>
            <SelectField
              value={filters.status}
              onChange={(status) => setFilters((prev) => ({ ...prev, status }))}
              options={[
                { value: "all", label: "Barchasi" },
                ...payrollStatuses.map((s) => ({ value: s, label: s })),
              ]}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setFilters({
                dateFrom: "",
                dateTo: "",
                status: "all",
              })
            }
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9] mt-2"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">Ish haqi ro'yxati</h2>
          <div className="text-sm text-[#64748B]">
            O'rtacha oylik: <span className="font-semibold text-[#0F172A]">{currencyFormatter.format(avgSalary)} so'm</span>
          </div>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {isLoading && !error && <p className="mb-4 text-sm text-[#64748B]">Yuklanmoqda...</p>}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["id", "employee", "department", "role", "status"]}
          renderCell={(row, col) => {
            if (
              col.key === "total" ||
              col.key === "advance" ||
              col.key === "baseSalary" ||
              col.key === "overtime" ||
              col.key === "deductions"
            ) {
              return `${currencyFormatter.format(row[col.key])} so'm`
            }
            if (col.key === "remaining") {
              const remaining = row[col.key]
              const isNegative = remaining < 0
              return (
                <span className={isNegative ? "text-red-600 font-semibold" : ""}>
                  {isNegative ? "-" : ""}
                  {currencyFormatter.format(Math.abs(remaining))} so'm
                </span>
              )
            }
            return row[col.key]
          }}
          actions={(row: any) => {
            const record = row as PayrollRecord
            const restrictionMessage = getRecipientRestrictionMessage(record)

            return (
              <div className="flex items-center gap-2">
                {record.remaining > 0 && !restrictionMessage && (
                  <button
                    type="button"
                    onClick={() => {
                      const violation = getRecipientRestrictionMessage(record)
                      if (violation) {
                        setPayError(violation)
                        return
                      }

                      setPayError(null)
                      setSelectedEmployee(record)
                      setPaymentData({
                        amount: record.remaining > 0 ? record.remaining.toString() : "",
                        paymentDate: "",
                        notes: "",
                      })
                      setIsPaySalaryModalOpen(true)
                    }}
                    className="px-3 py-1 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors text-sm font-semibold"
                  >
                    Oylik berish
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleOpenPaymentsHistory(record)}
                  className="px-3 py-1 border border-[#E2E8F0] text-[#0F172A] rounded-lg hover:bg-[#F1F5F9] transition-colors text-sm font-semibold"
                >
                  To'lovlar tarixi
                </button>
              </div>
            )
          }}
          footerTotals={filteredRecords.reduce(
            (acc, record) => {
              acc.total += record.total
              acc.advance += record.advance
              acc.remaining += record.remaining
              acc.count += 1
              return acc
            },
            { total: 0, advance: 0, remaining: 0, count: 0 },
          )}
        />
      </div>

      <Modal
        isOpen={isPaySalaryModalOpen}
        title={selectedEmployee ? `${selectedEmployee.employee} uchun oylik berish` : "Oylik berish"}
        onClose={() => {
          setIsPaySalaryModalOpen(false)
          setSelectedEmployee(null)
          setPaymentData({
            amount: "",
            paymentDate: "",
            notes: "",
          })
          setPayError(null)
          setIsPaying(false)
        }}
        size="lg"
      >
        {selectedEmployee && (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!selectedEmployee) return

              const restrictionMessage = getRecipientRestrictionMessage(selectedEmployee)
              if (restrictionMessage) {
                setPayError(restrictionMessage)
                return
              }

              const amount = Number(paymentData.amount)
              setIsPaying(true)
              setPayError(null)

              try {
                const body = {
                  amount,
                  paymentDate: paymentData.paymentDate,
                  notes: paymentData.notes || undefined,
                }

                await post<PayrollRecord | { record?: PayrollRecord }>(`/payroll/${selectedEmployee.id}/pay`, body)

                await fetchPayroll()

                setIsPaySalaryModalOpen(false)
                setSelectedEmployee(null)
                setPaymentData({
                  amount: "",
                  paymentDate: new Date().toISOString().split("T")[0],
                  notes: "",
                })
              } catch (err: any) {
                if (err instanceof ApiError) {
                  const backendMessage =
                    (err.data && (err.data as any).message) ||
                    err.message ||
                    "Oylik to'lovini saqlashda xatolik yuz berdi"
                  setPayError(backendMessage)
                } else {
                  setPayError("Oylik to'lovini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
                }
              } finally {
                setIsPaying(false)
              }
            }}
            className="space-y-4"
          >
            <div className="bg-[#F8FAFC] p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Xodim:</span>
                <span className="text-sm font-semibold text-[#0F172A]">{selectedEmployee.employee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Bo'lim:</span>
                <span className="text-sm font-semibold text-[#0F172A]">{selectedEmployee.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Umumiy oyligi:</span>
                <span className="text-sm font-semibold text-[#0F172A]">
                  {currencyFormatter.format(selectedEmployee.total)} so'm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Olgan avansi:</span>
                <span className="text-sm font-semibold text-[#0F172A]">
                  {currencyFormatter.format(selectedEmployee.advance)} so'm
                </span>
              </div>
              <div className="flex justify-between border-t border-[#E2E8F0] pt-2">
                <span className="text-sm font-semibold text-[#0F172A]">Qoldiq:</span>
                <span className="text-sm font-semibold text-[#10B981]">
                  {currencyFormatter.format(selectedEmployee.remaining)} so'm
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">To'lov miqdori (so'm)</label>
              <input
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, amount: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
              <p className="text-xs text-[#64748B] mt-1">
                Qoldiq: {currencyFormatter.format(selectedEmployee.remaining)} so'm
                {selectedEmployee.remaining < 0 && (
                  <span className="text-red-600 ml-2">
                    (Qoldiqdan ko'p berilgan: {currencyFormatter.format(Math.abs(selectedEmployee.remaining))} so'm)
                  </span>
                )}
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">To'lov sanasi</label>
              <input
                type="date"
                value={paymentData.paymentDate}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, paymentDate: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Izoh (ixtiyoriy)</label>
              <textarea
                value={paymentData.notes}
                onChange={(e) => setPaymentData((prev) => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                rows={3}
                placeholder="Qo'shimcha ma'lumotlar..."
              />
            </div>

            {payError && <p className="text-sm text-red-600">{payError}</p>}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPaying}
              >
                Oylik berish
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPaySalaryModalOpen(false)
                  setSelectedEmployee(null)
                  setPaymentData({
                    amount: "",
                    paymentDate: new Date().toISOString().split("T")[0],
                    notes: "",
                  })
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Bekor qilish
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={!!openPaymentsPayrollId}
        title="To'lovlar tarixi"
        onClose={() => {
          setOpenPaymentsPayrollId(null)
          setPaymentsError(null)
          setIsPaymentsLoading(false)
        }}
        size="lg"
      >
        {openPaymentsPayrollId && (
          <div className="space-y-4">
            {paymentsError && <p className="text-sm text-red-600">{paymentsError}</p>}
            {isPaymentsLoading && !paymentsError && (
              <p className="text-sm text-[#64748B]">Yuklanmoqda...</p>
            )}
            {!isPaymentsLoading &&
              !paymentsError &&
              (!paymentsByPayrollId[openPaymentsPayrollId] ||
                paymentsByPayrollId[openPaymentsPayrollId].length === 0) && (
                <p className="text-sm text-[#64748B]">To'lovlar tarixi mavjud emas.</p>
              )}
            {!isPaymentsLoading &&
              !paymentsError &&
              paymentsByPayrollId[openPaymentsPayrollId] &&
              paymentsByPayrollId[openPaymentsPayrollId].length > 0 && (
                <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8FAFC] text-left">
                      <tr>
                        <th className="px-3 py-2 font-semibold text-[#0F172A]">To'lov sanasi</th>
                        <th className="px-3 py-2 font-semibold text-[#0F172A]">Miqdori</th>
                        <th className="px-3 py-2 font-semibold text-[#0F172A]">Izoh</th>
                        <th className="px-3 py-2 font-semibold text-[#0F172A]">Kim bergan</th>
                        <th className="px-3 py-2 font-semibold text-[#0F172A]">Yozilgan vaqti</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentsByPayrollId[openPaymentsPayrollId].map((payment) => (
                        <tr key={payment.id} className="border-t border-[#E2E8F0]">
                          <td className="px-3 py-2 align-top">
                            {payment.paymentDate ? payment.paymentDate.slice(0, 10) : ""}
                          </td>
                          <td className="px-3 py-2 align-top">
                            {currencyFormatter.format(payment.amount)} so'm
                          </td>
                          <td className="px-3 py-2 align-top">
                            {payment.notes && payment.notes.trim() !== "" ? payment.notes : "-"}
                          </td>
                          <td className="px-3 py-2 align-top">{payment.createdBy}</td>
                          <td className="px-3 py-2 align-top">
                            {payment.createdAt ? payment.createdAt.replace("T", " ").slice(0, 16) : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  )
}
