"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { ApiError, get } from "@/styles/lib/api"

type VehicleLogEntry = {
  id: string
  driver: string
  vehicleType: string
  material: string
  direction: "Kirdi" | "Chiqdi" | string
  entryAt: string
  exitAt?: string
}

const columns = [
  { key: "id", label: "Mashina raqami", sortable: true },
  { key: "driver", label: "Haydovchi", sortable: true },
  { key: "vehicleType", label: "Tur", sortable: true },
  { key: "material", label: "Yuk", sortable: false },
  { key: "direction", label: "Yo'nalish", sortable: true },
  { key: "entryAt", label: "Kirish vaqti", sortable: true },
  { key: "exitAt", label: "Chiqish vaqti", sortable: true },
]

const dateTimeFormatter = new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })

export default function VehicleLogPage() {
  const [filters, setFilters] = useState({
    dateFrom: "2024-02-18",
    dateTo: "2024-02-19",
    vehicleType: "all",
    direction: "all",
  })
  const [logs, setLogs] = useState<VehicleLogEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  const withinRange = (dateStr: string) => {
    const current = new Date(dateStr).getTime()
    const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined
    const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined
    const afterFrom = typeof from === "number" ? current >= from : true
    const beforeTo = typeof to === "number" ? current <= to : true
    return afterFrom && beforeTo
  }

  useEffect(() => {
    let cancelled = false

    const fetchLogs = async () => {
      setError(null)
      try {
        const response = await get<VehicleLogEntry[] | { items?: VehicleLogEntry[] }>("/vehicles/logs", {
          params: {
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo,
            vehicleType: filters.vehicleType === "all" ? undefined : filters.vehicleType,
            direction: filters.direction === "all" ? undefined : filters.direction,
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setLogs(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage = (err.data && (err.data as any).message) || err.message || "ANPR yozuvlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("ANPR yozuvlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      }
    }

    fetchLogs()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo, filters.vehicleType, filters.direction])

  const filteredRecords = useMemo(() => {
    return logs
      .filter((record) => {
        const matchesType = filters.vehicleType === "all" || record.vehicleType === filters.vehicleType
        const matchesDirection = filters.direction === "all" || record.direction === filters.direction
        return matchesType && matchesDirection && withinRange(record.entryAt)
      })
      .map((record) => ({
        ...record,
        entryAt: dateTimeFormatter.format(new Date(record.entryAt)),
        exitAt: record.exitAt ? dateTimeFormatter.format(new Date(record.exitAt)) : "-",
      }))
  }, [logs, filters.vehicleType, filters.direction, filters.dateFrom, filters.dateTo])

  const stats = filteredRecords.reduce(
    (acc, record) => {
      if (record.direction === "Kirdi") acc.entries += 1
      if (record.direction === "Chiqdi") acc.exits += 1
      return acc
    },
    { entries: 0, exits: 0 },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">ANPR mashinalar jurnali</h1>
        <p className="text-[#64748B] mt-1">Kirib-chiqqan barcha mashinalar bo'yicha vaqtli filtrlar</p>
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
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Mashina turi</label>
            <select
              value={filters.vehicleType}
              onChange={(e) => setFilters((prev) => ({ ...prev, vehicleType: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="Yirik yuk">Yirik yuk</option>
              <option value="Kichik yuk">Kichik yuk</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Yo'nalish</label>
            <select
              value={filters.direction}
              onChange={(e) => setFilters((prev) => ({ ...prev, direction: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="Kirdi">Kirdi</option>
              <option value="Chiqdi">Chiqdi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">ANPR yozuvlari</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable columns={columns} data={filteredRecords} searchableFields={["id", "driver", "vehicleType", "material"]} />
      </div>
    </div>
  )
}
