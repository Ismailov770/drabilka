"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { useToast } from "@/hooks/use-toast"
import { ApiError, get, post } from "@/styles/lib/api"

interface FuelStockBalance {
  dieselLiters: number
}

interface FuelStockOperation {
  id: string
  dateTime: string
  driverName: string
  vehiclePlate?: string
  fuelType: string
  liters?: number
  balanceAfter?: number
  comment?: string
}

const columns = [
  { key: "dateTime", label: "Sana / vaqt", sortable: true },
  { key: "driverName", label: "Haydovchi", sortable: true },
  { key: "vehiclePlate", label: "Transport", sortable: true },
  { key: "fuelType", label: "Yoqilg'i turi", sortable: true },
  { key: "liters", label: "Miqdor (litr)", sortable: true },
  { key: "balanceAfter", label: "Qoldiq (litr)", sortable: true },
]

const numberFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 })

function formatDateTime(iso?: string): string {
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

export default function CashierFuelPage() {
  const { toast } = useToast()

  const [balance, setBalance] = useState<FuelStockBalance | null>(null)
  const [operations, setOperations] = useState<FuelStockOperation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false)
  const [incomingLiters, setIncomingLiters] = useState("")
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [isSavingBalance, setIsSavingBalance] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchAll = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const balanceResponse = await get<FuelStockBalance>("/cashier/fuel-stock")
        if (cancelled) return
        setBalance(balanceResponse)
      } catch (err: any) {
        if (!cancelled) {
          if (err instanceof ApiError) {
            const msg =
              (err.data && (err.data as any).message) ||
              err.message ||
              "Solyarka qoldig'ini yuklashda xatolik yuz berdi"
            setError(msg)
          } else {
            setError("Solyarka qoldig'ini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
          }
        }
      }

      try {
        const opsResponse = await get<FuelStockOperation[] | { items?: FuelStockOperation[] }>(
          "/cashier/fuel-stock/operations",
        )
        if (cancelled) return
        const items = Array.isArray(opsResponse) ? opsResponse : opsResponse.items ?? []
        setOperations(items)
      } catch (err: any) {
        if (!cancelled) {
          if (err instanceof ApiError) {
            const msg =
              (err.data && (err.data as any).message) ||
              err.message ||
              "Yoqilg'i amaliyotlarini yuklashda xatolik yuz berdi"
            setError((prev) => prev ?? msg)
          } else {
            setError((prev) => prev ?? "Yoqilg'i amaliyotlarini yuklashda xatolik yuz berdi. Qayta urinib ko'ring.")
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchAll()

    return () => {
      cancelled = true
    }
  }, [])

  const sortedOperations = useMemo(
    () =>
      [...operations].sort((a, b) => {
        const aTime = a.dateTime ? new Date(a.dateTime).getTime() : 0
        const bTime = b.dateTime ? new Date(b.dateTime).getTime() : 0
        return bTime - aTime
      }),
    [operations],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Kassadagi yoqilg'i (solyarka)</h1>
        <p className="text-sm text-slate-500 mt-1">
          Haydovchilarga berilgan yoqilg'i bo'yicha amaliyotlar va solyarka qoldig'i
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 mb-1">Joriy solyarka qoldig'i</p>
          <p className="text-2xl font-semibold text-slate-900">
            {balance ? numberFormatter.format(balance.dieselLiters) : "-"} litr
          </p>
          <p className="text-xs text-slate-400 mt-1">Qoldiq manfiy bo'lishi ham mumkin</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 card-shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
          <p className="text-xs text-slate-500 mb-2">Solyarkani qabul qilish</p>
          <button
            type="button"
            onClick={() => {
              setIncomingLiters("")
              setBalanceError(null)
              setIsBalanceModalOpen(true)
            }}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors text-sm font-semibold"
          >
            Litr qo'shish
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Yoqilg'i amaliyotlari</h2>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {isLoading && !error && <p className="mb-4 text-sm text-slate-500">Yuklanmoqda...</p>}
        <DataTable
          columns={columns}
          data={sortedOperations.map((op) => ({
            ...op,
            dateTime: formatDateTime(op.dateTime),
            liters: op.liters ?? 0,
            balanceAfter: op.balanceAfter ?? 0,
          }))}
          searchableFields={["driverName", "vehiclePlate", "fuelType"]}
          renderCell={(row, col) => {
            if (col.key === "fuelType") {
              const type = row.fuelType
              let label = "Noma'lum"
              let badgeClass = "bg-slate-100 text-slate-700"

              if (type === "SOLYARKA") {
                label = "Solyarka"
                badgeClass = "bg-amber-100 text-amber-700"
              } else if (type === "BENZIN") {
                label = "Benzin"
                badgeClass = "bg-emerald-100 text-emerald-700"
              } else if (type === "GAZ") {
                label = "Gaz"
                badgeClass = "bg-sky-100 text-sky-700"
              }

              return (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
                  {label}
                </span>
              )
            }
            if (col.key === "liters") {
              return `${numberFormatter.format(row.liters)} l`
            }
            if (col.key === "balanceAfter") {
              return `${numberFormatter.format(row.balanceAfter)} l`
            }
            if (col.key === "dateTime") {
              return row.dateTime
            }
            return row[col.key]
          }}
        />
      </div>
      <Modal
        isOpen={isBalanceModalOpen}
        title="Solyarkani qabul qilish"
        onClose={() => {
          setIsBalanceModalOpen(false)
          setIncomingLiters("")
          setBalanceError(null)
          setIsSavingBalance(false)
        }}
        size="sm"
      >
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setBalanceError(null)

            const value = Number(incomingLiters)
            if (!incomingLiters || Number.isNaN(value) || value <= 0) {
              setBalanceError("Solyarka miqdori 0 dan katta bo'lishi kerak")
              return
            }

            try {
              setIsSavingBalance(true)
              const updated = await post<FuelStockBalance>("/cashier/fuel-stock/deposit", {
                liters: value,
              })
              setBalance(updated)
              setIsBalanceModalOpen(false)
              toast({
                title: "Saqlandi",
                description: "Solyarka qoldig'i yangilandi",
              })
            } catch (err: any) {
              if (err instanceof ApiError) {
                const msg =
                  (err.data && (err.data as any).message) || err.message || "Balansni yangilashda xatolik yuz berdi"
                setBalanceError(msg)
                toast({ title: "Xatolik", description: msg })
              } else {
                const fallback = "Balansni yangilashda xatolik yuz berdi. Qayta urinib ko'ring."
                setBalanceError(fallback)
                toast({ title: "Xatolik", description: fallback })
              }
            } finally {
              setIsSavingBalance(false)
            }
          }}
        >
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Solyarka miqdori (litr)</label>
            <input
              type="number"
              value={incomingLiters}
              onChange={(e) => setIncomingLiters(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="0"
              min="0"
              step="0.01"
            />
            {balanceError && <p className="mt-1 text-xs text-red-600">{balanceError}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold"
              disabled={isSavingBalance}
            >
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => {
                setIsBalanceModalOpen(false)
                setIncomingLiters("")
                setBalanceError(null)
                setIsSavingBalance(false)
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
