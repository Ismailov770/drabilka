"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ApiError, get } from "@/styles/lib/api"
type Sale = {
  id: string
  date: string
  weight: number
}

type PayrollRecord = {
  id: string
  payoutDate: string
  total: number
}

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
const currencyFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })
const quickRanges = [
  { label: "7 kun", days: 7 },
  { label: "14 kun", days: 14 },
  { label: "30 kun", days: 30 },
]
const defaultDateFrom = ""
const defaultDateTo = ""

const salesColumns = [
  { key: "id", label: "Savdo ID", sortable: true },
  { key: "client", label: "Mijoz", sortable: true },
  { key: "phone", label: "Telefon raqami", sortable: true },
  { key: "carNumber", label: "Avto raqami", sortable: true },
  { key: "material", label: "Mahsulot", sortable: true },
  { key: "weight", label: "Hajm (m³)", sortable: true },
  { key: "price", label: "Summa (so'm)", sortable: true },
  { key: "paymentType", label: "To'lov turi", sortable: true },
  { key: "date", label: "Sana", sortable: true },
]

export default function OwnerDashboard() {
  const [filters, setFilters] = useState({
    dateFrom: defaultDateFrom,
    dateTo: defaultDateTo,
  })
  const [allBatches, setAllBatches] = useState<ProductionBatch[]>([])
  const [latestBatches, setLatestBatches] = useState<ProductionBatch[]>([])
  const [batchesError, setBatchesError] = useState<string | null>(null)
  const [isBatchesLoading, setIsBatchesLoading] = useState(false)

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expensesError, setExpensesError] = useState<string | null>(null)

  const [vehicleLogs, setVehicleLogs] = useState<VehicleLogEntry[]>([])
  const [vehiclesError, setVehiclesError] = useState<string | null>(null)

  const [sales, setSales] = useState<Sale[]>([])
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([])

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

        const [
          batchesResponse,
          expensesResponse,
          vehiclesResponse,
          salesResponse,
          payrollResponse,
        ] = await Promise.all([
          get<ProductionBatch[] | { items?: ProductionBatch[] }>("/production/batches", {
            params: {
              dateFrom: filters.dateFrom || undefined,
              dateTo: filters.dateTo || undefined,
            },
          }),
          get<Expense[] | { items?: Expense[] }>("/expenses", {
            params: {
              dateFrom: filters.dateFrom || undefined,
              dateTo: filters.dateTo || undefined,
            },
          }),
          get<VehicleLogEntry[] | { items?: VehicleLogEntry[] }>("/vehicles/logs", {
            params: {
              dateFrom: filters.dateFrom || undefined,
              dateTo: filters.dateTo || undefined,
            },
          }),
          get<Sale[] | { items?: Sale[] }>("/sales", {
            params: {
              dateFrom: filters.dateFrom || undefined,
              dateTo: filters.dateTo || undefined,
            },
          }),
          get<PayrollRecord[] | { items?: PayrollRecord[] }>("/payroll", {
            params: {
              dateFrom: filters.dateFrom || undefined,
              dateTo: filters.dateTo || undefined,
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
        setAllBatches(batches)
        setLatestBatches(sortedBatches.slice(0, 4))

        const expenseItems = Array.isArray(expensesResponse) ? expensesResponse : expensesResponse.items ?? []
        setExpenses(expenseItems)

        const vehicleItems = Array.isArray(vehiclesResponse) ? vehiclesResponse : vehiclesResponse.items ?? []
        setVehicleLogs(vehicleItems)

        const salesItems = Array.isArray(salesResponse) ? salesResponse : salesResponse.items ?? []
        setSales(salesItems)

        const payrollItems = Array.isArray(payrollResponse) ? payrollResponse : payrollResponse.items ?? []
        setPayrollRecords(payrollItems)
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

  const filteredBatchesForTotals = useMemo(
    () => allBatches.filter((batch) => withinRange(batch.producedAt)),
    [allBatches, filters.dateFrom, filters.dateTo],
  )

  const filteredSales = useMemo(
    () => sales.filter((sale) => withinRange(sale.date)),
    [sales, filters.dateFrom, filters.dateTo],
  )

  const filteredExpenses = useMemo(
    () => expenses.filter((expense) => withinRange(expense.date)),
    [expenses, filters.dateFrom, filters.dateTo],
  )

  const filteredPayroll = useMemo(
    () => payrollRecords.filter((record) => withinRange(record.payoutDate)),
    [payrollRecords, filters.dateFrom, filters.dateTo],
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
    () => {
      const acc = { produced: 0, sold: 0, expenses: 0, payroll: 0, machine: 0 }

      for (const batch of filteredBatchesForTotals) {
        acc.produced += batch.quantity
      }

      for (const sale of filteredSales) {
        acc.sold += sale.weight
      }

      for (const expense of filteredExpenses) {
        acc.expenses += expense.amount
      }

      for (const record of filteredPayroll) {
        acc.payroll += record.total
      }

      acc.machine = filteredVehicles.length

      return acc
    },
    [filteredBatchesForTotals, filteredSales, filteredExpenses, filteredPayroll, filteredVehicles],
  )

  const hasAnyData = useMemo(
    () =>
      filteredBatchesForTotals.length > 0 ||
      filteredSales.length > 0 ||
      filteredExpenses.length > 0 ||
      filteredPayroll.length > 0,
    [filteredBatchesForTotals, filteredSales, filteredExpenses, filteredPayroll],
  )

  const applyQuickRange = (days: number) => {
    const end = new Date()
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800 space-y-4">
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
          <button
            type="button"
            onClick={() =>
              setFilters({
                dateFrom: "",
                dateTo: "",
              })
            }
            className="px-4 py-2 border border-slate-200 text-sm text-slate-700 rounded-full bg-white hover:bg-slate-50"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

      {/* Umumiy statistika bo'yicha kartochkalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Ishlab chiqarilgan (m³)</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {numberFormatter.format(totals.produced)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {hasAnyData ? "Tanlangan davr bo'yicha" : "Ma'lumot yo'q"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Sotilgan (m³)</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {numberFormatter.format(totals.sold)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {hasAnyData ? "Tanlangan davr bo'yicha" : "Ma'lumot yo'q"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Umumiy rasxodlar (so'm)</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {currencyFormatter.format(totals.expenses)} so'm
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {hasAnyData ? "Tanlangan davr bo'yicha" : "Ma'lumot yo'q"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Ish haqi (so'm)</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {currencyFormatter.format(totals.payroll)} so'm
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {hasAnyData ? "Tanlangan davr bo'yicha" : "Ma'lumot yo'q"}
          </p>
        </div>
      </div>

      {/* Batafsil bo'limlar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Oxirgi batchlar</h2>
            <span className="text-sm text-slate-500">So'nggi 4 ta partiya</span>
          </div>
          {batchesError && <p className="mb-4 text-sm text-red-600">{batchesError}</p>}
          <div className="space-y-4">
            {latestBatches.map((batch) => (
              <div
                key={batch.batchId}
                className="flex items-center justify-between border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Rasxodlar bo'yicha signal</h2>
          {expensesError && <p className="mb-2 text-sm text-red-600">{expensesError}</p>}
          <div className="space-y-4">
            {expenseSignals.map((item) => (
              <div
                key={item.category}
                className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-slate-900">{item.category}</p>
                </div>
                <p className="text-sm text-slate-400 mb-2">Kategoriya bo'yicha umumiy sarf</p>
                <p className="text-lg font-semibold text-slate-900">{currencyFormatter.format(item.total)} so'm</p>
              </div>
            ))}
            {expenseSignals.length === 0 && !expensesError && (
              <p className="text-sm text-slate-400">Tanlangan davr uchun rasxodlar topilmadi</p>
            )}
          </div>
        </div>
      </div>

      {/* Mashinalar harakati */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
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
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
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
