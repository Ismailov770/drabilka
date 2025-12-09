"use client"

import { useEffect, useMemo, useState } from "react"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { CreditCard, Hourglass } from "lucide-react"
import { ApiError, del, get } from "@/styles/lib/api"

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
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

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

  const handleDelete = async (id: string) => {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm("Bu qarzni o'chirishni xohlaysizmi?")
      if (!confirmed) return
    }

    setDeletingId(id)
    setDeleteError(null)
    try {
      await del(`/debts/${id}`)
      setDebts((prev) => prev.filter((d) => d.id !== id))
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage = (err.data && (err.data as any).message) || err.message || "Qarzlarni o'chirishda xatolik yuz berdi"
        setDeleteError(backendMessage)
      } else {
        setDeleteError("Qarzlarni o'chirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Qarzlar — umumiy ko'rinish</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kompaniyalar bo'yicha qarzlar va qolgan summalarning yig'ma ko'rinishi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          label="Umumiy qarz"
          value={`${totals.totalAmount.toLocaleString()} so'm`}
          icon={<CreditCard className="w-5 h-5" />}
          color="orange"
        />
        <StatCard
          label="Qolgan qarz"
          value={`${totals.totalOutstanding.toLocaleString()} so'm`}
          icon={<Hourglass className="w-5 h-5" />}
          color="red"
        />
      </div>

      <div className="bg-card rounded-2xl p-6 card-shadow-lg border border-border">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-lg font-semibold text-foreground">Kompaniyalar bo'yicha</h2>
          <p className="text-sm text-muted-foreground">Qarzlar mijoz kompaniyalar bo'yicha guruhlangan ko'rinishi.</p>
        </div>

        <DataTable
          columns={[
            { key: "company", label: "Kompaniya" },
            { key: "count", label: "Qaydlar soni" },
            { key: "totalDue", label: "Umumiy qarz (so'm)" },
            { key: "outstanding", label: "Qolgan qarz (so'm)" },
          ]}
          data={grouping.map((g) => ({
            company: g.company,
            count: g.count,
            totalDue: `${g.totalDue.toLocaleString()} so'm`,
            outstanding: `${g.outstanding.toLocaleString()} so'm`,
          }))}
        />
      </div>

      <div className="bg-card rounded-2xl p-6 card-shadow-lg border border-border">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-lg font-semibold text-foreground">Qarzlar ro'yxati</h2>
          <p className="text-sm text-muted-foreground">Har bir qarzni alohida ko'rish va o'chirish imkoniyati.</p>
        </div>

        {deleteError && <p className="mb-4 text-sm text-red-600">{deleteError}</p>}

        <DataTable
          columns={[
            { key: "id", label: "ID", sortable: true },
            { key: "company", label: "Kompaniya", sortable: true },
            { key: "saleId", label: "Savdo ID", sortable: true },
            { key: "amountDue", label: "Umumiy qarz (so'm)", sortable: true },
            { key: "outstanding", label: "Qolgan qarz (so'm)", sortable: true },
            { key: "dueDate", label: "To'lov muddati", sortable: true },
            { key: "status", label: "Holati", sortable: true },
          ]}
          data={debts.map((d) => ({
            ...d,
            amountDue: `${d.amountDue.toLocaleString()} so'm`,
            outstanding: `${d.outstanding.toLocaleString()} so'm`,
          }))}
          searchableFields={["id", "company", "saleId", "status"]}
          actions={(row: any) => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(row.id)}
              disabled={deletingId === row.id}
            >
              {deletingId === row.id ? "O'chirilmoqda..." : "O'chirish"}
            </Button>
          )}
        />
      </div>
    </div>
  )
}
