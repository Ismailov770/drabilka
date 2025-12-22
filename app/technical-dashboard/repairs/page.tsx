"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { FileDropzone } from "@/components/file-dropzone"
import { SelectField } from "@/components/select-field"
import { useState } from "react"

function getTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function RepairsPage() {
  const [showAddRepair, setShowAddRepair] = useState(false)
  const [photosText, setPhotosText] = useState("")
  const [repairs] = useState([
    {
      id: "R001",
      equipment: "Konveyer tasmasi",
      issue: "Tasma siljishi",
      date: "2024-01-14",
      cost: 2500,
      tech: "Ahmed M.",
      status: "Bajarildi",
    },
    {
      id: "R002",
      equipment: "Pech",
      issue: "Harorat sensori almashtirildi",
      date: "2024-01-12",
      cost: 3200,
      tech: "Karim S.",
      status: "Bajarildi",
    },
    {
      id: "R003",
      equipment: "Tegirmon",
      issue: "Podshipniklarga xizmat ko'rsatish",
      date: "2024-01-10",
      cost: 1800,
      tech: "Omar R.",
      status: "Bajarildi",
    },
  ])

  const columns = [
    { key: "id", label: "Ta'mirlash ID", sortable: true },
    { key: "equipment", label: "Uskuna", sortable: true },
    { key: "issue", label: "Muammo tavsifi", sortable: false },
    { key: "date", label: "Sana", sortable: true },
    { key: "cost", label: "Xarajat (so'm)", sortable: true },
    { key: "tech", label: "Usta", sortable: true },
    { key: "status", label: "Holat", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-slate-100">Ta'mirlash jurnali</h1>
          <p className="text-[#64748B] mt-1">Uskunalar ta'miri va texnik xizmatini nazorat qilish</p>
        </div>
        <Button onClick={() => setShowAddRepair(true)} variant="primary" size="lg">
          ➕ Ta'mir qo'shish
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 card-shadow">
        <DataTable columns={columns} data={repairs} searchableFields={["equipment", "issue"]} />
      </div>

      <Modal isOpen={showAddRepair} title="Uskuna ta'mirini kiritish" onClose={() => setShowAddRepair(false)} size="md">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] dark:text-slate-100 mb-2">Uskuna *</label>
            <SelectField
              value={""}
              onChange={() => {}}
              options={[
                { value: "Pech", label: "Pech" },
                { value: "Tegirmon", label: "Tegirmon" },
                { value: "Konveyer tasmasi", label: "Konveyer tasmasi" },
                { value: "Sement saqlash baki", label: "Sement saqlash baki" },
              ]}
              placeholder="Uskunani tanlang"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] dark:text-slate-100 mb-2">Muammo tavsifi *</label>
            <textarea
              placeholder="Muammoni yozing"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] dark:text-slate-100 mb-2">Ta'mirlash sanasi *</label>
            <input
              type="date"
              defaultValue={getTodayDateString()}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] dark:text-slate-100 mb-2">Ta'mir xarajati (so'm)</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] dark:text-slate-100 mb-2">Usta ismi</label>
            <input
              type="text"
              placeholder="Usta ismi"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <FileDropzone
              label="Oldin/Keyin rasmlar"
              accept="image/*"
              multiple
              valueText={photosText}
              onFilesSelected={(files) => {
                if (!files || files.length === 0) {
                  setPhotosText("")
                  return
                }
                if (files.length === 1) {
                  setPhotosText(files[0].name)
                  return
                }
                setPhotosText(`${files.length} ta fayl tanlandi`)
              }}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Saqlash
          </Button>
        </form>
      </Modal>
    </div>
  )
}
