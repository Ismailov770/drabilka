"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/button"
import { Modal } from "@/components/modal"
import { useState } from "react"

export default function RepairsPage() {
  const [showAddRepair, setShowAddRepair] = useState(false)
  const [repairs] = useState([
    {
      id: "R001",
      equipment: "Conveyor Belt",
      issue: "Belt misalignment",
      date: "2024-01-14",
      cost: 2500,
      tech: "Ahmed M.",
      status: "Completed",
    },
    {
      id: "R002",
      equipment: "Kiln Furnace",
      issue: "Temperature sensor replacement",
      date: "2024-01-12",
      cost: 3200,
      tech: "Karim S.",
      status: "Completed",
    },
    {
      id: "R003",
      equipment: "Crusher Mill",
      issue: "Bearing maintenance",
      date: "2024-01-10",
      cost: 1800,
      tech: "Omar R.",
      status: "Completed",
    },
  ])

  const columns = [
    { key: "id", label: "Repair ID", sortable: true },
    { key: "equipment", label: "Equipment", sortable: true },
    { key: "issue", label: "Issue Description", sortable: false },
    { key: "date", label: "Date", sortable: true },
    { key: "cost", label: "Cost ($)", sortable: true },
    { key: "tech", label: "Technician", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Repair Log</h1>
          <p className="text-[#64748B] mt-1">Track equipment repairs and maintenance</p>
        </div>
        <Button onClick={() => setShowAddRepair(true)} variant="primary" size="lg">
          ➕ Log Repair
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 card-shadow">
        <DataTable columns={columns} data={repairs} searchableFields={["equipment", "issue"]} />
      </div>

      <Modal isOpen={showAddRepair} title="Log Equipment Repair" onClose={() => setShowAddRepair(false)} size="md">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Equipment *</label>
            <select
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            >
              <option value="">Select equipment</option>
              <option>Kiln Furnace</option>
              <option>Crusher Mill</option>
              <option>Conveyor Belt</option>
              <option>Cement Storage Tank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Issue Description *</label>
            <textarea
              placeholder="Describe the issue"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Repair Date *</label>
            <input type="date" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Repair Cost ($)</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Technician Name</label>
            <input
              type="text"
              placeholder="Technician name"
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">Before/After Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Log Repair
          </Button>
        </form>
      </Modal>
    </div>
  )
}
