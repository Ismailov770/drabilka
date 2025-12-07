"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { SelectField } from "@/components/select-field"
import { ApiError, get, post } from "@/styles/lib/api"

const expenseTrend = [
  { date: "2024-02-10", energy: 8600, logistics: 5200, payroll: 9400, technical: 4300 },
  { date: "2024-02-12", energy: 8900, logistics: 5400, payroll: 9500, technical: 4500 },
  { date: "2024-02-14", energy: 9100, logistics: 5600, payroll: 9600, technical: 4700 },
  { date: "2024-02-16", energy: 9400, logistics: 5800, payroll: 9700, technical: 4800 },
  { date: "2024-02-18", energy: 9700, logistics: 6000, payroll: 9900, technical: 5100 },
  { date: "2024-02-19", energy: 9900, logistics: 6200, payroll: 10000, technical: 5200 },
]

const columns = [
  { key: "id", label: "Hujjat", sortable: true },
  { key: "title", label: "Tavsif", sortable: false },
  { key: "category", label: "Kategoriya", sortable: true },
  { key: "department", label: "Bo'lim", sortable: true },
  { key: "amount", label: "Miqdor (so'm)", sortable: true },
  { key: "date", label: "Sana", sortable: true },
]

type Expense = {
  id: string
  title: string
  category: string
  department: string
  amount: number
  date: string
  status?: string
  employeeName?: string
}

const currencyFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

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
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalError, setModalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeesLoading, setEmployeesLoading] = useState(false)
  const [employeesLoaded, setEmployeesLoaded] = useState(false)
  const [employeesError, setEmployeesError] = useState<string | null>(null)
  const [employeeError, setEmployeeError] = useState<string | null>(null)

  const withinRange = (dateStr: string) => {
    const current = new Date(dateStr).getTime()
    const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined
    const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined
    const afterFrom = typeof from === "number" ? current >= from : true
    const beforeTo = typeof to === "number" ? current <= to : true
    return afterFrom && beforeTo
  }

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
        setExpenses(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage = (err.data && (err.data as any).message) || err.message || "Rasxodlarni yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Rasxodlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
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
          const backendMessage = (err.data && (err.data as any).message) || err.message || "Xodimlar ro'yxatini yuklashda xatolik yuz berdi"
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

  const filteredRecords = useMemo(
    () =>
      expenses.filter((record) => {
        const matchesCategory = filters.category === "all" || record.category === filters.category
        const matchesStatus = filters.status === "all" || record.status === filters.status
        return matchesCategory && matchesStatus && withinRange(record.date)
      }),
    [expenses, filters.category, filters.status, filters.dateFrom, filters.dateTo],
  )

  const filteredTrend = useMemo(() => expenseTrend.filter((point) => withinRange(point.date)), [filters.dateFrom, filters.dateTo])

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
        <p className="text-[#64748B] mt-1">Energiya, logistika va texnik xizmat bo'yicha to'liq hisobot</p>
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
            <SelectField
              value={filters.category}
              onChange={(category) => setFilters((prev) => ({ ...prev, category }))}
              options={[
                { value: "all", label: "Barchasi" },
                { value: "Energiya", label: "Energiya" },
                { value: "Logistika", label: "Logistika" },
                { value: "Texnik", label: "Texnik" },
                { value: "Boshqa", label: "Boshqa" },
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
                category: "all",
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
          <h2 className="text-lg font-semibold text-[#0F172A]">Rasxodlar jurnali</h2>
          <button
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold flex items-center gap-2"
          >
            <span>+</span>
            <span>Yangi rasxod</span>
          </button>
        </div>
        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["id", "title", "category", "department", "status"]}
          renderCell={(row, col) => {
            if (col.key === "amount") {
              return `${currencyFormatter.format(row[col.key])} so'm`
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
          setEmployeeError(null)
          setModalError(null)
          setIsSubmitting(false)
        }}
        size="lg"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setModalError(null)
            setIsSubmitting(true)
            setEmployeeError(null)

            try {
              const payload = {
                title: newExpense.title,
                category: newExpense.category,
                department: newExpense.department,
                amount: Number(newExpense.amount) || 0,
                currency: "UZS",
                date: newExpense.date,
                status: newExpense.status,
              }

              const response = await post<Expense | { expense?: Expense }>("/expenses", payload)
              const created = (response as any).expense ?? response

              setExpenses((prev) => [...prev, created as Expense])

              // TODO: Add expense to records
              alert(`Yangi rasxod qo'shildi: ${created.title} - ${currencyFormatter.format((created as Expense).amount)} so'm`)
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
                const backendMessage = (err.data && (err.data as any).message) || err.message || "Rasxodni saqlashda xatolik yuz berdi"
                if (err.status === 400 && err.data && (err.data as any).code === "VALIDATION_EXCEPTION") {
                  setModalError("Ish haqi faqat ishchilar oyligi sahifasi orqali kiritiladi")
                } else {
                  setModalError(backendMessage)
                }
              } else {
                setModalError("Rasxodni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
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
            <SelectField
              value={newExpense.category}
              onChange={(category) => {
                setEmployeeError(null)
                setNewExpense((prev) => ({
                  ...prev,
                  category,
                  employeeName: "",
                }))
              }}
              options={[
                { value: "Energiya", label: "Energiya" },
                { value: "Logistika", label: "Logistika" },
                { value: "Texnik", label: "Texnik" },
                { value: "Boshqa", label: "Boshqa" },
              ]}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Miqdor (so'm)</label>
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
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold"
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
                setEmployeeError(null)
                setModalError(null)
                setIsSubmitting(false)
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
          </div>
          {modalError && <p className="text-sm text-red-600">{modalError}</p>}
        </form>
      </Modal>
    </div>
  )
}