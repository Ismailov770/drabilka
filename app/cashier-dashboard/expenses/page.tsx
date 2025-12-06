"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { ApiError, get, post } from "@/styles/lib/api"

type Expense = {
  id: string
  title: string
  category: string
  department: string
  amount: number
  date: string
  status?: string
}

type Employee = {
  id: number
  employeeCode: string
  fullName: string
  role: string
  department: string
  baseSalary: number
}

const today = new Date()
const currentYear = today.getFullYear()
const defaultDateFrom = ""
const defaultDateTo = ""

const columns = [
  { key: "id", label: "Hujjat", sortable: true },
  { key: "title", label: "Tavsif", sortable: false },
  { key: "category", label: "Kategoriya", sortable: true },
  { key: "department", label: "Bo'lim", sortable: true },
  { key: "amount", label: "Miqdor ($)", sortable: true },
  { key: "date", label: "Sana", sortable: true },
]

const currencyFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function OwnerExpensesPage() {
  const [filters, setFilters] = useState({
    dateFrom: defaultDateFrom,
    dateTo: defaultDateTo,
    category: "all",
    status: "all",
  })
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    title: "",
    category: "Energiya",
    department: "Ishlab chiqarish",
    amount: "",
    status: "Tasdiq kutmoqda",
    date: new Date().toISOString().split("T")[0],
    employeeName: "",
  })
  const [records, setRecords] = useState<Expense[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeesLoading, setEmployeesLoading] = useState(false)
  const [employeesLoaded, setEmployeesLoaded] = useState(false)
  const [employeesError, setEmployeesError] = useState<string | null>(null)
  const [employeeError, setEmployeeError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchExpenses = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<Expense[] | { items?: Expense[] }>("/expenses", {
          params: {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
            category: filters.category === "all" ? undefined : filters.category,
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setRecords(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Rasxodlar ro'yxatini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Rasxodlar ro'yxatini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchExpenses()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo, filters.category])

  useEffect(() => {
    if (!isAddExpenseModalOpen) return
    if (newExpense.category !== "Ish haqi") return
    if (employeesLoaded || employeesLoading) return

    let cancelled = false

    const fetchEmployees = async () => {
      setEmployeesLoading(true)
      setEmployeesError(null)
      try {
        const response = await get<Employee[] | { items?: Employee[] }>("/employees", {
          params: {
            department: "",
            role: "",
            active: true,
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setEmployees(items)
        setEmployeesLoaded(true)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Xodimlar ro'yxatini yuklashda xatolik yuz berdi"
          setEmployeesError(backendMessage)
        } else {
          setEmployeesError("Xodimlar ro'yxatini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setEmployeesLoading(false)
        }
      }
    }

    fetchEmployees()

    return () => {
      cancelled = true
    }
  }, [isAddExpenseModalOpen, newExpense.category, employeesLoaded, employeesLoading])

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
        const matchesCategory = filters.category === "all" || record.category === filters.category
        const matchesStatus = filters.status === "all" || !filters.status || record.status === filters.status
        return matchesCategory && matchesStatus && withinRange(record.date)
      }),
    [records, filters.category, filters.status, filters.dateFrom, filters.dateTo],
  )

  const totals = filteredRecords.reduce(
    (acc, record) => {
      acc.total += record.amount
      acc.count += 1
      if (!acc.byCategory[record.category]) acc.byCategory[record.category] = 0
      acc.byCategory[record.category] += record.amount
      return acc
    },
    { total: 0, count: 0, byCategory: {} as Record<string, number> },
  )

  const topCategory = Object.entries(totals.byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Ma'lumot yo'q"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Umumiy rasxodlar</h1>
        <p className="text-[#64748B] mt-1">Energiya, logistika, texnik xizmat va ish haqi bo'yicha to'liq hisobot</p>
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
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Kategoriya</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="Energiya">Energiya</option>
              <option value="Logistika">Logistika</option>
              <option value="Texnik">Texnik</option>
              <option value="Ish haqi">Ish haqi</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() =>
                setFilters({
                  dateFrom: "",
                  dateTo: "",
                  category: "all",
                  status: "all",
                })
              }
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9]"
            >
              Filtrlarni tozalash
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">Rasxodlar jurnali</h2>
          <button
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold flex items-center gap-2"
          >
            <span>+</span>
            <span>Yangi rasxod</span>
          </button>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {isLoading && !error && (
          <p className="mb-4 text-sm text-[#64748B]">Yuklanmoqda...</p>
        )}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["id", "title", "category", "department"]}
          renderCell={(row, col) => {
            if (col.key === "amount") {
              return currencyFormatter.format(row[col.key])
            }
            return row[col.key]
          }}
          footerTotals={filteredRecords.reduce(
            (acc, record) => {
              acc.amount += record.amount
              acc.count += 1
              return acc
            },
            { amount: 0, count: 0 },
          )}
        />
      </div>

      <Modal
        isOpen={isAddExpenseModalOpen}
        title="Yangi rasxod kiritish"
        onClose={() => {
          setIsAddExpenseModalOpen(false)
          setNewExpense({
            title: "",
            category: "Energiya",
            department: "Ishlab chiqarish",
            amount: "",
            status: "Tasdiq kutmoqda",
            date: new Date().toISOString().split("T")[0],
            employeeName: "",
          })
          setSubmitError(null)
          setEmployeeError(null)
          setIsSubmitting(false)
        }}
        size="lg"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            // TODO: Add expense to records
            setIsSubmitting(true)
            setSubmitError(null)

            if (newExpense.category === "Ish haqi" && !newExpense.employeeName) {
              setEmployeeError("Xodim majburiy")
              setIsSubmitting(false)
              return
            }

            try {
              const payload = {
                title: newExpense.title,
                category: newExpense.category,
                department: newExpense.department,
                employeeName: newExpense.category === "Ish haqi" ? newExpense.employeeName : undefined,
                amount: Number(newExpense.amount) || 0,
                currency: "USD",
                date: newExpense.date,
                status: newExpense.status,
              }

              const response = await post<Expense | { expense?: Expense }>("/expenses", payload)
              const created = (response as any).expense ?? response

              setRecords((prev) => [...prev, created as Expense])

              setIsAddExpenseModalOpen(false)
              setNewExpense({
                title: "",
                category: "Energiya",
                department: "Ishlab chiqarish",
                amount: "",
                status: "Tasdiq kutmoqda",
                date: new Date().toISOString().split("T")[0],
                employeeName: "",
              })
              setEmployeeError(null)
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage =
                  (err.data && (err.data as any).message) || err.message || "Yangi rasxodni saqlashda xatolik yuz berdi"
                setSubmitError(backendMessage)
              } else {
                setSubmitError("Yangi rasxodni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
              }
            } finally {
              setIsSubmitting(false)
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Tavsif</label>
            <input
              type="text"
              value={newExpense.title}
              onChange={(e) => setNewExpense((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Masalan: Elektr energiyasi"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Kategoriya</label>
            <select
              value={newExpense.category}
              onChange={(e) => {
                const category = e.target.value
                setNewExpense((prev) => ({
                  ...prev,
                  category,
                  employeeName: category === "Ish haqi" ? prev.employeeName : "",
                }))
                setEmployeeError(null)
              }}
              className="w-full sm-select"
              required
            >
              <option value="Energiya">Energiya</option>
              <option value="Logistika">Logistika</option>
              <option value="Texnik">Texnik</option>
              <option value="Ish haqi">Ish haqi</option>
              <option value="Boshqa">Boshqa</option>
            </select>
          </div>
          {newExpense.category === "Ish haqi" && (
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Xodim</label>
              <select
                value={newExpense.employeeName}
                onChange={(e) => {
                  const employeeName = e.target.value
                  setEmployeeError(null)
                  const selected = employees.find((emp) => emp.fullName === employeeName)
                  setNewExpense((prev) => ({
                    ...prev,
                    employeeName,
                    department: selected?.department || prev.department,
                  }))
                }}
                className="w-full sm-select"
                required
              >
                <option value="" disabled>
                  Xodim tanlang
                </option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.fullName}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
              {employeeError && <p className="mt-1 text-xs text-red-600">{employeeError}</p>}
              {employeesError && <p className="mt-1 text-xs text-red-600">{employeesError}</p>}
            </div>
          )}
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Miqdor ($)</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense((prev) => ({ ...prev, amount: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>
         
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Sana</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddExpenseModalOpen(false)
                setNewExpense({
                  title: "",
                  category: "Energiya",
                  department: "Ishlab chiqarish",
                  amount: "",
                  status: "Tasdiq kutmoqda",
                  date: new Date().toISOString().split("T")[0],
                  employeeName: "",
                })
                setSubmitError(null)
                setEmployeeError(null)
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
          </div>
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        </form>
      </Modal>
    </div>
  )
}