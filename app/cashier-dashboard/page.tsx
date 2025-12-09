"use client"

import { Button } from "@/components/button"
import { useEffect, useState } from "react"
import { Modal } from "@/components/modal"
import { DataTable } from "@/components/data-table"
import { SelectField } from "@/components/select-field"
import { printSaleReceipt } from "@/components/print-receipt"
import { ApiError, get, post } from "@/styles/lib/api"

const UZBEK_CONTENT = {
  dashboard: "Kasser Paneli",
  financialOverview: "Moliyaviy Ko'rinish",
  totalSales: "Bugungi Umumiy Savdolar",
  totalExpenses: "Bugungi Umumiy Rasxodlar",
  cashBalance: "Naqd Balans",
  pendingTransfers: "Kutilayotgan O'tkazmallar",
  quickActions: "Tez Amallar",
  addSale: "Savdo Qo'shish",
  addExpense: "Rasxod Qo'shish",
  paySalary: "Oyliq To'lash",
  payAdvance: "Ehtyot To'lash",
  recentTransactions: "So'nggi Operatsiyalar",
  expenseTable: "Rasxodlar Jadvali",
  allExpenses: "Barcha Rasxodlar",
  filters: "Filtirlar",
  employees: "Xodimlar",
  advances: "Ehtiyotlar",
  employeeName: "Xodim Ismi",
  salary: "Oyliq",
  paidAdvance: "To'langan Ehtyot",
  totalExpense: "Jami Rasxod",
  date: "Sana",
  type: "Turi",
  amount: "Miqdor",
  description: "Tafsifi",
  salaryExpenses: "Oyliq Rasxodlari",
  advanceExpenses: "Ehtyot Rasxodlari",
  fuelExpenses: "Solyarka Rasxodlari",
  transportExpenses: "Yo'l Rasxodlari",
  otherExpenses: "Boshqa Rasxodlar",
  summaryTotalSalary: "Jami ish haqi",
  summaryTotalAdvances: "Jami avanslar",
  summaryTotalGeneralExpenses: "Jami umumiy rasxodlar",
  summaryTotalAllCosts: "Umumiy xarajatlar",
  materialType: "Material Turi",
  weight: "Hajm (m³)",
  pricePerTon: "Bir m³ ga narx (so'm)",
  clientName: "Truck nomeri",
  paymentType: "To'lov Turi",
  cash: "Naqd Pul",
  bankTransfer: "Bank O'tkazmasi",
  check: "Chek",
  expenseType: "Rasxod Turi",
  employeeSalary: "Xodim Oyligi",
  avans: "Ehtyot (Avans)",
  fuel: "Solyarka",
  road: "Yo'l/Transport",
  other: "Boshqa",
  save: "Saqlash",
}

type CashierEmployeeSummary = {
  name: string
  salary: number
  paidAdvance: number
  totalExpense: number
  date: string
}

type CashierExpenseSummary = {
  type: string
  employee: string
  amount: number
  date: string
  description: string
}

type CashierEmployeeDto = {
  employeeName: string
  baseSalary: number
  advance: number
  total: number
}

type CashierExpenseDto = {
  date: string
  type: string
  employeeName: string | null
  description: string
  amount: number
}

type CashierDashboardResponse = {
  employees: CashierEmployeeDto[]
  advances?: any[]
  expenses: CashierExpenseDto[]
}

export default function CashierDashboard() {
  const [showSaleModal, setShowSaleModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showExpenseTable, setShowExpenseTable] = useState(false)
  const [selectedExpenseFilter, setSelectedExpenseFilter] = useState("all")
  const [newExpenseType, setNewExpenseType] = useState(UZBEK_CONTENT.other)
  const [newExpenseEmployee, setNewExpenseEmployee] = useState("")
  const [employees, setEmployees] = useState<CashierEmployeeSummary[]>([])
  const [allExpenses, setAllExpenses] = useState<CashierExpenseSummary[]>([])
  const [dashboardError, setDashboardError] = useState<string | null>(null)
  const [isDashboardLoading, setIsDashboardLoading] = useState(false)

  const totalSalary = employees.reduce((sum, e) => sum + (e.salary || 0), 0)
  const totalSalaryAdvances = employees.reduce((sum, e) => sum + (e.paidAdvance || 0), 0)
  const totalGeneralExpenses = allExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)
  const totalAllCosts = totalSalary + totalGeneralExpenses

  // New sale form state
  const [newClient, setNewClient] = useState("")
  const [newMaterial, setNewMaterial] = useState("Oddiy sement")
  const [newWeight, setNewWeight] = useState<number | "">("")
  const [newPrice, setNewPrice] = useState<number | "">("")
  const [newPaymentType, setNewPaymentType] = useState("Naqd")

  useEffect(() => {
    let cancelled = false

    const fetchDashboard = async () => {
      setIsDashboardLoading(true)
      setDashboardError(null)
      try {
        const response = await get<CashierDashboardResponse | { items?: CashierDashboardResponse }>("/cashier-dashboard")
        if (cancelled) return

        const payload: CashierDashboardResponse = Array.isArray((response as any).employees)
          ? (response as CashierDashboardResponse)
          : ((response as any).items as CashierDashboardResponse)

        const employeesData: CashierEmployeeSummary[] = (payload?.employees ?? []).map((e) => ({
          name: e.employeeName,
          salary: e.baseSalary,
          paidAdvance: e.advance,
          totalExpense: e.total,
          date: "",
        }))

        const expensesData: CashierExpenseSummary[] = (payload?.expenses ?? []).map((exp) => ({
          type: exp.type,
          employee: exp.employeeName ?? "",
          amount: exp.amount,
          date: exp.date,
          description: exp.description,
        }))

        setEmployees(employeesData)
        setAllExpenses(expensesData)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message ||
            "Kassir paneli ma'lumotlarini yuklashda xatolik yuz berdi"
          setDashboardError(backendMessage)
        } else {
          setDashboardError(
            "Kassir paneli ma'lumotlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
          )
        }
      } finally {
        if (!cancelled) {
          setIsDashboardLoading(false)
        }
      }
    }

    fetchDashboard()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{UZBEK_CONTENT.dashboard}</h1>
        <p className="text-sm text-slate-500 mt-1">{UZBEK_CONTENT.financialOverview}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
          <p className="text-xs text-slate-500 mb-1">{UZBEK_CONTENT.summaryTotalSalary}</p>
          <p className="text-2xl font-semibold text-slate-900">{totalSalary.toLocaleString("uz-UZ")} so'm</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
          <p className="text-xs text-slate-500 mb-1">{UZBEK_CONTENT.summaryTotalAdvances}</p>
          <p className="text-2xl font-semibold text-amber-600">{totalSalaryAdvances.toLocaleString("uz-UZ")} so'm</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
          <p className="text-xs text-slate-500 mb-1">{UZBEK_CONTENT.summaryTotalGeneralExpenses}</p>
          <p className="text-2xl font-semibold text-rose-600">{totalGeneralExpenses.toLocaleString("uz-UZ")} so'm</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
          <p className="text-xs text-slate-500 mb-1">{UZBEK_CONTENT.summaryTotalAllCosts}</p>
          <p className="text-2xl font-semibold text-blue-600">{totalAllCosts.toLocaleString("uz-UZ")} so'm</p>
        </div>
      </div>

      {/* Employees & Expenses Overview */}
      {/* Sales Table (dashboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employees Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">{UZBEK_CONTENT.employees}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">{UZBEK_CONTENT.employeeName}</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">{UZBEK_CONTENT.salary}</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">{UZBEK_CONTENT.paidAdvance}</th>
                  <th className="text-left px-3 py-2 font-semibold text-slate-700">{UZBEK_CONTENT.totalExpense}</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-3 py-3 text-slate-900 font-medium">{emp.name}</td>
                    <td className="px-3 py-3 text-slate-700">{emp.salary.toLocaleString("uz-UZ")} so'm</td>
                    <td className="px-3 py-3 text-slate-700">{emp.paidAdvance.toLocaleString("uz-UZ")} so'm</td>
                    <td className="px-3 py-3 font-semibold text-blue-600">{emp.totalExpense.toLocaleString("uz-UZ")} so'm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advances Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">{UZBEK_CONTENT.advances}</h2>
          <div className="space-y-3">
            {employees.map((emp, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border border-slate-100 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <div>
                  <p className="font-medium text-slate-900">{emp.name}</p>
                  <p className="text-sm text-slate-500">{emp.date}</p>
                </div>
                <span className="font-semibold text-amber-600">{emp.paidAdvance.toLocaleString("uz-UZ")} so'm</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Expenses Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-900">{UZBEK_CONTENT.expenseTable}</h2>
          <div className="flex gap-2">
            <SelectField
              value={selectedExpenseFilter}
              onChange={(value) => setSelectedExpenseFilter(value)}
              options={[
                { value: "all", label: "Barcha rasxodlar" },
                { value: "salary", label: "Oyliq" },
                { value: "advance", label: "Ehtyot" },
                { value: "fuel", label: "Solyarka" },
                { value: "road", label: "Yo'l" },
                { value: "other", label: "Boshqa" },
              ]}
            />
          </div>
        </div>

        {dashboardError && <p className="mb-4 text-sm text-red-600">{dashboardError}</p>}
        {isDashboardLoading && !dashboardError && (
          <p className="mb-4 text-sm text-slate-500">Yuklanmoqda...</p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">{UZBEK_CONTENT.date}</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">{UZBEK_CONTENT.type}</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">{UZBEK_CONTENT.employeeName}</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">{UZBEK_CONTENT.description}</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">{UZBEK_CONTENT.amount}</th>
              </tr>
            </thead>
            <tbody>
              {allExpenses
                .filter(
                  (exp) =>
                    selectedExpenseFilter === "all" ||
                    (selectedExpenseFilter === "salary" && exp.type === "Oyliq") ||
                    (selectedExpenseFilter === "advance" && exp.type === "Ehtyot") ||
                    (selectedExpenseFilter === "fuel" && exp.type === "Solyarka") ||
                    (selectedExpenseFilter === "road" && exp.type === "Yo'l") ||
                    (selectedExpenseFilter === "other" && exp.type === "Boshqa"),
                )
                .map((exp, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-4 py-3 text-slate-600 text-sm">{exp.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exp.type === "Oyliq"
                            ? "bg-blue-100 text-blue-700"
                            : exp.type === "Ehtyot"
                              ? "bg-purple-100 text-purple-700"
                              : exp.type === "Solyarka"
                                ? "bg-orange-100 text-orange-700"
                                : exp.type === "Yo'l"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {exp.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-medium">{exp.employee}</td>
                    <td className="px-4 py-3 text-slate-600">{exp.description}</td>
                    <td className="px-4 py-3 text-right text-slate-900 font-semibold">{exp.amount.toLocaleString("uz-UZ")} so'm</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sale Modal */}
      <Modal isOpen={showSaleModal} title={UZBEK_CONTENT.addSale} onClose={() => setShowSaleModal(false)} size="md">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()

            try {
              const weightNumber = Number(newWeight) || 0
              const unitPriceNumber = Number(newPrice) || 0
              const totalPrice = weightNumber > 0 && unitPriceNumber > 0 ? weightNumber * unitPriceNumber : 0

              const payload = {
                client: newClient || "Naqd mijoz",
                phone: "N/A",
                material: newMaterial,
                weight: weightNumber,
                price: totalPrice,
                carNumber: newClient || "Noma'lum",
                line: "A",
                paymentType: newPaymentType,
                note: "",
              }

              await post("/sales", payload)
            } catch (err: any) {
              if (err instanceof ApiError) {
                console.error("Savdoni saqlashda xatolik:", err.data || err.message)
              } else {
                console.error("Savdoni saqlashda xatolik:", err)
              }
            }

            // Reset form
            setNewClient("")
            setNewMaterial("Oddiy sement")
            setNewWeight("")
            setNewPrice("")
            setNewPaymentType("Naqd")
            setShowSaleModal(false)
          }}
        >
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.clientName}</label>
            <input
              type="text"
              placeholder="10/O568DS"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.materialType}</label>
            <SelectField
              value={newMaterial}
              onChange={(value) => setNewMaterial(value)}
              options={[
                { value: "Oddiy sement", label: "Oddiy sement" },
                { value: "Tez qotuvchi sement", label: "Tez qotuvchi sement" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.weight}</label>
              <input
                type="number"
                placeholder="0"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.pricePerTon}</label>
              <input
                type="number"
                placeholder="0"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.paymentType}</label>
            <SelectField
              value={newPaymentType}
              onChange={(value) => setNewPaymentType(value)}
              options={[
                { value: "Naqd", label: UZBEK_CONTENT.cash },
                { value: "Qarzga", label: "Qarzga" },
              ]}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            {UZBEK_CONTENT.save}
          </Button>
        </form>
      </Modal>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        title={UZBEK_CONTENT.addExpense}
        onClose={() => setShowExpenseModal(false)}
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.expenseType}</label>
            <SelectField
              value={newExpenseType}
              onChange={(value) => {
                setNewExpenseType(value)
                setNewExpenseEmployee("")
              }}
              options={[
                { value: UZBEK_CONTENT.fuel, label: UZBEK_CONTENT.fuel },
                { value: UZBEK_CONTENT.road, label: UZBEK_CONTENT.road },
                { value: UZBEK_CONTENT.other, label: UZBEK_CONTENT.other },
              ]}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.amount}</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.description}</label>
            <textarea
              placeholder="Rasxod tafsilotlari"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            {UZBEK_CONTENT.save}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
