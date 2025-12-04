"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { ApiError, get } from "@/styles/lib/api"

type ProductFlow = {
  id: string
  product: string
  direction: "Kirim" | "Chiqim" | string
  quantity: number
  unit: string
  from: string
  to: string
  transport: string
  loggedAt: string
}

const columns = [
  { key: "id", label: "Hujjat ID", sortable: true },
  { key: "product", label: "Mahsulot", sortable: true },
  { key: "direction", label: "Yo'nalish", sortable: true },
  { key: "quantity", label: "Hajm", sortable: true },
  { key: "from", label: "Qayerdan", sortable: false },
  { key: "to", label: "Qayerga", sortable: false },
  { key: "transport", label: "Transport", sortable: true },
  { key: "loggedAt", label: "Sana", sortable: true },
]

const numberFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

export default function OwnerProductFlowPage() {
  const [filters, setFilters] = useState({
    dateFrom: "2024-02-12",
    dateTo: "2024-02-19",
    direction: "all",
    product: "all",
  })
  const [flows, setFlows] = useState<ProductFlow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchFlows = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<ProductFlow[] | { items?: ProductFlow[] }>("/inventory/flows", {
          params: {
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo,
            direction: filters.direction === "all" ? undefined : filters.direction,
            product: filters.product === "all" ? undefined : filters.product,
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setFlows(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Mahsulot oqimlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Mahsulot oqimlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchFlows()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo, filters.direction, filters.product])

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
      flows.filter((record) => {
        const matchesDirection = filters.direction === "all" || record.direction === filters.direction
        const matchesProduct = filters.product === "all" || record.product === filters.product
        return matchesDirection && matchesProduct && withinRange(record.loggedAt)
      }),
    [flows, filters.direction, filters.product, filters.dateFrom, filters.dateTo],
  )

  const stats = filteredRecords.reduce(
    (acc, record) => {
      if (record.direction === "Kirim") acc.inbound += record.quantity
      if (record.direction === "Chiqim") acc.outbound += record.quantity
      return acc
    },
    { inbound: 0, outbound: 0 },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Mahsulot kirim/chiqimi</h1>
        <p className="text-[#64748B] mt-1">Silos va qadoqlash jarayonidagi barcha harakatlar</p>
      </div>

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
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Yo'nalish</label>
            <select
              value={filters.direction}
              onChange={(e) => setFilters((prev) => ({ ...prev, direction: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="Kirim">Kirim</option>
              <option value="Chiqim">Chiqim</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Mahsulot</label>
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
        </div>
      </div>


      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Harakatlar jurnali</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["id", "product", "direction", "from", "to", "transport"]}
          renderCell={(row, col) => {
            if (col.key === "quantity") {
              return `${numberFormatter.format(row[col.key])} ${row.unit}`
            }
            return row[col.key]
          }}
          footerTotals={filteredRecords.reduce(
            (acc, record) => {
              acc.quantity += record.quantity
              acc.count += 1
              return acc
            },
            { quantity: 0, count: 0 },
          )}
        />
      </div>
    </div>
  )
}

