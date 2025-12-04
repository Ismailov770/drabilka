"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { ApiError, get, post } from "@/styles/lib/api"

type EquipmentMovement = {
  id: string
  equipment: string
  category: string
  movement: "Kirim" | "Chiqim" | string
  reason: string
  cost: number
  photoUrl?: string
  loggedAt: string
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "equipment", label: "Texnika", sortable: true },
  { key: "category", label: "Kategoriya", sortable: true },
  { key: "movement", label: "Yo'nalish", sortable: true },
  { key: "reason", label: "Sabab", sortable: false },
  { key: "cost", label: "Rasxod ($)", sortable: true },
  { key: "photo", label: "Foto", sortable: false },
  { key: "loggedAt", label: "Sana", sortable: true },
]

const currencyFormatter = new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 })

export default function OwnerEquipmentFlowPage() {
  const [filters, setFilters] = useState({
    dateFrom: "2024-02-15",
    dateTo: "2024-02-19",
    category: "all",
    movement: "all",
  })
  const [isAddMovementOpen, setIsAddMovementOpen] = useState(false)
  const [newMovement, setNewMovement] = useState({
    equipment: "",
    category: "Asosiy texnika",
    movement: "Kirim",
    reason: "",
    cost: "",
    photo: "",
    loggedAt: new Date().toISOString().split("T")[0],
  })
  const [records, setRecords] = useState<EquipmentMovement[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchMovements = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<EquipmentMovement[] | { items?: EquipmentMovement[] }>("/equipment/movements")

        if (cancelled) return

        const items = Array.isArray(response) ? response : response.items ?? []
        setRecords(items)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Texnika harakatlarini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("Texnika harakatlarini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchMovements()

    return () => {
      cancelled = true
    }
  }, [])

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
          const matchesCategory = filters.category === "all" || record.category === filters.category
          const matchesMovement = filters.movement === "all" || record.movement === filters.movement
          return matchesCategory && matchesMovement && withinRange(record.loggedAt)
        })
        .map((record) => ({
          ...record,
          photo: (record as any).photo ?? (record as any).photoUrl ?? undefined,
        })),
    [records, filters.category, filters.movement, filters.dateFrom, filters.dateTo],
  )

  const stats = filteredRecords.reduce(
    (acc, record) => {
      if (record.movement === "Kirim") acc.inbound += 1
      if (record.movement === "Chiqim") acc.outbound += 1
      return acc
    },
    { inbound: 0, outbound: 0 },
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Yoqilg'i sarfi</h1>
        <p className="text-[#64748B] mt-1">Haydovchilar tomonidan kiritilgan yoqilg'i hodisalari va ularning sarfi</p>
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
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Kategoriya</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="all">Barchasi</option>
              <option value="Asosiy texnika">Asosiy texnika</option>
              <option value="Yordamchi texnika">Yordamchi texnika</option>
              <option value="Energiya bloki">Energiya bloki</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Yo'nalish</label>
            <select
              value={filters.movement}
              onChange={(e) => setFilters((prev) => ({ ...prev, movement: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="all">Barchasi</option>
              <option value="Kirim">Kirim</option>
              <option value="Chiqim">Chiqim</option>
            </select>
          </div>
        </div>
      </div>

  

      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">Yoqilg'i sarfi jurnali</h2>
          <button
            onClick={() => setIsAddMovementOpen(true)}
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
          searchableFields={["id", "equipment", "category", "movement", "reason"]}
          renderCell={(row, col) => {
            if (col.key === "cost") {
              return currencyFormatter.format(row.cost || 0)
            }
            if (col.key === "photo") {
              return row.photo ? (
                <img src={row.photo} alt={row.equipment} className="w-16 h-16 object-cover rounded-lg border border-[#E2E8F0]" />
              ) : (
                <span className="text-sm text-[#94A3B8]">Rasm yo'q</span>
              )
            }
            return row[col.key]
          }}
          footerTotals={filteredRecords.reduce(
            (acc, record) => {
              acc.cost += record.cost || 0
              acc.count += 1
              return acc
            },
            { cost: 0, count: 0 },
          )}
        />
      </div>

      <Modal
        isOpen={isAddMovementOpen}
        title="Yangi yoqilg'i yozuvi"
        onClose={() => {
          setIsAddMovementOpen(false)
          setNewMovement({
            equipment: "",
            category: "Asosiy texnika",
            movement: "Kirim",
            reason: "",
            cost: "",
            photo: "",
            loggedAt: new Date().toISOString().split("T")[0],
          })
          setSubmitError(null)
          setIsSubmitting(false)
        }}
        size="lg"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            // TODO: add to data source
            setIsSubmitting(true)
            setSubmitError(null)

            try {
              const payload = {
                equipment: newMovement.equipment,
                category: newMovement.category,
                movement: newMovement.movement,
                reason: newMovement.reason,
                cost: Number(newMovement.cost) || 0,
                photoUrl: newMovement.photo || undefined,
                loggedAt: newMovement.loggedAt,
              }

              const response = await post<EquipmentMovement | { movement?: EquipmentMovement }>(
                "/equipment/movements",
                payload,
              )
              const created = (response as any).movement ?? response

              setRecords((prev) => [...prev, created as EquipmentMovement])

              setIsAddMovementOpen(false)
              setNewMovement({
                equipment: "",
                category: "Asosiy texnika",
                movement: "Kirim",
                reason: "",
                cost: "",
                photo: "",
                loggedAt: new Date().toISOString().split("T")[0],
              })
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage =
                  (err.data && (err.data as any).message) ||
                  err.message ||
                  "Yangi texnika harakatini saqlashda xatolik yuz berdi"
                setSubmitError(backendMessage)
              } else {
                setSubmitError(
                  "Yangi texnika harakatini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
                )
              }
            } finally {
              setIsSubmitting(false)
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Avtomobil / texnika</label>
            <input
              type="text"
              value={newMovement.equipment}
              onChange={(e) => setNewMovement((prev) => ({ ...prev, equipment: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Masalan: Press A"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Kategoriya</label>
              <select
                value={newMovement.category}
                onChange={(e) => setNewMovement((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Asosiy texnika">Asosiy texnika</option>
                <option value="Yordamchi texnika">Yordamchi texnika</option>
                <option value="Energiya bloki">Energiya bloki</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Yo'nalish</label>
              <select
                value={newMovement.movement}
                onChange={(e) => setNewMovement((prev) => ({ ...prev, movement: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="Kirim">Kirim</option>
                <option value="Chiqim">Chiqim</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Izoh</label>
            <textarea
              value={newMovement.reason}
              onChange={(e) => setNewMovement((prev) => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              rows={3}
              placeholder="Masalan: 50 litr dizel, to'liq bak va hokazo"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Yoqilg'i summasi (som)</label>
              <input
                type="number"
                value={newMovement.cost}
                onChange={(e) => setNewMovement((prev) => ({ ...prev, cost: e.target.value }))}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Surat</label>
              <input
                type="file"
                value={newMovement.photo}
                onChange={(e) => setNewMovement((prev) => ({ ...prev, photo: e.target.value }))}
                accept=".png"
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                placeholder="PNG/JPG"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Sana</label>
            <input
              type="date"
              value={newMovement.loggedAt}
              onChange={(e) => setNewMovement((prev) => ({ ...prev, loggedAt: e.target.value }))}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors font-semibold">
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddMovementOpen(false)
                setNewMovement({
                  equipment: "",
                  category: "Asosiy texnika",
                  movement: "Kirim",
                  reason: "",
                  cost: "",
                  photo: "",
                  loggedAt: new Date().toISOString().split("T")[0],
                })
                setSubmitError(null)
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

