"use client"

import { useEffect, useMemo, useState } from "react"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { SelectField } from "@/components/select-field"
import { CreditCard, Hourglass, CheckCircle2 } from "lucide-react"
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
    type: string | null
    at: string
    createdBy?: string | null
  } | null
}

export default function OwnerDebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [payModalOpen, setPayModalOpen] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [payAmount, setPayAmount] = useState<number | "">("")
  const [payType, setPayType] = useState("Cash")
  const [isPaying, setIsPaying] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [createForm, setCreateForm] = useState({
    company: "",
    saleId: "",
    amountDue: "",
    dueDate: "",
    notes: "",
  })

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

      setDebts((prev) => prev.map((d) => (d.id === (updated as Debt).id ? (updated as Debt) : d)))
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

  const openCreateModal = () => {
    setCreateForm({
      company: "",
      saleId: "",
      amountDue: "",
      dueDate: "",
      notes: "",
    })
    setCreateError(null)
    setIsCreateModalOpen(true)
  }

  const createDebt = async () => {
    if (!createForm.company || !createForm.saleId || !createForm.amountDue || !createForm.dueDate) {
      setCreateError("Iltimos, barcha majburiy maydonlarni to'ldiring.")
      return
    }

    const amount = Number(createForm.amountDue)
    if (!Number.isFinite(amount) || amount <= 0) {
      setCreateError("Qarz summasi 0 dan katta bo'lishi kerak.")
      return
    }

    setIsCreating(true)
    setCreateError(null)

    try {
      const body = {
        company: createForm.company,
        saleId: createForm.saleId,
        amountDue: amount,
        dueDate: createForm.dueDate,
        notes: createForm.notes || undefined,
      }

      const response = await post<Debt | { debt?: Debt }>("/debts", body)
      const created = (response as any).debt ?? response

      setDebts((prev) => [created as Debt, ...prev])
      setIsCreateModalOpen(false)
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) || err.message || "Qarz yaratishda xatolik yuz berdi"
        setCreateError(backendMessage)
      } else {
        setCreateError("Qarz yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } finally {
      setIsCreating(false)
    }
  }

  const debtsColumns = [
    { key: "id", label: "ID", sortable: true },
    { key: "company", label: "Kompaniya / mijoz", sortable: true },
    { key: "saleId", label: "Sotuv / hisob-faktura", sortable: true },
    { key: "amountDue", label: "Umumiy qarz (so'm)", sortable: true },
    { key: "outstanding", label: "Qolgan qarz (so'm)", sortable: true },
    { key: "dueDate", label: "To'lov muddati", sortable: true },
    { key: "status", label: "Holati", sortable: true },
    { key: "lastPaymentInfo", label: "So'nggi to'lov", sortable: false },
    { key: "lastPaymentBy", label: "Kim tomonidan", sortable: false },
  ]

  const debtsTableData = debts.map((d) => {
    const last = d.lastPayment
    const lastInfo = last
      ? `${last.amount.toLocaleString()} so'm (${last.at})`
      : "To'lovlar hali mavjud emas"
    const lastBy = last?.createdBy || "—"

    return {
      ...d,
      lastPaymentInfo: lastInfo,
      lastPaymentBy: lastBy,
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Qarzlar</h1>
          <p className="text-sm text-muted-foreground mt-1">Qarz yozuvlarini ko'rish, tahlil qilish va boshqarish.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={openCreateModal}>
            Yangi qarz
          </Button>
        </div>
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

      <div className="bg-card rounded-2xl p-6 card-shadow-lg border border-border">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-lg font-semibold text-foreground">Qarzlar ro'yxati</h2>
          <p className="text-sm text-muted-foreground">
            Har bir sotuv bo'yicha qarzlar, so'nggi to'lov va kim tomonidan to'langanligi.
          </p>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <DataTable
          columns={debtsColumns}
          data={debtsTableData}
          searchableFields={["id", "company", "saleId", "notes"]}
          renderCell={(row, col) => {
            if (col.key === "amountDue" || col.key === "outstanding") {
              const value = row[col.key]
              if (typeof value === "number") {
                return `${value.toLocaleString()} so'm`
              }
              return value
            }
            return row[col.key]
          }}
          actions={(row: any) => (
            <Button variant="outline" size="sm" onClick={() => openPayModal(row as Debt)}>
              To'lovni yozish
            </Button>
          )}
          expandableRow={(row: any) => <DebtPaymentHistoryRow debtId={row.id} outstanding={row.outstanding} />}
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

      <Modal
        title={selectedDebt ? `To'lovni yozish - ${selectedDebt.id}` : "To'lovni yozish"}
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        size="sm"
      >
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
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
              />
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

            {modalError && <p className="text-sm text-red-600">{modalError}</p>}

            <div className="flex gap-2">
              <Button variant="primary" onClick={recordPayment} className="w-full" disabled={isPaying}>
                Saqlash
              </Button>
              <Button
                variant="outline"
                onClick={() => setPayModalOpen(false)}
                className="w-full"
                disabled={isPaying}
              >
                Bekor qilish
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Yangi qarz yaratish"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Kompaniya yoki mijoz</label>
            <input
              type="text"
              value={createForm.company}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Masalan: BuildCo Ltd."
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Sotuv / hisob-faktura ID</label>
            <input
              type="text"
              value={createForm.saleId}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, saleId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Masalan: S003"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Umumiy qarz summasi (so'm)</label>
            <input
              type="number"
              value={createForm.amountDue}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, amountDue: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">To'lov muddati</label>
            <input
              type="date"
              value={createForm.dueDate}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, dueDate: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Izoh (ixtiyoriy)</label>
            <textarea
              value={createForm.notes}
              onChange={(e) => setCreateForm((prev) => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          {createError && <p className="text-sm text-red-600">{createError}</p>}

          <div className="flex gap-2 pt-2">
            <Button variant="primary" onClick={createDebt} className="w-full" disabled={isCreating}>
              {isCreating ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              className="w-full"
              disabled={isCreating}
            >
              Bekor qilish
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
