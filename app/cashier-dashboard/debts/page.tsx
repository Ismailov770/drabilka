"use client"

import { useEffect, useMemo, useState } from "react"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { StatCard } from "@/components/stat-card"
import { CheckCircle2, CreditCard, Hourglass } from "lucide-react"
import { SelectField } from "@/components/select-field"
import { ApiError, get, post } from "@/styles/lib/api"
import { DebtPaymentHistoryRow } from "@/components/debt-payment-history-row"

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
    { key: "company", label: "Kompaniya / mijoz", sortable: true },
    { key: "saleId", label: "Sotuv / hisob-faktura", sortable: true },
    { key: "amountDue", label: "Umumiy qarz (so'm)", sortable: true },
    { key: "outstanding", label: "Qolgan qarz (so'm)", sortable: true },
    { key: "dueDate", label: "To'lov muddati", sortable: true },
    { key: "status", label: "Holati", sortable: true },
  ]

  const filtered = debts.filter(
    (d) => (companyFilter === "all" ? true : d.company === companyFilter) && (statusFilter === "all" ? true : d.status === statusFilter),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Qarzlar</h1>
        <p className="text-sm text-slate-500 mt-1">Qarz yozuvlarini ko'rish va boshqarish.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <StatCard
          label="To'langan"
          value={`${totals.paid.toLocaleString()} so'm`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="green"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <SelectField
              value={companyFilter}
              onChange={(value) => setCompanyFilter(value)}
              options={[
                { value: "all", label: "Barcha kompaniyalar" },
                ...companies.map((c) => ({ value: c, label: c })),
              ]}
            />
            <SelectField
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              options={[
                { value: "all", label: "Barcha holatlar" },
                { value: "Open", label: "Ochiq" },
                { value: "Partial", label: "Qisman to'langan" },
                { value: "Paid", label: "To'langan" },
              ]}
            />
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filtered}
          searchableFields={["id", "company", "saleId", "notes"]}
          actions={(row: any) => (
            <Button variant="outline" size="sm" onClick={() => openPayModal(row as Debt)}>
              To'lovni yozish
            </Button>
          )}
          expandableRow={(row: any) => (
            <DebtPaymentHistoryRow debtId={row.id} outstanding={row.outstanding} />
          )}
        />
      </div>

      <Modal title={selectedDebt ? `To'lovni yozish - ${selectedDebt.id}` : "To'lovni yozish"} isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} size="sm">
        {selectedDebt && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-slate-500">Kompaniya</div>
              <div className="font-semibold">{selectedDebt.company}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Qolgan qarz</div>
              <div className="font-semibold text-red-700">{selectedDebt.outstanding.toLocaleString()} so'm</div>
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1">To'lov miqdori (so'm)</label>
              <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value === "" ? "" : Number(e.target.value))} className="w-full px-3 py-2 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1">To'lov turi</label>
              <SelectField
                value={payType}
                onChange={(value) => setPayType(value)}
                options={[
                  { value: "Cash", label: "Naqd" },
                  { value: "Transfer", label: "Bank o'tkazmasi" },
                  { value: "Credit", label: "Qarzga" },
                ]}
              />
            </div>

            {modalError && (
              <p className="text-sm text-red-600">{modalError}</p>
            )}

            <div className="flex gap-2">
              <Button variant="primary" onClick={recordPayment} className="w-full">
                Saqlash
              </Button>
              <Button variant="outline" onClick={() => setPayModalOpen(false)} className="w-full">
                Bekor qilish
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
