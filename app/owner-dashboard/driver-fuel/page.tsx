"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { SelectField } from "@/components/select-field"
import { ApiError, get } from "@/styles/lib/api"

interface DriverFuelRecord {
  id: string
  driverId?: number
  vehicleId?: number
  driver: string
  vehicle: string
  date: string
  time: string
  distanceKm: number
  amount: number
  fuelGaugePhoto?: string
  speedometerPhoto?: string
}

interface FuelEventDto {
  id: number
  driverId?: number
  driverName?: string
  vehicleId?: number
  amount: number
  distanceKm: number
  vehiclePlateNumber?: string
  fuelGaugePhotoUrl?: string
  speedometerPhotoUrl?: string
  dateTime?: string
  createdAt?: string
}

interface SelectOption {
  id: number
  label: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api"

function toFullFileUrl(url?: string): string | undefined {
  if (!url) return undefined
  if (url.startsWith("http://") || url.startsWith("https://")) return url

  let origin = ""
  try {
    const parsed = new URL(API_BASE_URL)
    origin = parsed.origin
  } catch {
    origin = API_BASE_URL.replace(/\/$/, "")
  }

  if (url.startsWith("/")) {
    return `${origin}${url}`
  }

  return `${origin}/${url}`
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

const today = new Date()
const currentYear = today.getFullYear()
const defaultDateFrom = ""
const defaultDateTo = ""

export default function OwnerDriverFuelPage() {
  const [filters, setFilters] = useState({
    dateFrom: defaultDateFrom,
    dateTo: defaultDateTo,
    driver: "all",
    vehicle: "all",
  })
  const [records, setRecords] = useState<DriverFuelRecord[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null)
  const [driverOptions, setDriverOptions] = useState<SelectOption[]>([])
  const [vehicleOptions, setVehicleOptions] = useState<SelectOption[]>([])

  useEffect(() => {
    let cancelled = false

    const fetchFilters = async () => {
      try {
        const response = await get<any>("/fuel/filters")
        if (cancelled) return

        const rawDrivers = (response && (response as any).drivers) || []
        const rawVehicles = (response && (response as any).vehicles) || []

        const mappedDrivers: SelectOption[] = rawDrivers
          .map((d: any) => {
            if (d == null || d.id == null) return null
            const label =
              d.name ?? d.fullName ?? d.username ?? (typeof d.id === "number" ? `ID ${d.id}` : String(d.id))
            return { id: Number(d.id), label }
          })
          .filter((d: SelectOption | null): d is SelectOption => d !== null)

        const mappedVehicles: SelectOption[] = rawVehicles
          .map((v: any) => {
            if (v == null || v.id == null) return null
            const label =
              v.name ?? v.label ?? v.plate ?? (typeof v.id === "number" ? `ID ${v.id}` : String(v.id))
            return { id: Number(v.id), label }
          })
          .filter((v: SelectOption | null): v is SelectOption => v !== null)

        setDriverOptions(mappedDrivers)
        setVehicleOptions(mappedVehicles)
      } catch {
        if (!cancelled) {
          setDriverOptions([])
          setVehicleOptions([])
        }
      }
    }

    fetchFilters()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchDriverFuel = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<FuelEventDto[] | { items?: FuelEventDto[] }>("/fuel/events", {
          params: {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
            driverId: filters.driver === "all" ? undefined : Number(filters.driver),
            vehicleId: filters.vehicle === "all" ? undefined : Number(filters.vehicle),
          },
        })

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []

        const mapped: DriverFuelRecord[] = (items as FuelEventDto[]).map((item) => {
          const driverLabel =
            (item.driverName && item.driverName.length > 0
              ? item.driverName
              : driverOptions.find((d) => d.id === item.driverId)?.label) ??
            (item.driverId != null ? `ID ${item.driverId}` : "-")

          const vehicleLabel =
            item.vehiclePlateNumber && item.vehiclePlateNumber.length > 0
              ? item.vehiclePlateNumber
              : item.vehicleId != null
                ? vehicleOptions.find((v) => v.id === item.vehicleId)?.label ?? `ID ${item.vehicleId}`
                : "-"

          let date = ""
          let time = ""
          const dateSource = item.dateTime ?? item.createdAt
          if (dateSource) {
            const d = new Date(dateSource)
            if (!Number.isNaN(d.getTime())) {
              date = d.toISOString().slice(0, 10)
              time = d.toTimeString().slice(0, 5)
            }
          }

          return {
            id: String(item.id),
            driverId: item.driverId,
            vehicleId: item.vehicleId,
            driver: driverLabel,
            vehicle: vehicleLabel,
            date,
            time,
            distanceKm: item.distanceKm ?? 0,
            amount: item.amount ?? 0,
            fuelGaugePhoto: toFullFileUrl(item.fuelGaugePhotoUrl),
            speedometerPhoto: toFullFileUrl(item.speedometerPhotoUrl),
          }
        })

        setRecords(mapped)
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
  }, [filters.dateFrom, filters.dateTo, filters.driver, filters.vehicle, driverOptions, vehicleOptions])

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
          const matchesDriver =
            filters.driver === "all" || (record.driverId != null && String(record.driverId) === filters.driver)
          const matchesVehicle =
            filters.vehicle === "all" || (record.vehicleId != null && String(record.vehicleId) === filters.vehicle)
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
            <SelectField
              value={filters.driver}
              onChange={(driver) => setFilters((prev) => ({ ...prev, driver }))}
              options={[
                { value: "all", label: "Barchasi" },
                ...driverOptions.map((driver) => ({ value: String(driver.id), label: driver.label })),
              ]}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900 mb-2 block">Transport</label>
            <SelectField
              value={filters.vehicle}
              onChange={(vehicle) => setFilters((prev) => ({ ...prev, vehicle }))}
              options={[
                { value: "all", label: "Barchasi" },
                ...vehicleOptions.map((vehicle) => ({ value: String(vehicle.id), label: vehicle.label })),
              ]}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setFilters({
                dateFrom: "",
                dateTo: "",
                driver: "all",
                vehicle: "all",
              })
            }
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 mt-2"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800">
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
              if (!row.fuelGaugePhoto) {
                return <span className="text-xs text-slate-400">Rasm yo'q</span>
              }

              return (
                <button
                  type="button"
                  onClick={() => setPreviewImage({ url: row.fuelGaugePhoto, title: "Yoqilg'i datchigi surati" })}
                  className="flex items-center gap-2 text-[#2563EB] hover:underline text-sm"
                >
                  <img
                    src={row.fuelGaugePhoto}
                    alt="Yoqilg'i datchigi surati"
                    className="w-12 h-12 rounded-md object-cover border border-slate-200"
                  />
                  <span>Ko'rish</span>
                </button>
              )
            }
            if (col.key === "speedometerPhoto") {
              if (!row.speedometerPhoto) {
                return <span className="text-xs text-slate-400">Rasm yo'q</span>
              }

              return (
                <button
                  type="button"
                  onClick={() => setPreviewImage({ url: row.speedometerPhoto, title: "Speedometr surati" })}
                  className="flex items-center gap-2 text-[#2563EB] hover:underline text-sm"
                >
                  <img
                    src={row.speedometerPhoto}
                    alt="Speedometr surati"
                    className="w-12 h-12 rounded-md object-cover border border-slate-200"
                  />
                  <span>Ko'rish</span>
                </button>
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

      <Modal
        isOpen={!!previewImage}
        title={previewImage?.title ?? "Rasm"}
        onClose={() => setPreviewImage(null)}
        size="lg"
      >
        {previewImage && (
          <div className="flex justify-center">
            <img
              src={previewImage.url}
              alt={previewImage.title}
              className="max-h-[80vh] w-auto rounded-xl border border-slate-200"
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
