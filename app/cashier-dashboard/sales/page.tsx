"use client"

import { useEffect, useState } from "react"

import { DataTable } from "@/components/data-table"
import { printSaleReceipt } from "@/components/print-receipt"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { SelectField } from "@/components/select-field"
import { ApiError, get, post } from "@/styles/lib/api"
import { useToast } from "@/hooks/use-toast"

type PaymentType = "Naqd" | "Qarzga" | "Click" | "OPLATA"

type Sale = {
  id: number
  saleCode: string
  client: string
  phone: string
  carNumber: string
  line: "A" | "B"
  material: string
  weight: number
  price: number
  unitPrice: number | null
  date: string
  employee: string
  paymentType: PaymentType
  note: string | null
}

type OplataContract = {
  id: number
  company: string
  contractSalesCount: number
  remainingSales: number
  amount: number
  createdAt: string
}

type CreateSalePayload = {
  client: string
  phone: string
  material: string
  weight: number
  price: number
  carNumber: string
  line: "A" | "B"
  paymentType: PaymentType
  note?: string
  oplataContractId?: number
}

export default function SalesPage() {
  const [showAddSale, setShowAddSale] = useState(false)
  const [sales, setSales] = useState<Sale[]>([])

  const [paymentType, setPaymentType] = useState<PaymentType>("Naqd")
  const [debtorName, setDebtorName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [productType, setProductType] = useState("Finski")
  const [weight, setWeight] = useState<number | "">("")
  const [unitPrice, setUnitPrice] = useState<number | "">("")
  const [line, setLine] = useState<"" | "A" | "B">("")
  const [lineTouched, setLineTouched] = useState(false)
  const [note, setNote] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [oplataContracts, setOplataContracts] = useState<OplataContract[]>([])
  const [selectedOplataContractId, setSelectedOplataContractId] = useState("")

  const { toast } = useToast()

  const numberFormatter = new Intl.NumberFormat("uz-UZ")
  const weightFormatter = new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 3 })

  const isWeightValid = typeof weight === "number" && weight > 0
  const isUnitPriceValid = typeof unitPrice === "number" && unitPrice > 0

  const totalPrice = isWeightValid && isUnitPriceValid ? weight * unitPrice : 0
  const totalPriceRounded = totalPrice > 0 ? Math.round(totalPrice) : 0
  const formattedTotalPrice = totalPriceRounded > 0 ? numberFormatter.format(totalPriceRounded) : "0"

  const isFormValid =
    isWeightValid &&
    isUnitPriceValid &&
    !!line &&
    !!carNumber &&
    !!clientPhone &&
    (paymentType !== "Qarzga" || !!debtorName) &&
    (paymentType !== "OPLATA" || !!selectedOplataContractId)

  useEffect(() => {
    let cancelled = false

    const fetchSales = async () => {
      setError(null)
      try {
        const response = await get<Sale[]>("/sales")
        if (cancelled) return
        setSales(response)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage = (err.data && (err.data as any).message) || err.message || "Savdolarni yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Savdolarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      }
    }

    fetchSales()

    return () => {
      cancelled = true
    }
  }, [])

  const loadOplataContracts = async () => {
    try {
      const contracts = await get<OplataContract[]>("/oplata-contracts")
      setOplataContracts(contracts)
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) ||
          err.message ||
          "OPLATA shartnomalarini yuklashda xatolik yuz berdi"
        toast({
          title: "Xatolik",
          description: backendMessage,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Xatolik",
          description:
            "OPLATA shartnomalarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
          variant: "destructive",
        })
      }
    }
  }

  useEffect(() => {
    loadOplataContracts()
  }, [])

  useEffect(() => {
    if (showAddSale) {
      loadOplataContracts()
    }
  }, [showAddSale])

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

  const columns = [
    { key: "id", label: "Savdo ID", sortable: true },
    { key: "client", label: "Mijoz", sortable: true },
    { key: "phone", label: "Telefon raqami", sortable: true },
    { key: "carNumber", label: "Avto raqami", sortable: true },
    { key: "line", label: "Press liniyasi", sortable: true },
    { key: "material", label: "Mahsulot", sortable: true },
    { key: "weight", label: "Hajm (m³)", sortable: true },
    { key: "unitPrice", label: "Narx (so'm / m³)", sortable: true },
    { key: "price", label: "Summa (so'm)", sortable: true },
    { key: "paymentType", label: "To'lov turi", sortable: true },
    { key: "date", label: "Sana", sortable: true },
    { key: "employee", label: "Mas'ul xodim", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Savdolar boshqaruvi</h1>
          <p className="text-[#64748B] mt-1">Barcha sement savdolarini yaratish va kuzatish</p>
        </div>
        <Button onClick={() => setShowAddSale(true)} variant="primary" size="lg">
          ➕ Yangi savdo
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <DataTable
          columns={columns}
          data={sales}
          searchableFields={["id", "client", "phone", "material", "carNumber", "paymentType"]}
          renderCell={(row, col) => {
            if (col.key === "id") {
              return row.saleCode || row.id
            }
            if (col.key === "weight") {
              return weightFormatter.format(row.weight)
            }
            if (col.key === "price" || col.key === "unitPrice") {
              return numberFormatter.format(row[col.key] ?? 0)
            }
            return row[col.key]
          }}
          actions={(row) => (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => printSaleReceipt(row)}>
                Chek
              </Button>
            </div>
          )}
        />
      </div>

      <Modal isOpen={showAddSale} title="Yangi savdo qo'shish" onClose={() => setShowAddSale(false)} size="md">
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setError(null)

            try {
              const weightValue = isWeightValid ? weight : 0
              const priceValue = totalPriceRounded

              const selectedContract =
                paymentType === "OPLATA"
                  ? oplataContracts.find((c) => String(c.id) === selectedOplataContractId)
                  : undefined

              const payload: CreateSalePayload = {
                client:
                  paymentType === "Qarzga" && debtorName
                    ? debtorName
                    : paymentType === "OPLATA" && selectedContract
                      ? selectedContract.company
                      : "Naqd mijoz",
                phone: clientPhone,
                material: productType,
                weight: weightValue,
                price: priceValue,
                carNumber,
                line: line as "A" | "B",
                paymentType,
                note:
                  note ||
                  (paymentType === "Qarzga"
                    ? "Qarzga savdo"
                    : paymentType === "OPLATA" && selectedContract
                      ? `OPLATA shartnoma: ${selectedContract.company}`
                      : undefined),
              }

              if (paymentType === "OPLATA" && selectedContract) {
                payload.oplataContractId = selectedContract.id
              }

              const createdSale = await post<Sale, CreateSalePayload>("/sales", payload)

              printSaleReceipt(createdSale as any)

              toast({
                title: "Savdo saqlandi",
                description: "Yangi savdo muvaffaqiyatli saqlandi.",
              })

              try {
                const response = await get<Sale[]>("/sales")
                setSales(response)
              } catch {
                // Agar yangilash muvaffaqiyatsiz bo'lsa, mavjud ro'yxatni o'zgarishsiz qoldiramiz
              }

              if (paymentType === "OPLATA") {
                loadOplataContracts()
              }

              // Forma qiymатларини тозалаш
              setClientPhone("")
              setCarNumber("")
              setProductType("Finski")
              setWeight("")
              setUnitPrice("")
              setLine("")
              setLineTouched(false)
              setPaymentType("Naqd")
              setDebtorName("")
              setSelectedOplataContractId("")
              setNote("")
              setShowAddSale(false)
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage =
                  (err.data && (err.data as any).message) || err.message || "Savdoni saqlashda xatolik yuz berdi"
                setError(backendMessage)
                toast({
                  title: "Xatolik",
                  description: backendMessage,
                  variant: "destructive",
                })
              } else {
                const fallbackMessage =
                  "Savdoni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
                setError(fallbackMessage)
                toast({
                  title: "Xatolik",
                  description: fallbackMessage,
                  variant: "destructive",
                })
              }
            } finally {
              setIsSubmitting(false)
            }
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
              required
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
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Mahsulot turi</label>
              <SelectField
                value={productType}
                onChange={(value) => setProductType(value)}
                options={[
                  { value: "Finski", label: "Finski" },
                  { value: "Kampot", label: "Kampot" },
                  { value: "Shebyon", label: "Shebyon" },
                  { value: "Klinest", label: "Klinest" },
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
              { !line && lineTouched && (
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
              value={paymentType}
              onChange={(value) => {
                setPaymentType(value as PaymentType)
                if (value !== "OPLATA") {
                  setSelectedOplataContractId("")
                }
              }}
              options={[
                { value: "Naqd", label: "Naqd" },
                { value: "Qarzga", label: "Qarzga" },
                { value: "Click", label: "Click" },
                { value: "OPLATA", label: "OPLATA" },
              ]}
            />
          </div>
          {paymentType === "Qarzga" && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Kompaniya yoki shaxs</label>
              <input
                type="text"
                value={debtorName}
                onChange={(e) => setDebtorName(e.target.value)}
                placeholder="Masalan: Aliyev Murod yoki BuildCo Ltd."
                className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
                required
              />
            </div>
          )}
          {paymentType === "OPLATA" && (
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-2">Shartnoma (kompaniya)</label>
              <SelectField
                value={selectedOplataContractId}
                onChange={(value) => setSelectedOplataContractId(value)}
                options={
                  oplataContracts.length
                    ? oplataContracts.map((c) => ({
                        value: String(c.id),
                        label: `${c.company} (${c.remainingSales} qolgan)`,
                      }))
                    : []
                }
                placeholder={
                  oplataContracts.length
                    ? "Shartnomani tanlang..."
                    : "OPLATA shartnomalari topilmadi (owner interfeysida qo'shing)"
                }
              />
              {oplataContracts.length === 0 && (
                <p className="mt-1 text-xs text-red-600">
                  OPLATA shartnomalari topilmadi. Avval owner OPLATA bo'limida shartnoma qo'shing.
                </p>
              )}
              {oplataContracts.length > 0 && !selectedOplataContractId && (
                <p className="mt-1 text-xs text-red-600">OPLATA shartnoma tanlanishi shart</p>
              )}
            </div>
          )}
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
          <Button
            type="submit"
            variant="primary"
            className="w-full shadow-lg border rounded bg-gray-200 p-2 font-bold"
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Saqlanmoqda..." : "Savdoni saqlash"}
          </Button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </Modal>
    </div>
  )
}
