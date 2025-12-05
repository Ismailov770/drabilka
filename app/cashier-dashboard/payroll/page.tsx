"use client"

import { DataTable } from "@/components/data-table"
import { useEffect, useState } from "react"
import { ApiError, get } from "@/styles/lib/api"

type PayrollRecord = {
  id: number
  payrollCode: string
  employeeName: string
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

type PayrollRow = {
  id: string
  name: string
  role: string
  salary: number
  avans: number
  balance: number
  status: string
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState<PayrollRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchPayroll = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<PayrollRecord[] | { items?: PayrollRecord[] }>("/payroll")
        if (cancelled) return
        const items = Array.isArray(response) ? response : response.items ?? []
        const mapped: PayrollRow[] = items.map((p) => ({
          id: String(p.id),
          name: p.employeeName,
          role: p.role || p.department,
          salary: p.baseSalary,
          avans: p.advance,
          balance: p.remaining,
          status: p.status,
        }))
        setEmployees(mapped)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) ||
            err.message ||
            "Ish haqi ma'lumotlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Ish haqi ma'lumotlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
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
  }, [])

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
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable columns={columns} data={employees} searchableFields={["name", "role"]} />
      </div>
    </div>
  )
}
