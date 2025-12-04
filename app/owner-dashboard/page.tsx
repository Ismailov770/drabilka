"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

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

const productRuns = [
  { batchId: "BCH-240201", product: "M400", shift: "Tonggi", produced: 120, line: "Press A", producedAt: "2024-02-19T08:30:00", status: "Yakunlandi" },
  { batchId: "BCH-240198", product: "M500", shift: "Kechgi", produced: 95, line: "Press B", producedAt: "2024-02-18T19:10:00", status: "Yakunlandi" },
  { batchId: "BCH-240196", product: "Sulfatga chidamli", shift: "Kunduzgi", produced: 75, line: "Press C", producedAt: "2024-02-18T13:05:00", status: "Yakunlandi" },
  { batchId: "BCH-240190", product: "M400", shift: "Tonggi", produced: 118, line: "Press A", producedAt: "2024-02-17T08:20:00", status: "Nazoratda" },
]

const expenseHighlights = [
  { id: "EXP-901", title: "Energiya sarfi", category: "Energiya", amount: 12400, date: "2024-02-18" },
  { id: "EXP-902", title: "Xom ashyo logistika", category: "Logistika", amount: 8700, date: "2024-02-17" },
  { id: "EXP-903", title: "Texnik xizmat", category: "Texnik", amount: 5400, date: "2024-02-15" },
  { id: "EXP-904", title: "Ishchilar bonus", category: "Ish haqi", amount: 3600, date: "2024-02-14" },
]

const vehicleMovements = [
  { id: "TRUCK-001", driver: "Ahmed Karim", type: "Yirik yuk", purpose: "Ohaktosh", direction: "Kirdi", timestamp: "2024-02-19T09:15:00" },
  { id: "TRUCK-014", driver: "Sardor N.", type: "Yirik yuk", purpose: "Mahsulot yuklash", direction: "Chiqdi", timestamp: "2024-02-19T07:40:00" },
  { id: "TRUCK-021", driver: "Karim S.", type: "Kichik yuk", purpose: "Mahsulot yetkazish", direction: "Chiqdi", timestamp: "2024-02-18T18:20:00" },
  { id: "TRUCK-009", driver: "Otabek U.", type: "Yirik yuk", purpose: "Gips kirim", direction: "Kirdi", timestamp: "2024-02-18T15:05:00" },
  { id: "TRUCK-002", driver: "Jasur K.", type: "Kichik yuk", purpose: "Tayyor mahsulot", direction: "Chiqdi", timestamp: "2024-02-18T11:45:00" },
]

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

  const withinRange = (dateStr: string) => {
    const current = new Date(dateStr).getTime()
    const from = filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined
    const to = filters.dateTo ? new Date(filters.dateTo).getTime() : undefined
    const afterFrom = typeof from === "number" ? current >= from : true
    const beforeTo = typeof to === "number" ? current <= to : true
    return afterFrom && beforeTo
  }

  const filteredTimeline = useMemo(
    () => timelineData.filter((row) => withinRange(row.date)),
    [filters.dateFrom, filters.dateTo],
  )

  const filteredVehicles = useMemo(
    () => vehicleMovements.filter((row) => withinRange(row.timestamp)),
    [filters.dateFrom, filters.dateTo],
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
          <div className="space-y-4">
            {productRuns.map((batch) => (
              <div key={batch.batchId} className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-slate-900">
                    {batch.batchId} · {batch.product}
                  </p>
                  <p className="text-sm text-slate-500">
                    {batch.shift} smena · {batch.line} · {dateTimeFormatter.format(new Date(batch.producedAt))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-slate-900">{batch.produced} t</p>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      batch.status === "Yakunlandi" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Rasxodlar bo'yicha signal</h2>
          <div className="space-y-4">
            {expenseHighlights.map((expense) => (
              <div key={expense.id} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-slate-900">{expense.title}</p>
                  <span className="text-sm text-slate-500">{dateFormatter.format(new Date(expense.date))}</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{expense.category}</p>
                <p className="text-lg font-semibold text-slate-900">{currencyFormatter.format(expense.amount)}</p>
              </div>
            ))}
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
                filteredVehicles.map((vehicle) => (
                  <tr key={`${vehicle.id}-${vehicle.timestamp}`} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{vehicle.id}</td>
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
                    <td className="px-4 py-3 text-slate-500">{vehicle.purpose}</td>
                    <td className="px-4 py-3 text-slate-900">{vehicle.driver}</td>
                    <td className="px-4 py-3 text-slate-500">{dateTimeFormatter.format(new Date(vehicle.timestamp))}</td>
                  </tr>
                ))
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
