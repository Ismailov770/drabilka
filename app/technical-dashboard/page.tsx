"use client"

import { Button } from "@/components/button"
import { useState } from "react"

export default function TechnicalDashboard() {
  const [equipmentName, setEquipmentName] = useState("")
  const [issueDescription, setIssueDescription] = useState("")
  const [cost, setCost] = useState("")
  const [photoName, setPhotoName] = useState("")

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
          onSubmit={(e) => {
            e.preventDefault()
            if (!equipmentName || !issueDescription || !cost || !photoName) {
              alert("Iltimos, barcha maydonlarni to'ldiring va rasm yuklang")
              return
            }
            alert(
              `Yangi texnik yozuv: ${equipmentName}, ish/masala: ${issueDescription}, summa: ${cost} so'm, fayl: ${photoName}`,
            )
            setEquipmentName("")
            setIssueDescription("")
            setCost("")
            setPhotoName("")
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
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Foto / chek / hujjat surati</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                setPhotoName(file ? file.name : "")
              }}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
            {photoName && <p className="text-xs text-[#64748B] mt-1">Tanlangan fayl: {photoName}</p>}
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Ma'lumotni yuborish
          </Button>
        </form>
      </div>
    </div>
  )
}
