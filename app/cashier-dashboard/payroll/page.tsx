"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { useState } from "react"

export default function PayrollPage() {
  const [employees] = useState([
    { id: "E001", name: "Ahmed Karim", role: "Haydovchi", salary: 2500, avans: 1000, balance: 1500, status: "To'langan" },
    {
      id: "E002",
      name: "Karim Suleiman",
      role: "Operator",
      salary: 2000,
      avans: 500,
      balance: 1500,
      status: "Kutilmoqda",
    },
    { id: "E003", name: "Omar Rashid", role: "Texnik", salary: 2200, avans: 200, balance: 2000, status: "To'langan" },
  ])

  const columns = [
    { key: "name", label: "Xodim", sortable: true },
    { key: "role", label: "Lavozim", sortable: true },
    { key: "salary", label: "Asosiy oylik ($)", sortable: true },
    { key: "avans", label: "Avans ($)", sortable: true },
    { key: "balance", label: "Qoldiq ($)", sortable: true },
    { key: "status", label: "To'lov holati", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Ish haqi boshqaruvi</h1>
        <p className="text-[#64748B] mt-1">Xodimlar oyligi va avanslarini boshqarish</p>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Xodimlar ro'yxati</h2>
        <DataTable columns={columns} data={employees} searchableFields={["name", "role"]} />
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Oylik bo'yicha amallar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="primary" size="lg" className="w-full">
            💸 Barcha oyliklarni to'lash
          </Button>
          <Button variant="secondary" size="lg" className="w-full">
            📋 Alohida xodimga to'lash
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent">
            📊 Ish haqi hisobotini chiqarish
          </Button>
        </div>
      </div>
    </div>
  )
}
