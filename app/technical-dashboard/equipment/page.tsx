"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { FileDropzone } from "@/components/file-dropzone"
import { useState } from "react"

function getTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function EquipmentPage() {
  const [showAddEquipment, setShowAddEquipment] = useState(false)
  const [photoName, setPhotoName] = useState("")
  const [equipment] = useState([
    {
      id: "EQ001",
      name: "Kiln Furnace",
      model: "KF-5000",
      serial: "KF5000-2020",
      price: 150000,
      purchaseDate: "2020-05-15",
      status: "Active",
    },
    {
      id: "EQ002",
      name: "Crusher Mill",
      model: "CM-3000",
      serial: "CM3000-2019",
      price: 85000,
      purchaseDate: "2019-03-20",
      status: "Active",
    },
    {
      id: "EQ003",
      name: "Conveyor Belt",
      model: "CB-500",
      serial: "CB500-2021",
      price: 25000,
      purchaseDate: "2021-07-10",
      status: "Active",
    },
    {
      id: "EQ004",
      name: "Cement Storage Tank",
      model: "CST-10k",
      serial: "CST10k-2018",
      price: 45000,
      purchaseDate: "2018-11-05",
      status: "Active",
    },
  ])

  const columns = [
    { key: "id", label: "Equipment ID", sortable: true },
    { key: "name", label: "Equipment Name", sortable: true },
    { key: "model", label: "Model", sortable: true },
    { key: "serial", label: "Serial Number", sortable: true },
    { key: "price", label: "Price (so'm)", sortable: true },
    { key: "purchaseDate", label: "Purchase Date", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Equipment Management</h1>
          <p className="text-[#64748B] mt-1">Register and track all factory equipment</p>
        </div>
        <Button onClick={() => setShowAddEquipment(true)} variant="primary" size="lg">
          ➕ Register Equipment
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <DataTable columns={columns} data={equipment} searchableFields={["name", "serial", "model"]} />
      </div>

      <Modal
        isOpen={showAddEquipment}
        title="Register New Equipment"
        onClose={() => setShowAddEquipment(false)}
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Equipment Name *</label>
            <input
              type="text"
              placeholder="Equipment name"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Model *</label>
            <input
              type="text"
              placeholder="Model number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Serial Number *</label>
            <input
              type="text"
              placeholder="Serial number"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Purchase Price (so'm)</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Purchase Date</label>
            <input
              type="date"
              defaultValue={getTodayDateString()}
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <FileDropzone
              label="Photo"
              accept="image/*"
              valueText={photoName}
              onFilesSelected={(files) => {
                const file = files?.[0]
                setPhotoName(file ? file.name : "")
              }}
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Register Equipment
          </Button>
        </form>
      </Modal>
    </div>
  )
}
