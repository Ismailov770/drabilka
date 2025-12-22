"use client"

import { DataTable } from "@/components/data-table"
import { useState } from "react"

export default function TechnicalExpensesPage() {
  const [expenses] = useState([
    {
      id: "EXP001",
      equipment: "Pech",
      description: "Harorat sensori almashtirildi",
      cost: 3200,
      date: "2024-01-12",
      category: "Almashtirish",
    },
    {
      id: "EXP002",
      equipment: "Konveyer tasmasi",
      description: "Tasma sozlandi va ta'mirlandi",
      cost: 2500,
      date: "2024-01-14",
      category: "Texnik xizmat",
    },
    {
      id: "EXP003",
      equipment: "Tegirmon",
      description: "Podshipniklarga texnik xizmat",
      cost: 1800,
      date: "2024-01-10",
      category: "Texnik xizmat",
    },
  ])

  const expenseData = [
    { month: "Yan", maintenance: 4200, parts: 2100, labor: 3500 },
    { month: "Fev", maintenance: 3800, parts: 1500, labor: 2800 },
    { month: "Mar", maintenance: 5100, parts: 2800, labor: 3200 },
    { month: "Apr", maintenance: 4500, parts: 2300, labor: 3000 },
    { month: "May", maintenance: 6200, parts: 3500, labor: 4100 },
    { month: "Iyun", maintenance: 5800, parts: 3200, labor: 3900 },
  ]

  const columns = [
    { key: "id", label: "Xarajat ID", sortable: true },
    { key: "equipment", label: "Uskuna", sortable: true },
    { key: "description", label: "Tavsif", sortable: false },
    { key: "cost", label: "Xarajat (so'm)", sortable: true },
    { key: "date", label: "Sana", sortable: true },
    { key: "category", label: "Toifa", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] dark:text-slate-100">Texnika xarajatlari</h1>
        <p className="text-[#64748B] mt-1">Texnik xizmat va ta'mir xarajatlarini kuzatish</p>
      </div>

      {/* Expense Trend as table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] dark:text-slate-100 mb-4">Xarajatlar dinamikasi (jadval)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="px-4 py-2 text-left font-semibold text-[#0F172A] dark:text-slate-100">Oy</th>
                <th className="px-4 py-2 text-right font-semibold text-[#0F172A] dark:text-slate-100">Texnik xizmat</th>
                <th className="px-4 py-2 text-right font-semibold text-[#0F172A] dark:text-slate-100">Ehtiyot qismlar</th>
                <th className="px-4 py-2 text-right font-semibold text-[#0F172A] dark:text-slate-100">Ish haqi</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((row) => (
                <tr key={row.month} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                  <td className="px-4 py-2 text-[#0F172A] dark:text-slate-100">{row.month}</td>
                  <td className="px-4 py-2 text-right text-[#0F172A] dark:text-slate-100">{row.maintenance.toLocaleString()} so'm</td>
                  <td className="px-4 py-2 text-right text-[#0F172A] dark:text-slate-100">{row.parts.toLocaleString()} so'm</td>
                  <td className="px-4 py-2 text-right text-[#0F172A] dark:text-slate-100">{row.labor.toLocaleString()} so'm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] dark:text-slate-100 mb-4">Xarajatlar tarixi</h2>
        <DataTable columns={columns} data={expenses} searchableFields={["equipment", "description"]} />
      </div>
    </div>
  )
}
