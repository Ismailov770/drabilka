"use client"

import type React from "react"

import { useState } from "react"

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, any>[]
  searchableFields?: string[]
  actions?: (row: Record<string, any>) => React.ReactNode
  renderCell?: (row: Record<string, any>, col: Column) => React.ReactNode
  footerTotals?: Record<string, number>
}

export function DataTable({ columns, data, searchableFields = [], actions, renderCell, footerTotals }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  let filteredData = data.filter((row) =>
    searchableFields.some((field) => String(row[field]).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (sortConfig) {
    filteredData = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortConfig.direction === "asc" ? comparison : -comparison
    })
  }

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const displayData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Calculate totals from filtered data (including search filter)
  const calculatedTotals = footerTotals
    ? filteredData.reduce(
        (acc, row) => {
          if (row.quantity !== undefined) acc.quantity += row.quantity
          if (row.totalSum !== undefined) acc.totalSum += row.totalSum
          if (row.amount !== undefined) acc.amount += row.amount
          if (row.total !== undefined) acc.total += row.total
          if (row.advance !== undefined) acc.advance += row.advance
          if (row.remaining !== undefined) acc.remaining += row.remaining
          if (row.cost !== undefined) acc.cost += row.cost
          if (row.count !== undefined) acc.count += row.count
          return acc
        },
        { quantity: 0, totalSum: 0, amount: 0, total: 0, advance: 0, remaining: 0, cost: 0, count: filteredData.length },
      )
    : null

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key && prev.direction === "asc" ? { key, direction: "desc" } : { key, direction: "asc" },
    )
    setCurrentPage(1)
  }

  return (
    <div className="space-y-4">
      {searchableFields.length > 0 && (
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left">
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-[#2563EB] transition-colors"
                    >
                      {col.label}
                      {sortConfig?.key === col.key && <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>}
                    </button>
                  ) : (
                    <span className="font-semibold text-slate-700">{col.label}</span>
                  )}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left font-semibold text-slate-700">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                    {renderCell ? renderCell(row, col) : row[col.key]}
                  </td>
                ))}
                {actions && <td className="px-6 py-4">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
          {calculatedTotals && (
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200 font-semibold">
                {columns.map((col) => {
                  if (col.key === "quantity" && calculatedTotals.quantity !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.quantity)} tonna
                      </td>
                    )
                  }
                  if (col.key === "cost" && calculatedTotals.cost !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
                          calculatedTotals.cost,
                        )}
                      </td>
                    )
                  }
                  if (col.key === "totalSum" && calculatedTotals.totalSum !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.totalSum)} so'm
                      </td>
                    )
                  }
                  if (col.key === "amount" && calculatedTotals.amount !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
                          calculatedTotals.amount,
                        )}
                      </td>
                    )
                  }
                  if (col.key === "total" && calculatedTotals.total !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
                          calculatedTotals.total,
                        )}
                      </td>
                    )
                  }
                  if (col.key === "advance" && calculatedTotals.advance !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
                          calculatedTotals.advance,
                        )}
                      </td>
                    )
                  }
                  if (col.key === "remaining" && calculatedTotals.remaining !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
                          calculatedTotals.remaining,
                        )}
                      </td>
                    )
                  }
                  if (col.key === "batchId" || col.key === "id") {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-right font-semibold text-sm">
                        Jami:
                      </td>
                    )
                  }
                  // Show count in operator column if count is available
                  if (col.key === "operator" && calculatedTotals.count !== undefined && calculatedTotals.count > 0) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 font-semibold text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.count)} ta
                      </td>
                    )
                  }
                  // Show count in loggedAt, producedAt, or payoutDate column if operator column doesn't exist
                  if (
                    (col.key === "producedAt" || col.key === "loggedAt" || col.key === "payoutDate" || col.key === "date") &&
                    calculatedTotals.count !== undefined &&
                    calculatedTotals.count > 0 &&
                    !columns.find((c) => c.key === "operator")
                  ) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 font-semibold text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.count)} ta
                      </td>
                    )
                  }
                  // Show count in status column if no operator or date column
                  if (
                    col.key === "status" &&
                    calculatedTotals.count !== undefined &&
                    calculatedTotals.count > 0 &&
                    !columns.find((c) => c.key === "operator") &&
                    !columns.find((c) => c.key === "producedAt" || c.key === "loggedAt" || c.key === "payoutDate" || c.key === "date")
                  ) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 font-semibold text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.count)} ta
                      </td>
                    )
                  }
                  // Show count in transport column if no operator, date, or status column
                  if (
                    col.key === "transport" &&
                    calculatedTotals.count !== undefined &&
                    calculatedTotals.count > 0 &&
                    !columns.find((c) => c.key === "operator") &&
                    !columns.find((c) => c.key === "producedAt" || c.key === "loggedAt" || c.key === "payoutDate" || c.key === "date") &&
                    !columns.find((c) => c.key === "status")
                  ) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 font-semibold text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.count)} ta
                      </td>
                    )
                  }
                  return (
                    <td key={col.key} className="px-6 py-4 text-slate-400 text-sm">
                      -
                    </td>
                  )
                })}
                {actions && <td className="px-6 py-4"></td>}
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-200 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
