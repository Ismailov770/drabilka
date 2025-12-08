"use client"

import { Button } from "@/components/button"
import { FileDropzone } from "@/components/file-dropzone"
import { ApiError, post } from "@/styles/lib/api"
import { useState } from "react"

type EquipmentMovementCreateRequest = {
  equipmentId?: number
  equipmentName: string
  category: string
  movement: string
  reason: string
  cost: number
  photoUrls?: string[] | null
  loggedAt: string
}

export default function TechnicalDashboard() {
  const [equipmentName, setEquipmentName] = useState("")
  const [issueDescription, setIssueDescription] = useState("")
  const [cost, setCost] = useState("")
  const [photoNames, setPhotoNames] = useState<string[]>([])
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  return (
    <div className="space-y-8 max-w-xl w-full">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Texnik ma'lumot kiritish</h1>
        <p className="text-[#64748B] mt-1">Texnik nosozlik yoki xizmat bo'yicha ma'lumotlarni shu yerda kiriting</p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Yangi texnik hodisa / ish</h2>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()

            if (!equipmentName || !issueDescription || !cost || photoFiles.length === 0) {
              alert("Iltimos, barcha maydonlarni to'ldiring va rasm yuklang")
              return
            }

            setIsSubmitting(true)
            setSubmitError(null)

            try {
              const now = new Date()
              const year = now.getFullYear()
              const month = String(now.getMonth() + 1).padStart(2, "0")
              const day = String(now.getDate()).padStart(2, "0")
              const hours = String(now.getHours()).padStart(2, "0")
              const minutes = String(now.getMinutes()).padStart(2, "0")
              const seconds = String(now.getSeconds()).padStart(2, "0")
              const loggedAtIso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

              let photoUrls: string[] | null = null

              if (photoFiles.length > 0) {
                const formData = new FormData()
                photoFiles.forEach((file) => {
                  formData.append("files", file)
                })

                const uploadResponse = await post<{ urls: string[] }, FormData>("/uploads/images", formData, {
                  params: { category: "TECHNICAL" },
                })

                const urls = uploadResponse.urls ?? []
                if (urls.length > 0) {
                  photoUrls = urls
                }
              }

              const payload: EquipmentMovementCreateRequest = {
                // Для TECHNICAL мы не привязываем к справочнику, поэтому equipmentId не отправляем
                equipmentName,
                category: "Asosiy texnika",
                movement: "Chiqim",
                reason: issueDescription,
                cost: Number(cost) || 0,
                photoUrls,
                loggedAt: loggedAtIso,
              }

              await post("/equipment/movements", payload)

              alert("Ma'lumot muvaffaqiyatli yuborildi")

              setEquipmentName("")
              setIssueDescription("")
              setCost("")
              setPhotoNames([])
              setPhotoPreviewUrls([])
              setPhotoFiles([])
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage =
                  (err.data && (err.data as any).message) ||
                  err.message ||
                  "Ma'lumotni yuborishda xatolik yuz berdi"
                setSubmitError(backendMessage)
                alert(backendMessage)
              } else {
                const fallback = "Ma'lumotni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
                setSubmitError(fallback)
                alert(fallback)
              }
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Texnika / uskuna nomi</label>
            <input
              type="text"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
              placeholder="Masalan: Kiln Furnace, Conveyor Belt"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Nosozlik / ish tavsifi</label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Qanday ish bajarildi yoki qanaqa nosozlik kuzatildi?"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Sarflangan summa (so'm)</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <FileDropzone
              label="Foto / chek / hujjat surati"
              accept="image/*"
              multiple
              required
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
                      alt={equipmentName || "Yuklangan rasm"}
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
          {submitError && <p className="text-sm text-red-600">{submitError}</p>}
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Yuborilmoqda..." : "Ma'lumotni yuborish"}
          </Button>
        </form>
      </div>
    </div>
  )
}
