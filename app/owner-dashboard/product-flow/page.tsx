"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { useToast } from "@/hooks/use-toast"
import { ApiError, get, post } from "@/styles/lib/api"

type ProductFlow = {
  id: number
  product: string
  direction: string
  quantity: number
  unit: string
  amount: number
  loggedAt: string
}

type ProductFlowCreateRequest = {
  product: string
  direction: string
  quantity: number
  unit: string
  amount: number
  loggedAt: string
}

const columns = [
  { key: "id", label: "Hujjat ID", sortable: true },
  { key: "product", label: "Mahsulot", sortable: true },
  { key: "quantity", label: "Hajm (m³)", sortable: true },
  { key: "amount", label: "Summa (so'm)", sortable: true },
  { key: "loggedAt", label: "Sana", sortable: true },
]

const quantityFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 3 })
const amountFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

export default function OwnerProductFlowPage() {
  const { toast } = useToast()

  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    product: "all",
  })
  const [flows, setFlows] = useState<ProductFlow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddFlowOpen, setIsAddFlowOpen] = useState(false)
  const [newFlow, setNewFlow] = useState({
    product: "",
    quantity: "",
    amount: "",
    loggedAt: new Date().toISOString().split("T")[0],
  })
  const [fieldErrors, setFieldErrors] = useState({
    product: "",
    quantity: "",
    amount: "",
    loggedAt: "",
  })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchFlows = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<ProductFlow[] | { items?: ProductFlow[] }>("/inventory/flows", {
          params: {
            dateFrom: filters.dateFrom || undefined,
            dateTo: filters.dateTo || undefined,
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
            (err.data && (err.data as any).message) ||
            err.message ||
            "Mahsulot oqimlarini yuklashda xatolik yuz berdi"
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
  }, [filters.dateFrom, filters.dateTo, filters.product])

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
        const matchesProduct = filters.product === "all" || record.product === filters.product
        return matchesProduct && withinRange(record.loggedAt)
      }),
    [flows, filters.product, filters.dateFrom, filters.dateTo],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Mahsulot kirim/chiqimi</h1>
        <p className="text-[#64748B] mt-1">Silos va qadoqlash jarayonidagi barcha harakatlar</p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setFilters({
                dateFrom: "",
                dateTo: "",
                product: "all",
              })
            }
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9]"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">Harakatlar jurnali</h2>
          <button
            type="button"
            onClick={() => setIsAddFlowOpen(true)}
            className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold flex items-center gap-2"
          >
            <span>+</span>
            <span>Yangi harakat</span>
          </button>
        </div>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <DataTable
          columns={columns}
          data={filteredRecords}
          searchableFields={["id", "product"]}
          renderCell={(row, col) => {
            if (col.key === "quantity") {
              return `${quantityFormatter.format(row.quantity)} m³`
            }
            if (col.key === "amount") {
              return `${amountFormatter.format(row.amount)} so'm`
            }
            if (col.key === "loggedAt") {
              return row.loggedAt ? row.loggedAt.slice(0, 10) : ""
            }
            if (col.key === "product") {
              return (
                <span className="inline-flex items-center gap-2">
                  <span>{row.product}</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5">
                    Kirim
                  </span>
                </span>
              )
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
      <Modal
        isOpen={isAddFlowOpen}
        title="Yangi mahsulot harakati"
        onClose={() => {
          setIsAddFlowOpen(false)
          setNewFlow({
            product: "",
            quantity: "",
            amount: "",
            loggedAt: new Date().toISOString().split("T")[0],
          })
          setFieldErrors({
            product: "",
            quantity: "",
            amount: "",
            loggedAt: "",
          })
          setSubmitError(null)
          setIsSubmitting(false)
        }}
        size="md"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setSubmitError(null)
            setFieldErrors({
              product: "",
              quantity: "",
              amount: "",
              loggedAt: "",
            })

            try {
              const product = newFlow.product?.trim() ?? ""
              const quantityValue = Number(newFlow.quantity)
              const amountValue = Number(newFlow.amount)
              const dateOnly = newFlow.loggedAt

              const errors = {
                product: "",
                quantity: "",
                amount: "",
                loggedAt: "",
              }

              let hasError = false

              if (!product) {
                errors.product = "Mahsulotni tanlang"
                hasError = true
              }
              if (!newFlow.quantity || Number.isNaN(quantityValue) || quantityValue <= 0) {
                errors.quantity = "Hajm 0 dan katta bo'lishi kerak"
                hasError = true
              }
              if (!newFlow.amount || Number.isNaN(amountValue) || amountValue <= 0) {
                errors.amount = "Summa 0 dan katta bo'lishi kerak"
                hasError = true
              }
              if (!dateOnly) {
                errors.loggedAt = "Sanani tanlang"
                hasError = true
              }

              if (hasError) {
                setFieldErrors(errors)
                setIsSubmitting(false)
                return
              }

              const loggedAt = new Date(dateOnly).toISOString()

              const payload: ProductFlowCreateRequest = {
                product,
                direction: "Kirim",
                quantity: quantityValue,
                unit: "m3",
                amount: amountValue,
                loggedAt,
              }

              const response = await post<ProductFlow | { flow?: ProductFlow }, ProductFlowCreateRequest>(
                "/inventory/flows",
                payload,
              )
              const created = ((response as any).flow ?? response) as ProductFlow

              try {
                const allResponse = await get<ProductFlow[] | { items?: ProductFlow[] }>("/inventory/flows")
                const items = Array.isArray(allResponse) ? allResponse : allResponse.items ?? []
                setFlows(items)
              } catch {
                setFlows((prev) => [...prev, created])
              }

              setFieldErrors({
                product: "",
                quantity: "",
                amount: "",
                loggedAt: "",
              })
              setSubmitError(null)
              setIsAddFlowOpen(false)
              setNewFlow({
                product: "M400",
                quantity: "",
                amount: "",
                loggedAt: new Date().toISOString().split("T")[0],
              })
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage =
                  (err.data && (err.data as any).message) ||
                  err.message ||
                  "Yangi mahsulot harakatini saqlashda xatolik yuz berdi"
                setSubmitError(backendMessage)
                toast({
                  title: "Xatolik",
                  description: backendMessage,
                })
              } else {
                const fallbackMessage =
                  "Yangi mahsulot harakatini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
                setSubmitError(fallbackMessage)
                toast({
                  title: "Xatolik",
                  description: fallbackMessage,
                })
              }
            } finally {
              setIsSubmitting(false)
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Mahsulot</label>
            <input
              type="text"
              value={newFlow.product}
              onChange={(e) => setNewFlow((prev) => ({ ...prev, product: e.target.value }))}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.product ? "border-red-500 focus:ring-red-500" : "border-[#E2E8F0] focus:ring-[#2563EB]"
              }`}
              placeholder="Mahsulot nomi"
              required
            />
            {fieldErrors.product && <p className="mt-1 text-xs text-red-600">{fieldErrors.product}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Hajm (m³)</label>
              <input
                type="number"
                value={newFlow.quantity}
                onChange={(e) => setNewFlow((prev) => ({ ...prev, quantity: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  fieldErrors.quantity ? "border-red-500 focus:ring-red-500" : "border-[#E2E8F0] focus:ring-[#2563EB]"
                }`}
                placeholder="0"
                min="0.001"
                step="0.001"
                required
              />
              {fieldErrors.quantity && <p className="mt-1 text-xs text-red-600">{fieldErrors.quantity}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Summa (so'm)</label>
              <input
                type="number"
                value={newFlow.amount}
                onChange={(e) => setNewFlow((prev) => ({ ...prev, amount: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  fieldErrors.amount ? "border-red-500 focus:ring-red-500" : "border-[#E2E8F0] focus:ring-[#2563EB]"
                }`}
                placeholder="0"
                required
              />
              {fieldErrors.amount && <p className="mt-1 text-xs text-red-600">{fieldErrors.amount}</p>}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Sana</label>
            <input
              type="date"
              value={newFlow.loggedAt}
              onChange={(e) => setNewFlow((prev) => ({ ...prev, loggedAt: e.target.value }))}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                fieldErrors.loggedAt ? "border-red-500 focus:ring-red-500" : "border-[#E2E8F0] focus:ring-[#2563EB]"
              }`}
              required
            />
            {fieldErrors.loggedAt && <p className="mt-1 text-xs text-red-600">{fieldErrors.loggedAt}</p>}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold"
              disabled={isSubmitting}
            >
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddFlowOpen(false)
                setNewFlow({
                  product: "",
                  quantity: "",
                  amount: "",
                  loggedAt: new Date().toISOString().split("T")[0],
                })
                setFieldErrors({
                  product: "",
                  quantity: "",
                  amount: "",
                  loggedAt: "",
                })
                setSubmitError(null)
                setIsSubmitting(false)
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
          </div>
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        </form>
      </Modal>
    </div>
  )
}

