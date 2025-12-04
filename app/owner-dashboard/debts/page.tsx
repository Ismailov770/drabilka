"use client"

import { useEffect, useMemo, useState } from "react"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import { CreditCard, Hourglass } from "lucide-react"
import { ApiError, get } from "@/styles/lib/api"

type Debt = {
  id: string
  company: string
  saleId: string
  amountDue: number
  outstanding: number
  dueDate: string
  status: string
  notes?: string
  lastPayment?: {
    amount: number
    type: string
    at: string
  }
}

export default function OwnerDebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchDebts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<Debt[] | { items?: Debt[] }>("/debts")
        if (cancelled) return
        const items = Array.isArray(response) ? response : response.items ?? []
        setDebts(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage = (err.data && (err.data as any).message) || err.message || "Qarzlarni yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Qarzlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchDebts()

    return () => {
      cancelled = true
    }
  }, [])

  const grouping = useMemo(() => {
    const map = new Map<string, { totalDue: number; outstanding: number; count: number }>()
    for (const d of debts) {
      const cur = map.get(d.company) || { totalDue: 0, outstanding: 0, count: 0 }
      cur.totalDue += d.amountDue
      cur.outstanding += d.outstanding
      cur.count += 1
      map.set(d.company, cur)
    }
    return Array.from(map.entries()).map(([company, data]) => ({ company, ...data }))
  }, [debts])

  const totals = useMemo(() => {
    const totalAmount = debts.reduce((sum, d) => sum + d.amountDue, 0)
    const totalOutstanding = debts.reduce((sum, d) => sum + d.outstanding, 0)
    return { totalAmount, totalOutstanding }
  }, [debts])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Owner — Debts Overview</h1>
        <p className="text-sm text-slate-500 mt-1">
          Aggregated view of credits and outstanding balances by company.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label="Total owed"
          value={`$${totals.totalAmount.toLocaleString()}`}
          icon={<CreditCard className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          label="Outstanding"
          value={`$${totals.totalOutstanding.toLocaleString()}`}
          icon={<Hourglass className="w-5 h-5" />}
          color="red"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-lg font-semibold text-slate-900">By Company</h2>
          <p className="text-sm text-slate-500">Grouped view of debts by client company.</p>
        </div>

        <DataTable
          columns={[
            { key: "company", label: "Company" },
            { key: "count", label: "Count" },
            { key: "totalDue", label: "Total Due" },
            { key: "outstanding", label: "Outstanding" },
          ]}
          data={grouping.map((g) => ({
            company: g.company,
            count: g.count,
            totalDue: `$${g.totalDue.toLocaleString()}`,
            outstanding: `$${g.outstanding.toLocaleString()}`,
          }))}
        />
      </div>
    </div>
  )
}
