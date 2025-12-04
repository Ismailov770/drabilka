"use client"

import { DataTable } from "@/components/data-table"
import { useState } from "react"

export default function TechnicalExpensesPage() {
  const [expenses] = useState([
    {
      id: "EXP001",
      equipment: "Kiln Furnace",
      description: "Temperature sensor replacement",
      cost: 3200,
      date: "2024-01-12",
      category: "Replacement",
    },
    {
      id: "EXP002",
      equipment: "Conveyor Belt",
      description: "Belt alignment and repair",
      cost: 2500,
      date: "2024-01-14",
      category: "Maintenance",
    },
    {
      id: "EXP003",
      equipment: "Crusher Mill",
      description: "Bearing maintenance service",
      cost: 1800,
      date: "2024-01-10",
      category: "Maintenance",
    },
  ])

  const expenseData = [
    { month: "Jan", maintenance: 4200, parts: 2100, labor: 3500 },
    { month: "Feb", maintenance: 3800, parts: 1500, labor: 2800 },
    { month: "Mar", maintenance: 5100, parts: 2800, labor: 3200 },
    { month: "Apr", maintenance: 4500, parts: 2300, labor: 3000 },
    { month: "May", maintenance: 6200, parts: 3500, labor: 4100 },
    { month: "Jun", maintenance: 5800, parts: 3200, labor: 3900 },
  ]

  const columns = [
    { key: "id", label: "Expense ID", sortable: true },
    { key: "equipment", label: "Equipment", sortable: true },
    { key: "description", label: "Description", sortable: false },
    { key: "cost", label: "Cost ($)", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "category", label: "Category", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Technical Equipment Expenses</h1>
        <p className="text-[#64748B] mt-1">Track maintenance and repair costs</p>
      </div>

      {/* Expense Trend as table */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Equipment Expenses Over Time (table)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <th className="px-4 py-2 text-left font-semibold text-[#0F172A]">Month</th>
                <th className="px-4 py-2 text-right font-semibold text-[#0F172A]">Maintenance</th>
                <th className="px-4 py-2 text-right font-semibold text-[#0F172A]">Parts</th>
                <th className="px-4 py-2 text-right font-semibold text-[#0F172A]">Labor</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((row) => (
                <tr key={row.month} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                  <td className="px-4 py-2 text-[#0F172A]">{row.month}</td>
                  <td className="px-4 py-2 text-right text-[#0F172A]">${row.maintenance.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-[#0F172A]">${row.parts.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right text-[#0F172A]">${row.labor.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Expense History</h2>
        <DataTable columns={columns} data={expenses} searchableFields={["equipment", "description"]} />
      </div>
    </div>
  )
}
