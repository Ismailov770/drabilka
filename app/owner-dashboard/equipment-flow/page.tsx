"use client"

import { useEffect, useMemo, useState } from "react"

import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { FileDropzone } from "@/components/file-dropzone"
import { SelectField } from "@/components/select-field"
import { API_BASE_URL, ApiError, get, post } from "@/styles/lib/api"

type EquipmentMovement = {
  id: string
  equipment: string
  category: string
  movement: "Kirim" | "Chiqim" | string
  reason: string
  cost: number
  photoUrl?: string
  photoUrls?: string[]
  loggedAt: string
}

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

  if (!url.includes("/")) {
    const encoded = encodeURIComponent(url)
    return `${origin}/files/${encoded}`
  }

  if (url.startsWith("/")) {
    return `${origin}${url}`
  }

  return `${origin}/${url}`
}

type Equipment = {
  id: string
  name: string
}

type EquipmentMovementCreateRequest = {
  equipmentId?: number
  equipmentName: string
  category: string
  movement: string
  reason: string
  cost: number
  photoUrl?: string | null
  photoUrls?: string[] | null
  loggedAt: string
}

function normalizeMovement(raw: any): EquipmentMovement {
  const equipment = (raw && (raw.equipmentName ?? raw.equipment)) || ""

  const rawPhotoArray: string[] | undefined = Array.isArray(raw?.photoUrls)
    ? (raw.photoUrls as any[]).map((p) => String(p))
    : undefined

  const fullPhotoArray: string[] | undefined = rawPhotoArray
    ? rawPhotoArray.map((p) => toFullFileUrl(p) ?? p)
    : undefined

  const rawSinglePhoto =
    (raw && (raw.photo as string | undefined)) ?? (raw && (raw.photoUrl as string | undefined)) ?? undefined

  const fullSingle = rawSinglePhoto ? toFullFileUrl(rawSinglePhoto) ?? rawSinglePhoto : undefined

  const fullPhoto = fullSingle ?? (fullPhotoArray && fullPhotoArray.length > 0 ? fullPhotoArray[0] : undefined)

  return {
    id: String(raw?.id ?? ""),
    equipment,
    category: raw?.category ?? "",
    movement: raw?.movement ?? "",
    reason: raw?.reason ?? "",
    cost: Number(raw?.cost) || 0,
    photoUrl: fullPhoto,
    photoUrls: fullPhotoArray,
    loggedAt: raw?.loggedAt ?? "",
  }
}

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "equipment", label: "Texnika", sortable: true },
  { key: "category", label: "Kategoriya", sortable: true },
  { key: "movement", label: "Yo'nalish", sortable: true },
  { key: "reason", label: "Sabab", sortable: false },
  { key: "cost", label: "Summa (so'm)", sortable: true },
  { key: "photo", label: "Foto", sortable: false },
  { key: "loggedAt", label: "Sana", sortable: true },
]

const sumFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 })

const today = new Date()
const currentYear = today.getFullYear()
const defaultDateFrom = ""
const defaultDateTo = ""

function getTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function OwnerEquipmentFlowPage() {
  const [filters, setFilters] = useState({
    dateFrom: defaultDateFrom,
    dateTo: defaultDateTo,
  })
  const [isAddMovementOpen, setIsAddMovementOpen] = useState(false)
  const [newMovement, setNewMovement] = useState({
    equipment: "",
    category: "Asosiy texnika",
    movement: "Kirim",
    reason: "",
    cost: "",
    photo: "",
    loggedAt: getTodayDateString(),
  })
  const [records, setRecords] = useState<EquipmentMovement[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoNames, setPhotoNames] = useState<string[]>([])
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoPreview, setPhotoPreview] = useState<{ urls: string[]; index: number; title: string } | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchMovements = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await get<any[] | { items?: any[] }>("/equipment/movements")

        if (cancelled) return

        const rawItems = Array.isArray(response) ? response : response.items ?? []
        const items = rawItems.map((item) => normalizeMovement(item))
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
        .filter((record) => withinRange(record.loggedAt))
        .map((record) => ({
          ...record,
          photo: record.photoUrl,
        })),
    [records, filters.dateFrom, filters.dateTo],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Texnika</h1>
        <p className="text-[#64748B] mt-1">Texnika va uskunalar bo'yicha kirim-chiqim hodisalari jurnali</p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              setFilters({
                dateFrom: "",
                dateTo: "",
              })
            }
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] hover:bg-[#F1F5F9] mt-2"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0F172A]">Texnika yoqilg'i harakati jurnali</h2>
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
              const value = Number(row.cost) || 0
              return `${sumFormatter.format(value)} so'm`
            }
            if (col.key === "photo") {
              const urls: string[] = Array.isArray(row.photoUrls) && row.photoUrls.length > 0
                ? row.photoUrls
                : row.photo
                  ? [row.photo]
                  : []

              if (!urls.length) {
                return <span className="text-sm text-[#94A3B8]">Rasm yo'q</span>
              }

              const countExtra = urls.length - 1

              return (
                <button
                  type="button"
                  onClick={() =>
                    setPhotoPreview({
                      urls,
                      index: 0,
                      title: row.equipment || "Texnika surati",
                    })
                  }
                  className="relative inline-block focus:outline-none"
                >
                  <img
                    src={urls[0]}
                    alt={row.equipment}
                    className="w-16 h-16 object-cover rounded-lg border border-[#E2E8F0]"
                  />
                  {countExtra > 0 && (
                    <div className="absolute bottom-0 right-0 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white">
                      +{countExtra}
                    </div>
                  )}
                </button>
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
            loggedAt: getTodayDateString(),
          })
          setSubmitError(null)
          setIsSubmitting(false)
          setPhotoNames([])
          setPhotoPreviewUrls([])
          setPhotoFiles([])
        }}
        size="lg"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setSubmitError(null)

            try {
              const loggedAtDate = newMovement.loggedAt
              const loggedAtIso =
                loggedAtDate && loggedAtDate.length === 10
                  ? `${loggedAtDate}T00:00:00`
                  : loggedAtDate || new Date().toISOString().slice(0, 19)

              let photoUrl: string | null = null
              let photoUrls: string[] | null = null

              if (photoFiles.length > 0) {
                const formData = new FormData()
                photoFiles.forEach((file) => {
                  formData.append("files", file)
                })

                const uploadResponse = await post<{ urls: string[] }, FormData>("/uploads/images", formData, {
                  params: { category: "EQUIPMENT" },
                })

                const urls = uploadResponse.urls ?? []
                if (urls.length > 0) {
                  photoUrls = urls
                  photoUrl = urls[0]
                }
              }

              const payload: EquipmentMovementCreateRequest = {
                equipmentName: newMovement.equipment,
                category: newMovement.category,
                movement: newMovement.movement,
                reason: newMovement.reason,
                cost: Number(newMovement.cost) || 0,
                photoUrl,
                photoUrls,
                loggedAt: loggedAtIso,
              }

              const response = await post<any | { movement?: any }, EquipmentMovementCreateRequest>(
                "/equipment/movements",
                payload,
              )
              const createdRaw = (response as any).movement ?? response
              const created = normalizeMovement(createdRaw)

              try {
                const allResponse = await get<any[] | { items?: any[] }>("/equipment/movements")
                const rawItems = Array.isArray(allResponse) ? allResponse : allResponse.items ?? []
                const items = rawItems.map((item) => normalizeMovement(item))
                setRecords(items)
              } catch {
                // Если рефетч не удался, хотя бы добавим локально созданную запись
                setRecords((prev) => [...prev, created])
              }

              setIsAddMovementOpen(false)
              setNewMovement({
                equipment: "",
                category: "Asosiy texnika",
                movement: "Kirim",
                reason: "",
                cost: "",
                photo: "",
                loggedAt: getTodayDateString(),
              })
              setPhotoNames([])
              setPhotoPreviewUrls([])
              setPhotoFiles([])
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
              placeholder="Masalan: DAF CF, Ekskavator va hokazo"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Kategoriya</label>
              <SelectField
                value={newMovement.category}
                onChange={(category) => setNewMovement((prev) => ({ ...prev, category }))}
                options={[
                  { value: "Asosiy texnika", label: "Asosiy texnika" },
                  { value: "Yordamchi texnika", label: "Yordamchi texnika" },
                  { value: "Energiya bloki", label: "Energiya bloki" },
                ]}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Yo'nalish</label>
              <SelectField
                value={newMovement.movement}
                onChange={(movement) => setNewMovement((prev) => ({ ...prev, movement }))}
                options={[
                  { value: "Kirim", label: "Kirim" },
                  { value: "Chiqim", label: "Chiqim" },
                ]}
              />
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
              <label className="text-sm font-semibold text-[#0F172A] mb-2 block">Summa</label>
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
              <FileDropzone
                label="Surat"
                accept="image/*"
                multiple
                valueText={photoNames.length ? `${photoNames.length} ta rasm tanlandi` : ""}
                onFilesSelected={(files) => {
                  if (!files || files.length === 0) {
                    setPhotoNames([])
                    setPhotoPreviewUrls([])
                    setPhotoFiles([])
                    return
                  }

                  const fileArray = Array.from(files)
                  if (fileArray.length > 10) {
                    alert("Maksimal 10 ta rasm yuklash mumkin")
                  }

                  const limited = fileArray.slice(0, 10)
                  setPhotoNames(limited.map((file) => file.name))
                  setPhotoPreviewUrls(limited.map((file) => URL.createObjectURL(file)))
                  setPhotoFiles(limited)
                }}
              />
              {photoPreviewUrls.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-[#64748B] mb-1">Tanlangan rasmlar preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {photoPreviewUrls.slice(0, 4).map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={newMovement.equipment || "Yuklangan rasm"}
                        className="w-24 h-24 object-cover rounded-lg border border-[#E2E8F0]"
                      />
                    ))}
                  </div>
                  {photoPreviewUrls.length > 4 && (
                    <p className="text-xs text-[#64748B] mt-1">
                      Yana {photoPreviewUrls.length - 4} ta rasm yuklangan
                    </p>
                  )}
                </div>
              )}
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
                setPhotoNames([])
                setPhotoPreviewUrls([])
                setPhotoFiles([])
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-[#0F172A] rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Bekor qilish
            </button>
          </div>
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
        </form>
      </Modal>
      <Modal
        isOpen={!!photoPreview}
        title={photoPreview?.title ?? "Rasmlar"}
        onClose={() => setPhotoPreview(null)}
        size="lg"
      >
        {photoPreview && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={photoPreview.urls[photoPreview.index]}
                alt={photoPreview.title}
                className="max-h-[70vh] w-auto rounded-xl border border-[#E2E8F0]"
              />
            </div>
            {photoPreview.urls.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2">
                {photoPreview.urls.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setPhotoPreview((prev) =>
                        prev ? { ...prev, index } : null,
                      )
                    }
                    className={`border rounded-md overflow-hidden ${
                      index === photoPreview.index
                        ? "border-[#2563EB]"
                        : "border-[#E2E8F0] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img src={url} alt="preview" className="w-16 h-16 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

