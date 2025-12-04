"use client"

import { useState } from "react"
import { Button } from "@/components/button"

export default function TimelineViewPage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [selectedDriver, setSelectedDriver] = useState("all")

  const incidents = [
    { id: 1, time: "09:30", title: "Yo'l tirbandligi", location: "Asosiy trassa", driver: "Ahmed K." },
    { id: 2, time: "11:15", title: "Texnik ko'rik", location: "Depo", driver: "Karim S." },
    { id: 3, time: "14:20", title: "Yuk yetkazib berish", location: "Mijoz maydoni", driver: "Ahmed K." },
    { id: 4, time: "16:45", title: "Yonilg'i olish", location: "Yoqlig'i shaxobchasi", driver: "Omar R." },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Vaqt chizig'i</h1>
        <p className="text-[#64748B] mt-1">Barcha hodisalar va voqealarning vaqt bo'yicha ko'rinishi</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Sana bo'yicha filtr</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Haydovchi bo'yicha filtr</label>
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            >
              <option value="all">Barcha haydovchilar</option>
              <option value="ahmed">Ahmed K.</option>
              <option value="karim">Karim S.</option>
              <option value="omar">Omar R.</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              Filtrlarni qo'llash
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Hodisalar vaqti</h2>
        <div className="space-y-4">
          {incidents.map((event, idx) => (
            <div key={event.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#2563EB] border-4 border-[#F8FAFC]"></div>
                {idx !== incidents.length - 1 && <div className="w-0.5 h-16 bg-[#E2E8F0] mt-2"></div>}
              </div>
              {/* Event Content */}
              <div className="flex-1 pb-4">
                <div className="bg-[#F8FAFC] rounded-lg p-4 border-l-4 border-[#2563EB]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#0F172A]">{event.title}</h3>
                      <p className="text-sm text-[#64748B] mt-1">{event.location}</p>
                      <p className="text-xs text-[#94A3B8] mt-2">Haydovchi: {event.driver}</p>
                    </div>
                    <span className="text-sm font-medium text-[#2563EB]">{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Type Legend */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Hodisa turi bo'yicha filtr</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Barcha hodisalar", "Hodisalar", "Yetkazib berishlar", "Texnik xizmat"].map((type) => (
            <Button key={type} variant="outline" size="md" className="w-full bg-transparent">
              {type}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
