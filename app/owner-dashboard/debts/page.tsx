"use client"

import { useEffect, useMemo, useState } from "react"
import { StatCard } from "@/components/stat-card"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"

import { Modal } from "@/components/modal"
import { SelectField } from "@/components/select-field"
import { CreditCard, Hourglass, CheckCircle2 } from "lucide-react"
import { ApiError, get, post } from "@/styles/lib/api"
import { getStoredRole } from "@/styles/lib/auth"


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
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const [payModalOpen, setPayModalOpen] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [payAmount, setPayAmount] = useState<number | "">("")
  const [payType, setPayType] = useState<"Naqd" | "Click" | "Qarzga" | "">("Naqd")
  const [isPaying, setIsPaying] = useState(false)
  const [modalError, setModalError] = useState<string | null>(null)
  const [payComment, setPayComment] = useState("")

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [debtorName, setDebtorName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [productType, setProductType] = useState("Shagal")
  const [weight, setWeight] = useState<number | "">("")
  const [unitPrice, setUnitPrice] = useState<number | "">("")
  const [line, setLine] = useState<"" | "A" | "B">("")
  const [lineTouched, setLineTouched] = useState(false)
  const [note, setNote] = useState("")
  const [currentRole, setCurrentRole] = useState<string | null>(null)

  const numberFormatter = new Intl.NumberFormat("uz-UZ")
  const isWeightValid = typeof weight === "number" && weight > 0
  const isUnitPriceValid = typeof unitPrice === "number" && unitPrice > 0

  const totalPrice = isWeightValid && isUnitPriceValid ? weight * unitPrice : 0
  const totalPriceRounded = totalPrice > 0 ? Math.round(totalPrice) : 0
  const formattedTotalPrice = totalPriceRounded > 0 ? numberFormatter.format(totalPriceRounded) : "0"

  const isCreateFormValid =
    isWeightValid &&
    isUnitPriceValid &&
    !!line &&
    !!carNumber &&
    !!clientPhone &&
    !!debtorName

  useEffect(() => {
    const role = getStoredRole()
    setCurrentRole(role)
  }, [])

  const normalizedRole = currentRole ? currentRole.toUpperCase() : null
  const isCashier = normalizedRole === "CASHIER"
  const isOwner = normalizedRole === "OWNER"

  const formatUzbekPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (!digits) {
      return ""
    }

    let numbers = digits
    if (numbers.startsWith("998")) {
      numbers = numbers.slice(3)
    }

    numbers = numbers.slice(0, 9)

    const parts: string[] = []

    if (numbers.length > 0) {
      parts.push(numbers.slice(0, 2))
    }
    if (numbers.length > 2) {
      parts.push(numbers.slice(2, 5))
    }
    if (numbers.length > 5) {
      parts.push(numbers.slice(5, 7))
    }
    if (numbers.length > 7) {
      parts.push(numbers.slice(7, 9))
    }

    let result = "+998"

    if (parts.length > 0) {
      result += " " + parts[0]
    }
    if (parts.length > 1) {
      result += " " + parts[1]
    }
    if (parts.length > 2) {
      result += " " + parts[2]
    }
    if (parts.length > 3) {
      result += " " + parts[3]
    }

    return result
  }

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
    setPayType("Naqd")
    setModalError(null)
    setPayComment("")
    setPayModalOpen(true)
  }

  const recordPayment = async () => {
    if (!selectedDebt || payAmount === "") return

    const amount = Number(payAmount)
    if (!Number.isFinite(amount) || amount <= 0) {
      setModalError("To'lov miqdori 0 dan katta bo'lishi kerak.")
      return
    }

    const paidAt = new Date().toISOString()

    setIsPaying(true)
    setModalError(null)
    try {
      const body = {
        amount,
        paidAt,
        type: payType || null,
        comment: payComment || null,
      }
      const response = await post<Debt | { debt?: Debt }>(`/debts/${selectedDebt.id}/payments`, body)
      const updated = (response as any).debt ?? response

      setDebts((prev) => prev.map((d) => (d.id === (updated as Debt).id ? (updated as Debt) : d)))
      setPayModalOpen(false)
      setSelectedDebt(null)
      setPayAmount("")
      setPayComment("")
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
    setDebtorName("")
    setClientPhone("")
    setCarNumber("")
    setProductType("Shagal")
    setWeight("")
    setUnitPrice("")
    setLine("")
    setLineTouched(false)
    setNote("")
    setCreateError(null)
    setIsCreateModalOpen(true)
  }

  const createDebt = async () => {
    if (!isCreateFormValid) {
      setCreateError("Iltimos, barcha majburiy maydonlarni to'ldiring.")
      return
    }

    if (!isCashier) {
      setCreateError("Faqat kassir savdo yaratishi mumkin.")
      return
    }

    const weightValue = isWeightValid ? weight : 0
    const priceValue = totalPriceRounded

    setIsCreating(true)
    setCreateError(null)

    try {
      const body = {
        client: debtorName,
        phone: clientPhone,
        material: productType,
        weight: weightValue,
        price: priceValue,
        carNumber,
        line,
        paymentType: "Qarzga",
        note: note || "Qarzga savdo",
      }

      await post("/sales", body)

      try {
        const response = await get<Debt[] | { items?: Debt[] }>("/debts")
        const items = Array.isArray(response) ? response : response.items ?? []
        setDebts(items)
      } catch {}

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
    const lastBy = last?.createdBy ?? "—"

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
        <div className="flex flex-wrap items-center gap-2" />
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
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openPayModal(row as Debt)}>
                To'lovni yozish
              </Button>
            </div>
          )}
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
                onChange={(value) => setPayType(value as "Naqd" | "Click" | "Qarzga" | "")}
                options={[
                  { value: "Naqd", label: "Naqd" },
                  { value: "Click", label: "Click" },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-1">Izoh</label>
              <textarea
                value={payComment}
                onChange={(e) => setPayComment(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
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
        title="Yangi qarz qo'shish"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        size="md"
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            createDebt()
          }}
        >
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Avto raqami</label>
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              placeholder="Avto raqami"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Telefon raqami</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(formatUzbekPhone(e.target.value))}
              placeholder="Masalan: +99890 123 45 67"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Mahsulot turi</label>
              <SelectField
                value={productType}
                onChange={(value) => setProductType(value)}
                options={[
                  { value: "Shagal", label: "Shagal" },
                  { value: "Qum", label: "Qum" },
                  { value: "SHibyon", label: "SHibyon" },
                  { value: "Kampot", label: "Kampot" },
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Press liniyasi</label>
              <SelectField
                value={line}
                onChange={(value) => {
                  setLine(value as "" | "A" | "B")
                  setLineTouched(true)
                }}
                options={[
                  { value: "A", label: "A liniyasi" },
                  { value: "B", label: "B liniyasi" },
                ]}
                placeholder="Tanlang..."
              />
              {!line && lineTouched && (
                <p className="mt-1 text-xs text-red-600">Press liniyasini tanlang</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Hajm (m³)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => {
                const value = e.target.value
                if (value === "") {
                  setWeight("")
                  return
                }
                const parsed = parseFloat(value)
                setWeight(Number.isNaN(parsed) ? "" : parsed)
              }}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              step="0.001"
              min="0"
            />
            {weight !== "" && !isWeightValid && (
              <p className="mt-1 text-xs text-red-600">Og'irlik 0 dan katta bo'lishi kerak</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Narx (so'm / m³)</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => {
                const value = e.target.value
                if (value === "") {
                  setUnitPrice("")
                  return
                }
                const parsed = parseFloat(value)
                setUnitPrice(Number.isNaN(parsed) ? "" : parsed)
              }}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              step="1"
              min="0"
            />
            {unitPrice !== "" && !isUnitPriceValid && (
              <p className="mt-1 text-xs text-red-600">Narx 0 dan katta bo'lishi kerak</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Umumiy summa (so'm)</label>
            <input
              type="text"
              value={formattedTotalPrice}
              readOnly
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg bg-gray-50 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">To'lov turi</label>
            <SelectField
              value="Qarzga"
              onChange={() => {}}
              options={[{ value: "Qarzga", label: "Qarzga" }]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Kompaniya yoki shaxs</label>
            <input
              type="text"
              value={debtorName}
              onChange={(e) => setDebtorName(e.target.value)}
              placeholder="Masalan: Aliyev Murod yoki BuildCo Ltd."
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Izoh (ixtiyoriy)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Qo'shimcha ma'lumot"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              rows={3}
            />
          </div>

          {createError && <p className="text-sm text-red-600">{createError}</p>}
          {!isCashier && (
            <p className="text-sm text-amber-600 mt-1">Faqat kassir savdo yaratishi mumkin.</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full shadow-lg border rounded bg-gray-200 p-2 font-bold"
            disabled={isCreating || !isCreateFormValid || !isCashier}
          >
            {isCreating ? "Saqlanmoqda..." : "Qarzni saqlash"}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
