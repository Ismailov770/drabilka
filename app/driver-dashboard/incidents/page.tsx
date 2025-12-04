"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { useState } from "react"

export default function IncidentLogPage() {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState<any>(null)
  const [incidents] = useState([
    {
      id: "INC001",
      name: "Yo'l tirbandligi",
      location: "Asosiy trassa",
      date: "2024-01-15",
      time: "09:30 AM",
      driver: "Ahmed K.",
      status: "Yechilgan",
    },
    {
      id: "INC002",
      name: "Mashina nosozligi",
      location: "5-marshrut",
      date: "2024-01-14",
      time: "14:15 PM",
      driver: "Karim S.",
      status: "Kutilmoqda",
    },
    {
      id: "INC003",
      name: "Yengil YTH",
      location: "A chorraha",
      date: "2024-01-13",
      time: "11:45 AM",
      driver: "Omar R.",
      status: "Yechilgan",
    },
    {
      id: "INC004",
      name: "G'ildirak shikasti",
      location: "Trassa chiqishi 3",
      date: "2024-01-12",
      time: "16:20 PM",
      driver: "Ahmed K.",
      status: "Yechilgan",
    },
  ])

  const columns = [
    { key: "id", label: "Hodisa ID", sortable: true },
    { key: "name", label: "Hodisa nomi", sortable: true },
    { key: "location", label: "Joylashuv", sortable: true },
    { key: "driver", label: "Haydovchi", sortable: true },
    { key: "date", label: "Sana", sortable: true },
    { key: "status", label: "Holati", sortable: true },
  ]

  const handleViewDetails = (incident: any) => {
    setSelectedIncident(incident)
    setShowDetails(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Hodisalar jurnali</h1>
        <p className="text-[#64748B] mt-1">Xabar qilingan barcha hodisalarni ko'rish va boshqarish</p>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <DataTable
          columns={columns}
          data={incidents}
          searchableFields={["name", "location", "driver"]}
          actions={(row) => (
            <Button variant="outline" size="sm" onClick={() => handleViewDetails(row)}>
              Batafsil ko'rish
            </Button>
          )}
        />
      </div>

      <Modal isOpen={showDetails} title="Hodisa tafsilotlari" onClose={() => setShowDetails(false)} size="lg">
        {selectedIncident && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#0F172A]">Hodisa: {selectedIncident.name}</h3>
              <p className="text-[#64748B] mt-1">{selectedIncident.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#64748B]">Haydovchi</p>
                <p className="font-medium text-[#0F172A]">{selectedIncident.driver}</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Sana va vaqt</p>
                <p className="font-medium text-[#0F172A]">
                  {selectedIncident.date} {selectedIncident.time}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#64748B]">Holati</p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium inline-block mt-1 ${
                  selectedIncident.status === "Yechilgan" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEF3C7] text-[#92400E]"
                }`}
              >
                {selectedIncident.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-[#64748B]">Tavsif</p>
              <p className="text-[#0F172A] mt-2">
                Hodisa tafsilotlari to'liq matn va hujjatlar bilan shu yerda aks etadi.
              </p>
            </div>
            <div>
              <p className="text-sm text-[#64748B] mb-2">Rasmlar</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#E2E8F0] h-32 rounded-lg flex items-center justify-center">📷 Rasm 1</div>
                <div className="bg-[#E2E8F0] h-32 rounded-lg flex items-center justify-center">📷 Rasm 2</div>
              </div>
            </div>
            <Button type="button" variant="primary" className="w-full">
              Izoh qo'shish
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
