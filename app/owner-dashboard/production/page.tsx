"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { ApiError, get } from "@/styles/lib/api"

type ProductOutflow = {
  id: string
  batchId: string
  product: string
  shift: string
  line: string
  quantity: number
  unit: string
  price: number
  totalSum: number
  transport: string
  operator: string
  producedAt: string
}

const columns = [
  { key: "batchId", label: "Batch ID", sortable: true },
  { key: "product", label: "Mahsulot", sortable: true },
  { key: "shift", label: "Smena", sortable: true },
  { key: "line", label: "Press liniyasi", sortable: true },
  { key: "quantity", label: "Hajm", sortable: true },
  { key: "price", label: "Narxi", sortable: true },
  { key: "totalSum", label: "Umumiy Summa", sortable: true },
  { key: "transport", label: "Transport", sortable: true },
  { key: "operator", label: "Mas'ul operator", sortable: true },
  { key: "producedAt", label: "Berilgan sana", sortable: true },
]

const numberFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

const today = new Date()
const currentYear = today.getFullYear()
const defaultDateFrom = ""
const defaultDateTo = ""

export default function OwnerProductionPage() {
  const [filters, setFilters] = useState({
    dateFrom: defaultDateFrom,
    dateTo: defaultDateTo,
    product: "all",
    shift: "all",
  })
  const [records, setRecords] = useState<ProductOutflow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchProduction = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<ProductOutflow[] | { items?: ProductOutflow[] }>("/production/outflows", {
          params: {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
            product: filters.product === "all" ? undefined : filters.product,
            shift: filters.shift === "all" ? undefined : filters.shift,
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setRecords(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Ishlab chiqarish batchlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Ishlab chiqarish batchlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchProduction()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo, filters.product, filters.shift])

  const withinRange = (dateStr: string) => {
    const current = new Date(dateStr).getTime()
    const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined
    const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined
    const afterFrom = typeof from === "number" ? current >= from : true
    const beforeTo = typeof to === "number" ? current <= to : true
    return afterFrom && beforeTo
  }

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesProduct = filters.product === "all" || record.product === filters.product
        const matchesShift = filters.shift === "all" || record.shift === filters.shift
        return matchesProduct && matchesShift && withinRange(record.producedAt)
      }),
    [records, filters.product, filters.shift, filters.dateFrom, filters.dateTo],
  )

  const totals = filteredRecords.reduce(
    (acc, record) => {
      acc.quantity += record.quantity
      acc.batches += 1
      return acc
    },
    { quantity: 0, batches: 0 },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Chiqarilgan mahsulotlar</h1>
        <p className="text-[#64748B] mt-1">Smena va mahsulot bo'yicha real vaqt rejimidagi nazorat</p>
      </div>

      {/* Filter panel */}
      <div className="bg-white rounded-lg p-6 card-shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Boshlanish sanasi</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Tugash sanasi</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Mahsulot turi</label>
            <select
              value={filters.product}
              onChange={(e) => setFilters((prev) => ({ ...prev, product: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="M400">M400</option>
              <option value="M500">M500</option>
              <option value="Sul'fatge chidamli">Sul'fatge chidamli</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Smena</label>
            <select
              value={filters.shift}
              onChange={(e) => setFilters((prev) => ({ ...prev, shift: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="MORNING">Tonggi</option>
              <option value="DAY">Kunduzgi</option>
              <option value="NIGHT">Kechgi</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setFilters({
                dateFrom: "",
                dateTo: "",
                product: "all",
                shift: "all",
              })
            }
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9] mt-2"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

     
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Batchlar bo'yicha tafsilot</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["batchId", "product", "shift", "line", "operator", "transport"]}
          renderCell={(row, col) => {
            if (col.key === "quantity") {
              return `${numberFormatter.format(row[col.key])} m³`
            }
            if (col.key === "price") {
              return `${numberFormatter.format(row[col.key])} so'm`
            }
            if (col.key === "totalSum") {
              return `${numberFormatter.format(row[col.key])} so'm`
            }
            return row[col.key]
          }}
          footerTotals={filteredRecords.reduce(
            (acc, record) => {
              acc.quantity += record.quantity
              acc.totalSum += record.totalSum
              acc.count += 1
              return acc
            },
            { quantity: 0, totalSum: 0, count: 0 },
          )}
        />
      </div>

           
    </div>
  )
}

