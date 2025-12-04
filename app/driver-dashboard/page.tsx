"use client"

import { Button } from "@/components/button"
import { useState } from "react"

export default function DriverDashboard() {
  const [fuelAmount, setFuelAmount] = useState("")
  const [fuelGaugePhotoName, setFuelGaugePhotoName] = useState("")
  const [distance, setDistance] = useState("")
  const [speedometerPhotoName, setSpeedometerPhotoName] = useState("")

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
          onSubmit={(e) => {
            e.preventDefault()
            if (!fuelAmount || !distance || !fuelGaugePhotoName || !speedometerPhotoName) {
              alert("Iltimos, summa, yurgan masofa, yoqilg'i datchigi va speedometr suratlarini kiriting")
              return
            }
            alert(
              `Yangi yoqilg'i hodisasi: ${fuelAmount} so'm, masofa: ${distance} km, yoqilg'i datchigi: ${fuelGaugePhotoName}, speedometr: ${speedometerPhotoName}`,
            )
            setFuelAmount("")
            setDistance("")
            setFuelGaugePhotoName("")
            setSpeedometerPhotoName("")
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
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Yoqilg'i datchigi surati</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setFuelGaugePhotoName(file ? file.name : "")
              }}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
            {fuelGaugePhotoName && (
              <p className="text-xs text-[#64748B] mt-1">Tanlangan fayl: {fuelGaugePhotoName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Speedometr surati</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setSpeedometerPhotoName(file ? file.name : "")
              }}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
            {speedometerPhotoName && (
              <p className="text-xs text-[#64748B] mt-1">Tanlangan fayl: {speedometerPhotoName}</p>
            )}
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Yoqilg'ini yuborish
          </Button>
        </form>
      </div>
    </div>
  )
}
