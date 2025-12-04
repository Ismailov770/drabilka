"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { ApiError, get } from "@/styles/lib/api"

interface DriverFuelRecord {
  id: string
  driver: string
  vehicle: string
  date: string
  time: string
  distanceKm: number
  amount: number
  fuelGaugePhoto?: string
  speedometerPhoto?: string
}

const columns = [
  { key: "order", label: "T/R", sortable: false },
  { key: "driver", label: "Haydovchi", sortable: true },
  { key: "vehicle", label: "Transport", sortable: true },
  { key: "distanceKm", label: "Masofa (km)", sortable: true },
  { key: "amount", label: "Yoqilg'i summasi (so'm)", sortable: true },
  { key: "date", label: "Sana / vaqt", sortable: true },
  { key: "fuelGaugePhoto", label: "Yoqilg'i datchigi", sortable: false },
  { key: "speedometerPhoto", label: "Speedometr surati", sortable: false },
]

const numberFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

export default function OwnerDriverFuelPage() {
  const [filters, setFilters] = useState({
    dateFrom: "2024-02-17",
    dateTo: "2024-02-19",
    driver: "all",
    vehicle: "all",
  })
  const [records, setRecords] = useState<DriverFuelRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchDriverFuel = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<DriverFuelRecord[] | { items?: DriverFuelRecord[] }>("/driver/fuel-records", {
          params: {
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo,
            driver: filters.driver === "all" ? undefined : filters.driver,
            vehicle: filters.vehicle === "all" ? undefined : filters.vehicle,
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setRecords(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Yoqilg'i yozuvlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Yoqilg'i yozuvlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchDriverFuel()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo, filters.driver, filters.vehicle])

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
      records
        .filter((record) => {
          const matchesDriver = filters.driver === "all" || record.driver === filters.driver
          const matchesVehicle = filters.vehicle === "all" || record.vehicle === filters.vehicle
          return matchesDriver && matchesVehicle && withinRange(record.date)
        })
        .map((record, index) => ({
          ...record,
          order: index + 1,
        })),
    [records, filters.driver, filters.vehicle, filters.dateFrom, filters.dateTo],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Haydovchilar yoqilg'i sarfi</h1>
        <p className="text-sm text-slate-500 mt-1">
          Shafyorlar tomonidan kiritilgan yoqilg'i summasi, masofa va chek suratlari bo'yicha hisobot
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Boshlanish sanasi</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Tugash sanasi</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Haydovchi</label>
            <select
              value={filters.driver}
              onChange={(e) => setFilters((prev) => ({ ...prev, driver: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="Ahmed Karim">Ahmed Karim</option>
              <option value="Omar Rashid">Omar Rashid</option>
              <option value="Karim Suleiman">Karim Suleiman</option>
              <option value="Otabek Usmonov">Otabek Usmonov</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Transport</label>
            <select
              value={filters.vehicle}
              onChange={(e) => setFilters((prev) => ({ ...prev, vehicle: e.target.value }))}
              className="w-full sm-select"
            >
              <option value="all">Barchasi</option>
              <option value="TRUCK-001 (01A123BC)">TRUCK-001 (01A123BC)</option>
              <option value="TRUCK-014 (80B456DE)">TRUCK-014 (80B456DE)</option>
              <option value="TRUCK-021 (25C789FG)">TRUCK-021 (25C789FG)</option>
              <option value="TRUCK-009 (30D012JK)">TRUCK-009 (30D012JK)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Yoqilg'i sarfi jurnali</h2>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["driver", "vehicle"]}
          renderCell={(row, col) => {
            if (col.key === "distanceKm") {
              return `${numberFormatter.format(row.distanceKm)} km`
            }
            if (col.key === "amount") {
              return `${numberFormatter.format(row.amount)} so'm`
            }
            if (col.key === "date") {
              return `${row.date} ${row.time}`
            }
            if (col.key === "fuelGaugePhoto") {
              return row.fuelGaugePhoto ? (
                <span className="text-[#2563EB] underline text-sm">{row.fuelGaugePhoto}</span>
              ) : (
                <span className="text-xs text-slate-400">Rasm yo'q</span>
              )
            }
            if (col.key === "speedometerPhoto") {
              return row.speedometerPhoto ? (
                <span className="text-[#2563EB] underline text-sm">{row.speedometerPhoto}</span>
              ) : (
                <span className="text-xs text-slate-400">Rasm yo'q</span>
              )
            }
            return row[col.key]
          }}
          footerTotals={filteredRecords.reduce(
            (acc, record) => {
              acc.amount += record.amount
              acc.count += 1
              return acc
            },
            { amount: 0, count: 0 },
          )}
        />
      </div>
    </div>
  )
}
