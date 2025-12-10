"use client"

import { useEffect, useMemo, useState } from "react"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { StatCard } from "@/components/stat-card"
import { CheckCircle2, CreditCard, Hourglass } from "lucide-react"
import { SelectField } from "@/components/select-field"
import { ApiError, get, post } from "@/styles/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

type DebtStatus = "Open" | "Partial" | "Paid"

type DebtLastPayment = {
  amount: number
  at: string
  createdBy?: string | null
} | null

type Debt = {
  id: string
  company: string
  saleId: string
  phone?: string | null
  amountDue: number
  outstanding: number
  dueDate: string | null
  status: DebtStatus
  notes?: string
  lastPayment?: DebtLastPayment
}

type DebtPaymentResponse = {
  id: number
  debtId: number
  amount: number
  date: string
  comment?: string | null
  statusAfterPayment: DebtStatus
  paidAt: string
  cumulativePaid: number
  outstandingAfterPayment: number
  createdByFullName?: string | null
  createdByUsername?: string | null
  createdByRole?: string | null
}

function formatStatusLabel(status: DebtStatus): string {
  if (status === "Paid") return "To'langan"
  if (status === "Partial") return "Qisman to'langan"
  return "Ochiq"
}

function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function formatTime(iso: string | null | undefined): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}

function getNowLocalDateTimeInputValue(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export default function CashierDebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const companies = useMemo(() => Array.from(new Set(debts.map((d) => d.company))), [debts])

  const [companyFilter, setCompanyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  // payment modal state
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [payAmount, setPayAmount] = useState<number | "">("")
  const [isPaying, setIsPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalError, setModalError] = useState<string | null>(null)
  const [payComment, setPayComment] = useState("")
  const [paidAt, setPaidAt] = useState<string>(() => getNowLocalDateTimeInputValue())
  const [payments, setPayments] = useState<DebtPaymentResponse[] | null>(null)
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false)
  const [paymentsError, setPaymentsError] = useState<string | null>(null)

  const { toast } = useToast()

  const quickRanges = [
    { label: "7 kun", days: 7 },
    { label: "14 kun", days: 14 },
    { label: "30 kun", days: 30 },
  ]

  const applyQuickRange = (days: number) => {
    const end = new Date()
    const start = new Date(end)
    start.setDate(start.getDate() - (days - 1))
    setDateFrom(start.toISOString().slice(0, 10))
    setDateTo(end.toISOString().slice(0, 10))
  }

  useEffect(() => {
    let cancelled = false

    const fetchDebts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<Debt[] | { items?: Debt[] }>("/debts", {
          params: {
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
          },
        })
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
  }, [dateFrom, dateTo])

  useEffect(() => {
    if (!payModalOpen || !selectedDebt) return

    let cancelled = false

    const fetchPayments = async () => {
      setIsPaymentsLoading(true)
      setPaymentsError(null)
      try {
        const response = await get<DebtPaymentResponse[]>(`/debts/${selectedDebt.id}/payments`)
        if (cancelled) return
        setPayments(response)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "To'lovlar tarixini yuklashda xatolik yuz berdi"
          setPaymentsError(backendMessage)
        } else {
          setPaymentsError("To'lovlar tarixini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsPaymentsLoading(false)
        }
      }
    }

    fetchPayments()

    return () => {
      cancelled = true
    }
  }, [payModalOpen, selectedDebt])

  const totals = useMemo(() => {
    const totalAmount = debts.reduce((s, d) => s + d.amountDue, 0)
    const totalOutstanding = debts.reduce((s, d) => s + d.outstanding, 0)
    const paid = totalAmount - totalOutstanding
    return { totalAmount, totalOutstanding, paid }
  }, [debts])

  const openPayModal = (row: Debt) => {
    setSelectedDebt(row)
    setPayAmount("")
    setPayComment("")
    setPaidAt(getNowLocalDateTimeInputValue())
    setModalError(null)
    setPayments(null)
    setPaymentsError(null)
    setPayModalOpen(true)
  }

  const recordPayment = async () => {
    if (!selectedDebt) return

    if (payAmount === "") {
      setModalError("To'lov miqdorini kiriting.")
      return
    }

    const amount = Number(payAmount)
    if (!Number.isFinite(amount) || amount <= 0) {
      setModalError("To'lov miqdori 0 dan katta bo'lishi kerak.")
      return
    }

    if (amount > selectedDebt.outstanding) {
      setModalError("To'lov miqdori qolgan qarzdan oshmasligi kerak.")
      return
    }

    const paidAtIso = new Date().toISOString()

    setIsPaying(true)
    setModalError(null)
    try {
      const body = {
        amount,
        paidAt: paidAtIso,
        type: null as string | null,
        comment: payComment || null,
      }
      const response = await post<Debt | { debt?: Debt }>(`/debts/${selectedDebt.id}/payments`, body)
      const updated = (response as any).debt ?? response

      setDebts((prev) => prev.map((d) => (d.id === (updated as Debt).id ? (updated as Debt) : d)))
      setSelectedDebt((prev) => (prev && prev.id === (updated as Debt).id ? (updated as Debt) : prev))

      setPayAmount("")
      setPayComment("")
      setPaidAt(getNowLocalDateTimeInputValue())

      try {
        const history = await get<DebtPaymentResponse[]>(`/debts/${(updated as Debt).id}/payments`)
        setPayments(history)
        setPaymentsError(null)
      } catch (err: any) {
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "To'lovlar tarixini yangilashda xatolik yuz berdi"
          setPaymentsError(backendMessage)
        } else {
          setPaymentsError("To'lovlar tarixini yangilashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      }

      toast({
        title: "To'lov saqlandi",
        description: "Yangi to'lov muvaffaqiyatli yozildi.",
      })
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) || err.message || "To'lovni yozishda xatolik yuz berdi"
        setModalError(backendMessage)
        toast({
          title: "Xatolik",
          description: backendMessage,
          variant: "destructive",
        })
      } else {
        const fallback = "To'lovni yozishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        setModalError(fallback)
        toast({
          title: "Xatolik",
          description: fallback,
          variant: "destructive",
        })
      }
    } finally {
      setIsPaying(false)
    }
  }

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "company", label: "Kompaniya / mijoz", sortable: true },
    { key: "saleId", label: "Sotuv / hisob-faktura", sortable: true },
    { key: "phone", label: "Telefon raqami", sortable: false },
    { key: "amountDue", label: "Umumiy qarz (so'm)", sortable: true },
    { key: "outstanding", label: "Qolgan qarz (so'm)", sortable: true },
    { key: "dueDate", label: "To'lov muddati", sortable: true },
    { key: "status", label: "Holati", sortable: true },
    { key: "lastPaymentInfo", label: "So'nggi to'lov", sortable: false },
    { key: "lastPaymentBy", label: "Kim tomonidan", sortable: false },
  ]

  const filtered = debts.filter(
    (d) => (companyFilter === "all" ? true : d.company === companyFilter) && (statusFilter === "all" ? true : d.status === statusFilter),
  )

  const debtsTableData = filtered.map((d) => {
    const last = d.lastPayment
    const lastInfo = last
      ? `${last.amount.toLocaleString()} so'm (${formatDateTime(last.at)})`
      : "To'lovlar hali mavjud emas"
    const lastBy = last?.createdBy && last.createdBy.length > 0 ? last.createdBy : "—"

    return {
      ...d,
      phone: d.phone || "—",
      lastPaymentInfo: lastInfo,
      lastPaymentBy: lastBy,
    }
  })

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

      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Davr boshi</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="ДД.ММ.ГГГГ"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Davr oxiri</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="ДД.ММ.ГГГГ"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickRanges.map((range) => (
            <button
              key={range.label}
              type="button"
              onClick={() => applyQuickRange(range.days)}
              className="px-4 py-2 border border-slate-200 text-sm text-[#2563EB] rounded-full bg-slate-50 hover:bg-[#EFF6FF]"
            >
              {range.label} so'nggi
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setDateFrom("")
              setDateTo("")
            }}
            className="px-4 py-2 border border-slate-200 text-sm text-slate-700 rounded-full bg-white hover:bg-slate-50"
          >
            Filtrlarni tozalash
          </button>
        </div>
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

        {isLoading && (
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Spinner className="h-4 w-4" />
            <span>Qarzlar yuklanmoqda...</span>
          </div>
        )}

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={debtsTableData}
          searchableFields={["id", "company", "saleId", "phone", "notes"]}
          renderCell={(row, col) => {
            if (col.key === "amountDue" || col.key === "outstanding") {
              const value = row[col.key]
              if (typeof value === "number") {
                return `${value.toLocaleString()} so'm`
              }
              return value
            }
            if (col.key === "status") {
              const status: DebtStatus = row.status
              let variant: "default" | "secondary" | "destructive" | "outline" = "secondary"
              if (status === "Paid") {
                variant = "default"
              } else if (status === "Open") {
                variant = "destructive"
              }

              return <Badge variant={variant}>{formatStatusLabel(status)}</Badge>
            }
            if (col.key === "dueDate") {
              return row.dueDate || "—"
            }
            return row[col.key]
          }}
          actions={(row: any) => (
            <Button variant="outline" size="sm" onClick={() => openPayModal(row as Debt)}>
              To'lovni yozish
            </Button>
          )}
        />
      </div>

      <Modal
        title={selectedDebt ? `Qarz bo'yicha to'lovlar - ${selectedDebt.company} / ${selectedDebt.saleId}` : "To'lovni yozish"}
        isOpen={payModalOpen}
        onClose={() => {
          setPayModalOpen(false)
          setSelectedDebt(null)
        }}
        size="lg"
      >
        {selectedDebt && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="text-sm text-slate-500">Kompaniya / mijoz</div>
                <div className="font-semibold text-slate-900">{selectedDebt.company}</div>
                <div className="text-xs text-slate-500">Sotuv / hisob-faktura: {selectedDebt.saleId}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-slate-500">Umumiy qarz</div>
                  <div className="font-semibold text-slate-900">{selectedDebt.amountDue.toLocaleString()} so'm</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">To'langan</div>
                  <div className="font-semibold text-emerald-700">
                    {(selectedDebt.amountDue - selectedDebt.outstanding).toLocaleString()} so'm
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Qolgan qarz</div>
                  <div className="font-semibold text-red-700">{selectedDebt.outstanding.toLocaleString()} so'm</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">Tarixiy to'lovlar</h3>
                {isPaymentsLoading && (
                  <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                    <Spinner className="h-4 w-4" /> Yuklanmoqda...
                  </span>
                )}
              </div>

              {paymentsError && <p className="text-xs text-red-600">{paymentsError}</p>}

              {!isPaymentsLoading && !paymentsError && payments && payments.length === 0 && (
                <p className="text-xs text-slate-500">Hozircha to'lovlar qayd etilmagan.</p>
              )}

              {!paymentsError && payments && payments.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="min-w-full text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">#</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Sana</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Vaqt</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Kim tomonidan</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Summa (so'm)</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Jamiga to'langan (so'm)</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Qolgan qarz (so'm)</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Holati</th>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Izoh</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p, index) => {
                        const status: DebtStatus = p.statusAfterPayment
                        let variant: "default" | "secondary" | "destructive" | "outline" = "secondary"
                        if (status === "Paid") {
                          variant = "default"
                        } else if (status === "Open") {
                          variant = "destructive"
                        }

                        const displayBy = p.createdByFullName || p.createdByUsername || "—"

                        return (
                          <tr key={p.id} className="border-t border-slate-100 align-top">
                            <td className="px-3 py-2 text-slate-800">{index + 1}</td>
                            <td className="px-3 py-2 text-slate-800">{p.date}</td>
                            <td className="px-3 py-2 text-slate-800">{formatTime(p.paidAt)}</td>
                            <td className="px-3 py-2 text-slate-800">{displayBy}</td>
                            <td className="px-3 py-2 text-slate-800">{p.amount.toLocaleString()} so'm</td>
                            <td className="px-3 py-2 text-slate-800">{p.cumulativePaid.toLocaleString()} so'm</td>
                            <td className="px-3 py-2 text-slate-800">{p.outstandingAfterPayment.toLocaleString()} so'm</td>
                            <td className="px-3 py-2 text-slate-800">
                              <Badge variant={variant}>{formatStatusLabel(status)}</Badge>
                            </td>
                            <td className="px-3 py-2 text-slate-600">{p.comment || "—"}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pt-4 mt-2 border-t border-slate-200 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900">Yangi to'lovni qo'shish</h3>

              <div>
                <label className="block text-sm text-slate-700 mb-1">To'lov miqdori (so'm)</label>
                <input
                  type="number"
                  value={payAmount}
                  min={1}
                  max={selectedDebt.outstanding}
                  onChange={(e) => setPayAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Maksimal: {selectedDebt.outstanding.toLocaleString()} so'm
                </p>
              </div>

              <div>
                <label className="block text-sm text-slate-700 mb-1">Izoh (ixtiyoriy)</label>
                <textarea
                  value={payComment}
                  onChange={(e) => setPayComment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                />
              </div>

              {modalError && <p className="text-sm text-red-600">{modalError}</p>}

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={recordPayment}
                  className="w-full inline-flex items-center justify-center gap-2"
                  disabled={isPaying}
                >
                  {isPaying && <Spinner className="h-4 w-4" />}
                  <span>Saqlash</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPayModalOpen(false)
                    setSelectedDebt(null)
                  }}
                  className="w-full"
                  disabled={isPaying}
                >
                  Bekor qilish
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
