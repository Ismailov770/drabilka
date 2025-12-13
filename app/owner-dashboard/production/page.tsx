"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { SelectField } from "@/components/select-field"
import { ApiError, get } from "@/styles/lib/api"

type PaymentType = "Naqd" | "Qarzga" | "Click" | "OPLATA"

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

type Sale = {
  id: number
  saleCode: string
  client: string
  phone: string
  carNumber: string
  line: "A" | "B"
  material: string
  weight: number
  price: number
  unitPrice: number | null
  date: string
  employee: string
  paymentType: PaymentType
  note: string | null
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

const salesColumns = [
  { key: "id", label: "Savdo ID", sortable: true },
  { key: "client", label: "Mijoz", sortable: true },
  { key: "phone", label: "Telefon raqami", sortable: true },
  { key: "carNumber", label: "Avto raqami", sortable: true },
  { key: "line", label: "Press liniyasi", sortable: true },
  { key: "material", label: "Mahsulot", sortable: true },
  { key: "weight", label: "Hajm (m³)", sortable: true },
  { key: "unitPrice", label: "Narx (so'm / m³)", sortable: true },
  { key: "price", label: "Summa (so'm)", sortable: true },
  { key: "paymentType", label: "To'lov turi", sortable: true },
  { key: "date", label: "Sana", sortable: true },
  { key: "employee", label: "Mas'ul xodim", sortable: true },
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
    paymentType: "all" as "all" | PaymentType,
  })
  const [records, setRecords] = useState<ProductOutflow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sales, setSales] = useState<Sale[]>([])
  const [salesError, setSalesError] = useState<string | null>(null)

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

  useEffect(() => {
    let cancelled = false

    const fetchSales = async () => {
      setSalesError(null)
      try {
        const response = await get<Sale[]>("/sales", {
          params: {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
          },
        })

        if (cancelled) return

        setSales(response)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Savdolarni yuklashda xatolik yuz berdi"
          setSalesError(backendMessage)
        } else {
          setSalesError("Savdolarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      }
    }

    fetchSales()

    return () => {
      cancelled = true
    }
  }, [filters.dateFrom, filters.dateTo])

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

  const filteredSales = useMemo(
    () =>
      sales.filter((sale) => {
        const matchesPaymentType =
          filters.paymentType === "all" || sale.paymentType === filters.paymentType
        return matchesPaymentType
      }),
    [sales, filters.paymentType],
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <SelectField
              value={filters.product}
              onChange={(product) => setFilters((prev) => ({ ...prev, product }))}
              options={[
                { value: "all", label: "Barchasi" },
                { value: "Finski", label: "Finski" },
                { value: "Kampot", label: "Kampot" },
                { value: "Shebyon", label: "Shebyon" },
                { value: "Klinest", label: "Klinest" },
              ]}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Smena</label>
            <SelectField
              value={filters.shift}
              onChange={(shift) => setFilters((prev) => ({ ...prev, shift }))}
              options={[
                { value: "all", label: "Barchasi" },
                { value: "DAY", label: "Kunduzgi" },
                { value: "NIGHT", label: "Kechgi" },
              ]}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">To'lov turi (savdolar)</label>
            <SelectField
              value={filters.paymentType}
              onChange={(paymentType) =>
                setFilters((prev) => ({ ...prev, paymentType: paymentType as "all" | PaymentType }))
              }
              options={[
                { value: "all", label: "Barchasi" },
                { value: "Naqd", label: "Naqd" },
                { value: "Qarzga", label: "Qarzga" },
                { value: "Click", label: "Click" },
                { value: "OPLATA", label: "OPLATA" },
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
                product: "all",
                shift: "all",
                paymentType: "all",
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

      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Savdolar bo'yicha tafsilot</h2>
        {salesError && <p className="mb-4 text-sm text-red-600">{salesError}</p>}
        <DataTable
          columns={salesColumns}
          data={filteredSales}
          searchableFields={["id", "client", "phone", "material", "carNumber", "paymentType"]}
          renderCell={(row, col) => {
            if (col.key === "id") {
              return row.saleCode || row.id
            }
            if (col.key === "weight") {
              return row.weight
            }
            if (col.key === "price" || col.key === "unitPrice") {
              return numberFormatter.format(row[col.key] ?? 0)
            }
            return row[col.key]
          }}
        />
      </div>

           
    </div>
  )
}

