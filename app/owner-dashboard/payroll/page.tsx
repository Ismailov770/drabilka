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

type Employee = {
  id: number
  employeeCode: string
  fullName: string
  role: string
  department: string
  baseSalary: number
}

type PayrollFiltersResponse = {
  departments?: string[]
  statuses?: string[]
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "employee", label: "Xodim", sortable: true },
  { key: "department", label: "Bo'lim", sortable: true },
  { key: "role", label: "Lavozim", sortable: false },
  { key: "month", label: "Oyi", sortable: true },
  { key: "total", label: "Umumiy oyligi ($)", sortable: true },
  { key: "advance", label: "Olgan avansi ($)", sortable: true },
  { key: "remaining", label: "Qoldiq ($)", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "payoutDate", label: "To'lov sanasi", sortable: true },
]

const currencyFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function OwnerPayrollPage() {
  const [filters, setFilters] = useState({
    dateFrom: "2024-02-15",
    dateTo: "2024-02-19",
    department: "all",
    status: "all",
  })
  const [records, setRecords] = useState<PayrollRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPaySalaryModalOpen, setIsPaySalaryModalOpen] = useState(false)
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<PayrollRecord | null>(null)
  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const [newEmployee, setNewEmployee] = useState({
    employeeId: "",
    employee: "",
    department: "",
    role: "",
    month: new Date().toLocaleDateString("uz-UZ", { month: "long", year: "numeric" }),
    baseSalary: "",
    overtime: "",
    deductions: "",
    advance: "",
  })
  const [payError, setPayError] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [addEmployeeError, setAddEmployeeError] = useState<string | null>(null)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [payrollDepartments, setPayrollDepartments] = useState<string[]>([])
  const [payrollStatuses, setPayrollStatuses] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false

    const fetchPayroll = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<PayrollRecord[] | { items?: PayrollRecord[] }>("/payroll", {
          params: {
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo,
            department: filters.department === "all" ? undefined : filters.department,
            status: filters.status === "all" ? undefined : filters.status,
          },
        })
        if (cancelled) return
        const items = Array.isArray(response) ? response : response.items ?? []
        setRecords(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Oylik yozuvlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Oylik yozuvlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchPayroll()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo, filters.department, filters.status])

  useEffect(() => {
    let cancelled = false

    const fetchMeta = async () => {
      try {
        const [filtersResponse, employeesResponse, employeesFiltersResponse] = await Promise.all([
          get<PayrollFiltersResponse>("/payroll/filters"),
          get<Employee[] | { items?: Employee[] }>("/employees", {
            params: {
              department: "",
              role: "",
              active: true,
            },
          }),
          get<{ departments: string[]; roles: string[] }>("/employees/filters"),
        ])

        if (cancelled) return

        const payrollDeps = filtersResponse.departments ?? []
        const payrollStats = filtersResponse.statuses ?? []
        setPayrollDepartments(payrollDeps)
        setPayrollStatuses(payrollStats)

        const employeeItems = Array.isArray(employeesResponse)
          ? employeesResponse
          : employeesResponse.items ?? []
        setEmployees(employeeItems)

        // If department not yet set in new employee state, default from first department filter
        setNewEmployee((prev) => ({
          ...prev,
          department: prev.department || employeesFiltersResponse.departments?.[0] || "",
          role: prev.role || employeesFiltersResponse.roles?.[0] || "",
        }))
      } catch {
      }
    }

    fetchMeta()

    return () => {
      cancelled = true
    }
  }, [])

  const withinRange = (dateStr: string) => {
    const current = new Date(dateStr).getTime()
    const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined
    const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined
    const afterFrom = typeof from === "number" ? current >= from : true
    const beforeTo = typeof to === "number" ? current <= to : true
    return afterFrom && beforeTo
  }

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesDept = filters.department === "all" || record.department === filters.department
        const matchesStatus = filters.status === "all" || record.status === filters.status
        return matchesDept && matchesStatus && withinRange(record.payoutDate)
      }),
    [records, filters.department, filters.status, filters.dateFrom, filters.dateTo],
  )

  const totals = filteredRecords.reduce(
    (acc, record) => {
      acc.total += record.total
      acc.count += 1
      if (!acc.byDepartment[record.department]) acc.byDepartment[record.department] = 0
      acc.byDepartment[record.department] += record.total
      return acc
    },
    { total: 0, count: 0, byDepartment: {} as Record<string, number> },
  )

  const avgSalary = totals.count ? totals.total / totals.count : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Ishchilar oyligi</h1>
        <p className="text-[#64748B] mt-1">Bo'limlar kesimidagi to'lovlar holati</p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Bo'lim</label>
            <SelectField
              value={filters.department}
              onChange={(department) => setFilters((prev) => ({ ...prev, department }))}
              options={[
                { value: "all", label: "Barchasi" },
                ...payrollDepartments.map((d) => ({ value: d, label: d })),
              ]}
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
      </div>



      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">Ish haqi ro'yxati</h2>
          <button
            onClick={() => setIsAddEmployeeModalOpen(true)}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold flex items-center gap-2"
          >
            <span>+</span>
            <span>Yangi ishchini ishga olish</span>
          </button>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["id", "employee", "department", "role", "status"]}
          renderCell={(row, col) => {
            if (col.key === "total" || col.key === "advance") {
              return currencyFormatter.format(row[col.key])
            }
            if (col.key === "remaining") {
              const remaining = row[col.key]
              const isNegative = remaining < 0
              return (
                <span className={isNegative ? "text-red-600 font-semibold" : ""}>
                  {isNegative ? "-" : ""}
                  {currencyFormatter.format(Math.abs(remaining))}
                </span>
              )
            }
            return row[col.key]
          }}
          actions={(row: any) => (
            <button
              onClick={() => {
                setPayError(null)
                setSelectedEmployee(row as PayrollRecord)
                setPaymentData({
                  amount: row.remaining > 0 ? row.remaining.toString() : "",
                  paymentDate: new Date().toISOString().split("T")[0],
                  notes: "",
                })
                setIsPaySalaryModalOpen(true)
              }}
              className="px-3 py-1 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors text-sm font-semibold"
            >
              Oylik berish
            </button>
          )}
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
            paymentDate: new Date().toISOString().split("T")[0],
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
              const amount = Number(paymentData.amount)
              setIsPaying(true)
              setPayError(null)

              try {
                const body = {
                  amount,
                  paymentDate: paymentData.paymentDate,
                  notes: paymentData.notes || undefined,
                }

                const response = await post<PayrollRecord | { record?: PayrollRecord }>(
                  `/payroll/${selectedEmployee.id}/pay`,
                  body,
                )
                const updated = (response as any).record ?? response

                setRecords((prev) => prev.map((r) => (r.id === updated.id ? (updated as PayrollRecord) : r)))

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
                <span className="text-sm font-semibold text-[#0F172A]">{currencyFormatter.format(selectedEmployee.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#64748B]">Olgan avansi:</span>
                <span className="text-sm font-semibold text-[#0F172A]">{currencyFormatter.format(selectedEmployee.advance)}</span>
              </div>
              <div className="flex justify-between border-t border-[#E2E8F0] pt-2">
                <span className="text-sm font-semibold text-[#0F172A]">Qoldiq:</span>
                <span className="text-sm font-semibold text-[#10B981]">{currencyFormatter.format(selectedEmployee.remaining)}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">To'lov miqdori ($)</label>
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
                Qoldiq: {currencyFormatter.format(selectedEmployee.remaining)}
                {selectedEmployee.remaining < 0 && (
                  <span className="text-red-600 ml-2">(Qoldiqdan ko'p berilgan: {currencyFormatter.format(Math.abs(selectedEmployee.remaining))})</span>
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
        isOpen={isAddEmployeeModalOpen}
        title="Yangi ishchini ishga olish"
        onClose={() => {
          setIsAddEmployeeModalOpen(false)
          setNewEmployee({
            employeeId: "",
            employee: "",
            department: "",
            role: "",
            month: new Date().toLocaleDateString("uz-UZ", { month: "long", year: "numeric" }),
            baseSalary: "",
            overtime: "",
            deductions: "",
            advance: "",
          })
          setAddEmployeeError(null)
          setIsAddingEmployee(false)
        }}
        size="lg"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setIsAddingEmployee(true)
            setAddEmployeeError(null)

            try {
              if (!newEmployee.employeeId) {
                setAddEmployeeError("Xodim tanlanmagan")
                return
              }

              const selected = employees.find((e) => String(e.id) === newEmployee.employeeId)

              const now = new Date()
              const year = now.getFullYear()
              const month = now.getMonth() + 1
              const monthLabel = `${year} M${String(month).padStart(2, "0")}`

              const payload = {
                employeeId: Number(newEmployee.employeeId),
                year,
                month,
                monthLabel,
                baseSalary:
                  newEmployee.baseSalary !== "" ? Number(newEmployee.baseSalary) || 0 : selected?.baseSalary || 0,
                overtime: Number(newEmployee.overtime) || 0,
                deductions: Number(newEmployee.deductions) || 0,
                advance: Number(newEmployee.advance) || 0,
              }

              await post("/payroll", payload)

              try {
                const response = await get<PayrollRecord[] | { items?: PayrollRecord[] }>("/payroll", {
                  params: {
                    dateFrom: filters.dateFrom,
                    dateTo: filters.dateTo,
                    department: filters.department === "all" ? undefined : filters.department,
                    status: filters.status === "all" ? undefined : filters.status,
                  },
                })
                const items = Array.isArray(response) ? response : response.items ?? []
                setRecords(items)
              } catch {
              }

              setIsAddEmployeeModalOpen(false)
              setNewEmployee({
                employeeId: "",
                employee: "",
                department: "",
                role: "",
                month: new Date().toLocaleDateString("uz-UZ", { month: "long", year: "numeric" }),
                baseSalary: "",
                overtime: "",
                deductions: "",
                advance: "",
              })
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage =
                  (err.data && (err.data as any).message) || err.message || "Yangi ishchini saqlashda xatolik yuz berdi"
                setAddEmployeeError(backendMessage)
              } else {
                setAddEmployeeError("Yangi ishchini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
              }
            } finally {
              setIsAddingEmployee(false)
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Xodim ismi</label>
            <SelectField
              value={newEmployee.employeeId}
              onChange={(employeeId) => {
                const selected = employees.find((e) => String(e.id) === employeeId)
                setNewEmployee((prev) => ({
                  ...prev,
                  employeeId,
                  employee: selected?.fullName || "",
                  department: selected?.department || prev.department,
                  role: selected?.role || prev.role,
                  baseSalary:
                    prev.baseSalary || (selected?.baseSalary != null ? String(selected.baseSalary) : prev.baseSalary),
                }))
              }}
              options={employees.map((e) => ({
                value: String(e.id),
                label: `${e.fullName} (${e.employeeCode})`,
              }))}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Bo'lim</label>
            <div className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-slate-50 text-sm text-[#0F172A]">
              {newEmployee.department || "Xodim tanlang"}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Lavozim</label>
            <div className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg bg-slate-50 text-sm text-[#0F172A]">
              {newEmployee.role || "Xodim tanlang"}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Oyi</label>
            <input
              type="text"
              value={newEmployee.month}
              onChange={(e) => setNewEmployee((prev) => ({ ...prev, month: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Masalan: Fevral 2024"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Asosiy oylik ($)</label>
            <input
              type="number"
              value={newEmployee.baseSalary}
              onChange={(e) => setNewEmployee((prev) => ({ ...prev, baseSalary: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Qo'shimcha ish ($)</label>
            <input
              type="number"
              value={newEmployee.overtime}
              onChange={(e) => setNewEmployee((prev) => ({ ...prev, overtime: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Chegirmalar ($)</label>
            <input
              type="number"
              value={newEmployee.deductions}
              onChange={(e) => setNewEmployee((prev) => ({ ...prev, deductions: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Olgan avansi ($)</label>
            <input
              type="number"
              value={newEmployee.advance}
              onChange={(e) => setNewEmployee((prev) => ({ ...prev, advance: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAddingEmployee}
            >
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddEmployeeModalOpen(false)
                setNewEmployee({
                  employeeId: "",
                  employee: "",
                  department: "",
                  role: "",
                  month: new Date().toLocaleDateString("uz-UZ", { month: "long", year: "numeric" }),
                  baseSalary: "",
                  overtime: "",
                  deductions: "",
                  advance: "",
                })
                setAddEmployeeError(null)
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
          </div>
          {addEmployeeError && <p className="text-sm text-red-600">{addEmployeeError}</p>}
        </form>
      </Modal>
    </div>
  )
}

