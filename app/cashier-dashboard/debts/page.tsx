"use client"

import { useEffect, useMemo, useState } from "react"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { StatCard } from "@/components/stat-card"
import { CheckCircle2, CreditCard, Hourglass } from "lucide-react"
import { ApiError, get, post } from "@/styles/lib/api"

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

export default function CashierDebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([])

  const companies = useMemo(() => Array.from(new Set(debts.map((d) => d.company))), [debts])

  const [companyFilter, setCompanyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // payment modal state
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [payAmount, setPayAmount] = useState<number | "">("")
  const [payType, setPayType] = useState("Cash")
  const [isPaying, setIsPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalError, setModalError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchDebts = async () => {
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
      }
    }

    fetchDebts()

    return () => {
      cancelled = true
    }
  }, [])

  const totals = useMemo(() => {
    const totalAmount = debts.reduce((s, d) => s + d.amountDue, 0)
    const totalOutstanding = debts.reduce((s, d) => s + d.outstanding, 0)
    const paid = totalAmount - totalOutstanding
    return { totalAmount, totalOutstanding, paid }
  }, [debts])

  const openPayModal = (row: Debt) => {
    setSelectedDebt(row)
    setPayAmount("")
    setPayType("Cash")
    setModalError(null)
    setPayModalOpen(true)
  }

  const recordPayment = async () => {
    if (!selectedDebt || payAmount === "") return
    const amount = Number(payAmount)
    setIsPaying(true)
    setModalError(null)
    try {
      const body = {
        amount,
        type: payType,
        paidAt: new Date().toISOString(),
      }
      const response = await post<Debt | { debt?: Debt }>(`/debts/${selectedDebt.id}/payments`, body)
      const updated = (response as any).debt ?? response

      setDebts((prev) => prev.map((d) => (d.id === updated.id ? (updated as Debt) : d)))
      setPayModalOpen(false)
      setSelectedDebt(null)
      setPayAmount("")
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage = (err.data && (err.data as any).message) || err.message || "To'lovni yozishda xatolik yuz berdi"
        setModalError(backendMessage)
      } else {
        setModalError("To'lovni yozishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } finally {
      setIsPaying(false)
    }
  }

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "company", label: "Company / Client", sortable: true },
    { key: "saleId", label: "Sale / Invoice", sortable: true },
    { key: "amountDue", label: "Amount Due ($)", sortable: true },
    { key: "outstanding", label: "Outstanding ($)", sortable: true },
    { key: "dueDate", label: "Due Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ]

  const filtered = debts.filter(
    (d) => (companyFilter === "all" ? true : d.company === companyFilter) && (statusFilter === "all" ? true : d.status === statusFilter),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Debts / Qarzlar</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage outstanding credits / debts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <StatCard
          label="Paid"
          value={`$${totals.paid.toLocaleString()}`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="green"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="sm-select text-sm"
            >
              <option value="all">All companies</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="sm-select text-sm"
            >
              <option value="all">All statuses</option>
              <option value="Open">Open</option>
              <option value="Partial">Partial</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filtered}
          searchableFields={["id", "company", "saleId", "notes"]}
          actions={(row: any) => (
            <Button variant="outline" size="sm" onClick={() => openPayModal(row as Debt)}>
              Record Payment
            </Button>
          )}
        />
      </div>

      <Modal title={selectedDebt ? `Record Payment - ${selectedDebt.id}` : "Record Payment"} isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} size="sm">
        {selectedDebt && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-slate-500">Company</div>
              <div className="font-semibold">{selectedDebt.company}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Outstanding</div>
              <div className="font-semibold text-red-700">${selectedDebt.outstanding}</div>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1">Amount to pay ($)</label>
              <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value === "" ? "" : Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1">Payment Type</label>
              <select value={payType} onChange={(e) => setPayType(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="Cash">Cash</option>
                <option value="Transfer">Bank Transfer</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" onClick={recordPayment} className="w-full">
                Record Payment
              </Button>
              <Button variant="outline" onClick={() => setPayModalOpen(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
