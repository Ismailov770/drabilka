"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ApiError, get } from "@/styles/lib/api"

const timelineData = [
  { date: "2024-01-02", produced: 145, sold: 118, expenses: 23000, payroll: 9000, machineUsage: 15 },
  { date: "2024-01-08", produced: 162, sold: 134, expenses: 25000, payroll: 9800, machineUsage: 18 },
  { date: "2024-01-15", produced: 178, sold: 150, expenses: 26800, payroll: 10100, machineUsage: 20 },
  { date: "2024-01-22", produced: 185, sold: 160, expenses: 27600, payroll: 10200, machineUsage: 22 },
  { date: "2024-01-29", produced: 191, sold: 168, expenses: 28300, payroll: 10400, machineUsage: 21 },
  { date: "2024-02-05", produced: 205, sold: 180, expenses: 29500, payroll: 10700, machineUsage: 23 },
  { date: "2024-02-12", produced: 212, sold: 186, expenses: 30200, payroll: 10800, machineUsage: 24 },
  { date: "2024-02-19", produced: 225, sold: 194, expenses: 31400, payroll: 11000, machineUsage: 25 },
]

type ProductionBatch = {
  batchId: string
  product: string
  shift: string
  line: string
  quantity: number
  unit: string
  producedAt: string
}

type Expense = {
  id: string
  title?: string
  category: string
  amount: number
  date: string
}

type VehicleLogEntry = {
  vehicleIdCode: string
  direction: string
  material: string
  driver: string
  entryAt?: string
  exitAt?: string
}

const dateFormatter = new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "short" })
const dateTimeFormatter = new Intl.DateTimeFormat("uz-UZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
const numberFormatter = new Intl.NumberFormat("ru-RU")
const currencyFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const quickRanges = [
  { label: "7 kun", days: 7 },
  { label: "14 kun", days: 14 },
  { label: "30 kun", days: 30 },
]

export default function OwnerDashboard() {
  const [filters, setFilters] = useState({
    dateFrom: timelineData[0].date,
    dateTo: timelineData[timelineData.length - 1].date,
  })
  const [latestBatches, setLatestBatches] = useState<ProductionBatch[]>([])
  const [batchesError, setBatchesError] = useState<string | null>(null)
  const [isBatchesLoading, setIsBatchesLoading] = useState(false)

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expensesError, setExpensesError] = useState<string | null>(null)

  const [vehicleLogs, setVehicleLogs] = useState<VehicleLogEntry[]>([])
  const [vehiclesError, setVehiclesError] = useState<string | null>(null)

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

    const fetchDashboardData = async () => {
      setBatchesError(null)
      setExpensesError(null)
      setVehiclesError(null)

      try {
        setIsBatchesLoading(true)

        const [batchesResponse, expensesResponse, vehiclesResponse] = await Promise.all([
          get<ProductionBatch[] | { items?: ProductionBatch[] }>("/production/batches", {
            params: {
              dateFrom: filters.dateFrom,
              dateTo: filters.dateTo,
            },
          }),
          get<Expense[] | { items?: Expense[] }>("/expenses", {
            params: {
              dateFrom: filters.dateFrom,
              dateTo: filters.dateTo,
            },
          }),
          get<VehicleLogEntry[] | { items?: VehicleLogEntry[] }>("/vehicles/logs", {
            params: {
              dateFrom: filters.dateFrom,
              dateTo: filters.dateTo,
            },
          }),
        ])

        if (cancelled) return

        const batches = Array.isArray(batchesResponse) ? batchesResponse : batchesResponse.items ?? []
        const sortedBatches = [...batches].sort((a, b) => {
          const aTime = new Date(a.producedAt).getTime()
          const bTime = new Date(b.producedAt).getTime()
          if (aTime === bTime) {
            return String(b.batchId).localeCompare(String(a.batchId))
          }
          return bTime - aTime
        })
        setLatestBatches(sortedBatches.slice(0, 4))

        const expenseItems = Array.isArray(expensesResponse) ? expensesResponse : expensesResponse.items ?? []
        setExpenses(expenseItems)

        const vehicleItems = Array.isArray(vehiclesResponse) ? vehiclesResponse : vehiclesResponse.items ?? []
        setVehicleLogs(vehicleItems)
      } catch (err: any) {
        if (cancelled) return

        if (err instanceof ApiError) {
          const backendMessage = (err.data && (err.data as any).message) || err.message || "Dashboard ma'lumotlarini yuklashda xatolik yuz berdi"
          setBatchesError(backendMessage)
        } else {
          setBatchesError("Dashboard ma'lumotlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsBatchesLoading(false)
        }
      }
    }

    fetchDashboardData()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo])

  const shiftToUzbekLabel = (shift: string) => {
    switch (shift) {
      case "DAY":
        return "Kunduzgi smena"
      case "NIGHT":
        return "Kechgi smena"
      case "MORNING":
        return "Tonggi smena"
      default:
        return shift
    }
  }

  const expenseSignals = useMemo(() => {
    const map = new Map<string, number>()
    for (const e of expenses) {
      const current = map.get(e.category) || 0
      map.set(e.category, current + e.amount)
    }

    return Array.from(map.entries())
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 4)
  }, [expenses])

  const filteredTimeline = useMemo(
    () => timelineData.filter((row) => withinRange(row.date)),
    [filters.dateFrom, filters.dateTo],
  )

  const filteredVehicles = useMemo(
    () =>
      vehicleLogs.filter((row) => {
        const timestamp = row.entryAt || row.exitAt
        if (!timestamp) return false
        return withinRange(timestamp)
      }),
    [vehicleLogs, filters.dateFrom, filters.dateTo],
  )

  const totals = useMemo(
    () =>
      filteredTimeline.reduce(
        (acc, row) => {
          acc.produced += row.produced
          acc.sold += row.sold
          acc.expenses += row.expenses
          acc.payroll += row.payroll
          acc.machine += row.machineUsage
          return acc
        },
        { produced: 0, sold: 0, expenses: 0, payroll: 0, machine: 0 },
      ),
    [filteredTimeline],
  )

  const applyQuickRange = (days: number) => {
    const end = new Date(timelineData[timelineData.length - 1].date)
    const start = new Date(end)
    start.setDate(start.getDate() - (days - 1))
    setFilters((prev) => ({
      ...prev,
      dateFrom: start.toISOString().slice(0, 10),
      dateTo: end.toISOString().slice(0, 10),
    }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Boshliq (Owner) Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Mahsulot, rasxod va texnika holati bo'yicha jonli nazorat</p>
      </div>

      {/* Filtrlar */}
      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Davr boshi</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Davr oxiri</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => applyQuickRange(range.days)}
              className="px-4 py-2 border border-slate-200 text-sm text-[#2563EB] rounded-full bg-slate-50 hover:bg-[#EFF6FF]"
            >
              {range.label} so'nggi
            </button>
          ))}
        </div>
      </div>

  

      {/* Batafsil bo'limlar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Oxirgi batchlar</h2>
            <span className="text-sm text-slate-500">So'nggi 4 ta partiya</span>
          </div>
          {batchesError && <p className="mb-4 text-sm text-red-600">{batchesError}</p>}
          <div className="space-y-4">
            {latestBatches.map((batch) => (
              <div
                key={batch.batchId}
                className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {batch.batchId} · {batch.product}
                  </p>
                  <p className="text-sm text-slate-500">
                    {shiftToUzbekLabel(batch.shift)} · {batch.line} · {dateTimeFormatter.format(new Date(batch.producedAt))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-slate-900">
                    {batch.quantity} {batch.unit}
                  </p>
                </div>
              </div>
            ))}
            {!isBatchesLoading && latestBatches.length === 0 && !batchesError && (
              <p className="text-sm text-slate-400">Tanlangan davr uchun batchlar topilmadi</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Rasxodlar bo'yicha signal</h2>
          {expensesError && <p className="mb-2 text-sm text-red-600">{expensesError}</p>}
          <div className="space-y-4">
            {expenseSignals.map((item) => (
              <div
                key={item.category}
                className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-slate-900">{item.category}</p>
                </div>
                <p className="text-sm text-slate-400 mb-2">Kategoriya bo'yicha umumiy sarf</p>
                <p className="text-lg font-semibold text-slate-900">{currencyFormatter.format(item.total)}</p>
              </div>
            ))}
            {expenseSignals.length === 0 && !expensesError && (
              <p className="text-sm text-slate-400">Tanlangan davr uchun rasxodlar topilmadi</p>
            )}
          </div>
        </div>
      </div>

      {/* Mashinalar harakati */}
      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Kelib chiqayotgan mashinalar</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              {filters.dateFrom || filters.dateTo ? "Filtrlash natijalari" : "Oxirgi 5 ta yozuv"}
            </span>
            <Link href="/owner-dashboard/driver-fuel" className="text-sm text-[#2563EB] hover:underline">
              Haydovchi yoqilg'i sarfi
            </Link>
          </div>
        </div>
        {vehiclesError && <p className="mb-4 text-sm text-red-600">{vehiclesError}</p>}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Mashina</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Yo'nalish</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Maqsad</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Haydovchi</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Vaqt</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => {
                  const timestamp = vehicle.entryAt || vehicle.exitAt
                  return (
                    <tr
                      key={`${vehicle.vehicleIdCode}-${timestamp}`}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">{vehicle.vehicleIdCode}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          vehicle.direction === "Kirdi"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {vehicle.direction}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{vehicle.material}</td>
                    <td className="px-4 py-3 text-slate-900">{vehicle.driver}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {timestamp ? dateTimeFormatter.format(new Date(timestamp)) : "-"}
                    </td>
                  </tr>
                  )
                })
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-400" colSpan={5}>
                    Tanlangan vaqt oralig'ida ma'lumot yo'q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
