"use client"

import { useEffect, useState } from "react"

import { DataTable } from "@/components/data-table"
import { printSaleReceipt } from "@/components/print-receipt"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { ApiError, get, post } from "@/styles/lib/api"

type Sale = {
  id: string
  client: string
  phone: string
  material: string
  weight: number
  price: number
  date: string
  employee: string
  carNumber: string
  paymentType: string
  note?: string
}

export default function SalesPage() {
  const [showAddSale, setShowAddSale] = useState(false)
  const [sales, setSales] = useState<Sale[]>([])

  const [paymentType, setPaymentType] = useState("Naqd")
  const [debtorName, setDebtorName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [productType, setProductType] = useState("Shagal")
  const [weight, setWeight] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchSales = async () => {
      setError(null)
      try {
        const response = await get<Sale[] | { items?: Sale[] }>("/sales")
        if (cancelled) return
        const items = Array.isArray(response) ? response : response.items ?? []
        setSales(items)
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

  const columns = [
    { key: "id", label: "Savdo ID", sortable: true },
    { key: "client", label: "Mijoz", sortable: true },
    { key: "phone", label: "Telefon raqami", sortable: true },
    { key: "carNumber", label: "Avto raqami", sortable: true },
    { key: "material", label: "Mahsulot", sortable: true },
    { key: "weight", label: "Og'irlik (t)", sortable: true },
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
          actions={(row) => (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => printSaleReceipt(row)}>
                Чек
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
              const today = new Date().toISOString().slice(0, 10)
              const payload = {
                client: paymentType === "Qarzga" && debtorName ? debtorName : "Naqd mijoz",
                phone: clientPhone,
                material: productType,
                weight: Number(weight) || 0,
                price: Number(amount) || 0,
                date: today,
                employee: "Kassir",
                carNumber,
                paymentType,
                note: paymentType === "Qarzga" ? "Qarzga savdo" : undefined,
              }

              const response = await post<Sale | { sale?: Sale }>("/sales", payload)
              const created = (response as any).sale ?? response

              setSales((prev) => [...prev, created as Sale])

              // Forma qiymатларини тозалаш
              setClientPhone("")
              setCarNumber("")
              setProductType("Shagal")
              setWeight("")
              setAmount("")
              setPaymentType("Naqd")
              setDebtorName("")
              setShowAddSale(false)
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage = (err.data && (err.data as any).message) || err.message || "Savdoni saqlashda xatolik yuz berdi"
                setError(backendMessage)
              } else {
                setError("Savdoni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Telefon raqami</label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Masalan: +99890 123 45 67"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Mahsulot turi</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full sm-select"
            >
              <option value="Shagal">Shagal</option>
              <option value="Qum">Qum</option>
              <option value="SHibyon">SHibyon</option>
              <option value="Kampot">Kampot</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Og'irlik (t)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Summa (som)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">To'lov turi</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full sm-select"
            >
              <option value="Naqd">Naqd</option>
              <option value="Qarzga">Qarzga</option>
              <option value="Click">Click</option>
            </select>
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
          <Button
            type="submit"
            variant="primary"
            className="w-full shadow-lg border rounded bg-gray-200 p-2 font-bold"
            disabled={isSubmitting}
          >
            Savdoni saqlash
          </Button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </Modal>
    </div>
  )
}
