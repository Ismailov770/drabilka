"use client"

import { Button } from "@/components/button"
import { useState } from "react"
import { Modal } from "@/components/modal"
import { DataTable } from "@/components/data-table"
import { printSaleReceipt } from "@/components/print-receipt"

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
  materialType: "Material Turi",
  weight: "Og'irligi (tonna)",
  pricePerTon: "Bir Tonnaga Narx ($)",
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

export default function CashierDashboard() {
  const [showSaleModal, setShowSaleModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showExpenseTable, setShowExpenseTable] = useState(false)
  const [selectedExpenseFilter, setSelectedExpenseFilter] = useState("all")
  const [newExpenseType, setNewExpenseType] = useState(UZBEK_CONTENT.employeeSalary)
  const [newExpenseEmployee, setNewExpenseEmployee] = useState("")

  const employees = [
    {
      name: "Ahmet K.",
      salary: 3000,
      paidAdvance: 500,
      totalExpense: 3500,
      date: "2024-11-24",
    },
    {
      name: "Karim S.",
      salary: 2800,
      paidAdvance: 300,
      totalExpense: 3100,
      date: "2024-11-24",
    },
    {
      name: "Omar R.",
      salary: 3200,
      paidAdvance: 600,
      totalExpense: 3800,
      date: "2024-11-24",
    },
    {
      name: "Dilshod T.",
      salary: 2600,
      paidAdvance: 200,
      totalExpense: 2800,
      date: "2024-11-24",
    },
  ]

  const allExpenses = [
    { type: "Oyliq", employee: "Ahmet K.", amount: 3000, date: "2024-11-24", description: "Noyabr oyligi" },
    {
      type: "Ehtyot",
      employee: "Karim S.",
      amount: 300,
      date: "2024-11-23",
      description: "Avanslangan ehtyot",
    },
    {
      type: "Solyarka",
      employee: "Truck-001",
      amount: 1200,
      date: "2024-11-23",
      description: "Solyarka to'ldirish",
    },
    { type: "Yo'l", employee: "Omar R.", amount: 450, date: "2024-11-22", description: "Transport xarajatlari" },
    { type: "Boshqa", employee: "System", amount: 800, date: "2024-11-22", description: "Ish stoli ta'mirlash" },
    { type: "Oyliq", employee: "Dilshod T.", amount: 2600, date: "2024-11-21", description: "Oktabr oyligi" },
  ]

  // Sales state for dashboard — includes paymentType (cash/credit)
  const [sales, setSales] = useState([
    { id: "S001", client: "ABC Company", material: "Oddiy sement", weight: 50, price: 8500, date: "2024-01-15", employee: "Fatima", paymentType: "Naqd" },
    { id: "S002", client: "XYZ Corp", material: "Tez qotuvchi sement", weight: 30, price: 5400, date: "2024-01-15", employee: "Ahmed", paymentType: "Qarzga" },
  ])

  // New sale form state
  const [newClient, setNewClient] = useState("")
  const [newMaterial, setNewMaterial] = useState("Oddiy sement")
  const [newWeight, setNewWeight] = useState<number | "">("")
  const [newPrice, setNewPrice] = useState<number | "">("")
  const [newPaymentType, setNewPaymentType] = useState("Naqd")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{UZBEK_CONTENT.dashboard}</h1>
        <p className="text-sm text-slate-500 mt-1">{UZBEK_CONTENT.financialOverview}</p>
      </div>

      {/* Employees & Expenses Overview */}
      {/* Sales Table (dashboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employees Overview */}
        <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
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
                {employees.map((emp) => (
                  <tr key={emp.name} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-3 text-slate-900 font-medium">{emp.name}</td>
                    <td className="px-3 py-3 text-slate-700">{emp.salary} $</td>
                    <td className="px-3 py-3 text-slate-700">{emp.paidAdvance} $</td>
                    <td className="px-3 py-3 font-semibold text-blue-600">{emp.totalExpense} $</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advances Overview */}
        <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">{UZBEK_CONTENT.advances}</h2>
          <div className="space-y-3">
            {employees.map((emp) => (
              <div
                key={emp.name}
                className="flex justify-between items-center p-3 border border-slate-100 rounded-lg hover:bg-slate-50"
              >
                <div>
                  <p className="font-medium text-slate-900">{emp.name}</p>
                  <p className="text-sm text-slate-500">{emp.date}</p>
                </div>
                <span className="font-semibold text-amber-600">{emp.paidAdvance} $</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Expenses Table */}
      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-900">{UZBEK_CONTENT.expenseTable}</h2>
          <div className="flex gap-2">
            <select
              value={selectedExpenseFilter}
              onChange={(e) => setSelectedExpenseFilter(e.target.value)}
              className="sm-select text-sm"
            >
              <option value="all">Barcha rasxodlar</option>
              <option value="salary">Oyliq</option>
              <option value="advance">Ehtyot</option>
              <option value="fuel">Solyarka</option>
              <option value="road">Yo'l</option>
              <option value="other">Boshqa</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
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
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
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
                    <td className="px-4 py-3 text-right text-slate-900 font-semibold">{exp.amount} $</td>
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
          onSubmit={(e) => {
            e.preventDefault()
            const id = `S${(sales.length + 1).toString().padStart(3, "0")}`
            const sale = {
              id,
              client: newClient || "Tasodifiy mijoz",
              material: newMaterial,
              weight: Number(newWeight) || 0,
              price: Number(newPrice) || 0,
              date: new Date().toISOString().slice(0, 10),
              employee: "cashier",
              paymentType: newPaymentType,
            }
            setSales((prev) => [sale, ...prev])
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
            <select
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              className="w-full sm-select"
            >
              <option>Oddiy sement</option>
              <option>Tez qotuvchi sement</option>
            </select>
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
            <select
              value={newPaymentType}
              onChange={(e) => setNewPaymentType(e.target.value)}
              className="w-full sm-select"
            >
              <option value="Naqd">{UZBEK_CONTENT.cash}</option>
              <option value="Qarzga">Qarzga</option>
            </select>
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
            <select
              value={newExpenseType}
              onChange={(e) => {
                const value = e.target.value
                setNewExpenseType(value)
                if (value === UZBEK_CONTENT.employeeSalary) {
                  setNewExpenseEmployee(employees[0]?.name ?? "")
                } else {
                  setNewExpenseEmployee("")
                }
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value={UZBEK_CONTENT.employeeSalary}>{UZBEK_CONTENT.employeeSalary}</option>
              <option value={UZBEK_CONTENT.avans}>{UZBEK_CONTENT.avans}</option>
              <option value={UZBEK_CONTENT.fuel}>{UZBEK_CONTENT.fuel}</option>
              <option value={UZBEK_CONTENT.road}>{UZBEK_CONTENT.road}</option>
              <option value={UZBEK_CONTENT.other}>{UZBEK_CONTENT.other}</option>
            </select>
          </div>
          {newExpenseType === UZBEK_CONTENT.employeeSalary && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.employeeName}</label>
              <select
                value={newExpenseEmployee}
                onChange={(e) => setNewExpenseEmployee(e.target.value)}
                className="w-full sm-select"
              >
                {employees.map((emp) => (
                  <option key={emp.name} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          )}
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
