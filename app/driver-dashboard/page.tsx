"use client"

import { Button } from "@/components/button"
import { FileDropzone } from "@/components/file-dropzone"
import { ApiError, post } from "@/styles/lib/api"
import { useEffect, useState } from "react"

export default function DriverDashboard() {
  const [fuelAmount, setFuelAmount] = useState("")
  const [fuelGaugePhotoName, setFuelGaugePhotoName] = useState("")
  const [distance, setDistance] = useState("")
  const [speedometerPhotoName, setSpeedometerPhotoName] = useState("")
  const [fuelGaugeFile, setFuelGaugeFile] = useState<File | null>(null)
  const [speedometerFile, setSpeedometerFile] = useState<File | null>(null)
  const [fuelGaugePreviewUrl, setFuelGaugePreviewUrl] = useState<string | null>(null)
  const [speedometerPreviewUrl, setSpeedometerPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!fuelGaugeFile) {
      setFuelGaugePreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(fuelGaugeFile)
    setFuelGaugePreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [fuelGaugeFile])

  useEffect(() => {
    if (!speedometerFile) {
      setSpeedometerPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(speedometerFile)
    setSpeedometerPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [speedometerFile])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Yoqilg'i kiritish</h1>
        <p className="text-[#64748B] mt-1">Har safar yoqilg'i quyganda summani va chek suratini kiriting</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 card-shadow max-w-xl">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Yangi yoqilg'i hodisasi</h2>
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)

            if (!fuelAmount || !distance || !fuelGaugeFile || !speedometerFile) {
              alert("Iltimos, summa, yurgan masofa, yoqilg'i datchigi va speedometr suratlarini kiriting")
              return
            }

            try {
              setIsSubmitting(true)

              const formData = new FormData()
              formData.append("files", fuelGaugeFile)
              formData.append("files", speedometerFile)

              const uploadResponse = await post<{ urls: string[] }>("/uploads/images", formData, {
                params: { category: "FUEL" },
              })

              const urls = uploadResponse.urls ?? []
              const fuelGaugeUrl = urls[0]
              const speedometerUrl = urls[1]

              await post("/driver/fuel-records", {
                amount: Number(fuelAmount) || 0,
                distanceKm: Number(distance) || 0,
                dateTime: new Date().toISOString(),
                fuelGaugePhotoName: fuelGaugeUrl,
                speedometerPhotoName: speedometerUrl,
              })

              alert("Yangi yoqilg'i hodisasi saqlandi")

              setFuelAmount("")
              setDistance("")
              setFuelGaugePhotoName("")
              setSpeedometerPhotoName("")
              setFuelGaugeFile(null)
              setSpeedometerFile(null)
            } catch (err: any) {
              if (err instanceof ApiError) {
                const backendMessage = (err.data && (err.data as any).message) || err.message || "Yoqilg'i hodisasini saqlashda xatolik yuz berdi"
                setError(backendMessage)
              } else {
                setError("Yoqilg'i hodisasini saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
              }
            } finally {
              setIsSubmitting(false)
            }
          }}
        >
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Yoqilg'i summasi (so'm)</label>
            <input
              type="number"
              value={fuelAmount}
              onChange={(e) => setFuelAmount(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Yurgan masofa (km)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <FileDropzone
              label="Yoqilg'i datchigi surati"
              accept="image/*"
              required
              valueText={fuelGaugePhotoName}
              onFilesSelected={(files) => {
                const file = files?.[0]
                setFuelGaugeFile(file ?? null)
                setFuelGaugePhotoName(file ? file.name : "")
              }}
            />
            {fuelGaugePreviewUrl && (
              <div className="mt-2 flex justify-start">
                <img
                  src={fuelGaugePreviewUrl}
                  alt="Yoqilg'i datchigi surati"
                  className="w-40 h-40 object-cover rounded-lg border border-[#E2E8F0]"
                />
              </div>
            )}
          </div>
          <div>
            <FileDropzone
              label="Speedometr surati"
              accept="image/*"
              required
              valueText={speedometerPhotoName}
              onFilesSelected={(files) => {
                const file = files?.[0]
                setSpeedometerFile(file ?? null)
                setSpeedometerPhotoName(file ? file.name : "")
              }}
            />
            {speedometerPreviewUrl && (
              <div className="mt-2 flex justify-start">
                <img
                  src={speedometerPreviewUrl}
                  alt="Speedometr surati"
                  className="w-40 h-40 object-cover rounded-lg border border-[#E2E8F0]"
                />
              </div>
            )}
          </div>
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
            Yoqilg'ini yuborish
          </Button>
        </form>
      </div>
    </div>
  )
}
