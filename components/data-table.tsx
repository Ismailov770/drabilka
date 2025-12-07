"use client"

import React, { useState } from "react"
import { ChevronRight } from "lucide-react"

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
  expandableRow?: (row: Record<string, any>) => React.ReactNode
}

export function DataTable({ columns, data, searchableFields = [], actions, renderCell, footerTotals, expandableRow }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRowIds, setExpandedRowIds] = useState<Array<string | number>>([])

  let filteredData = data

  if (searchableFields.length > 0) {
    filteredData = data.filter((row) =>
      searchableFields.some((field) => String(row[field]).toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const getRowKey = (row: Record<string, any>, idx: number): string | number => {
    if (row.id !== undefined && row.id !== null) return row.id
    if (row.batchId !== undefined && row.batchId !== null) return row.batchId
    return idx
  }

  const toggleRowExpanded = (rowKey: string | number) => {
    setExpandedRowIds((prev) =>
      prev.includes(rowKey) ? prev.filter((id) => id !== rowKey) : [...prev, rowKey],
    )
  }

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

      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 dark:bg-slate-900 dark:border-slate-700">
              {expandableRow && <th className="w-10 px-4 py-3" aria-hidden="true"></th>}
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left">
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-100 hover:text-[#2563EB] transition-colors"
                    >
                      {col.label}
                      {sortConfig?.key === col.key && <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>}
                    </button>
                  ) : (
                    <span className="font-semibold text-slate-700 dark:text-slate-100">{col.label}</span>
                  )}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left font-semibold text-slate-700 dark:text-slate-100">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, idx) => {
              const rowKey = getRowKey(row, idx)
              const isExpanded = expandableRow ? expandedRowIds.includes(rowKey) : false

              return (
                <React.Fragment key={rowKey}>
                  <tr className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    {expandableRow && (
                      <td className="px-4 py-4 text-slate-400 text-sm align-top">
                        <button
                          type="button"
                          onClick={() => toggleRowExpanded(rowKey)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300"
                          aria-label={isExpanded ? "Collapse row" : "Expand row"}
                        >
                          <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm">
                        {renderCell ? renderCell(row, col) : row[col.key]}
                      </td>
                    ))}
                    {actions && <td className="px-6 py-4">{actions(row)}</td>}
                  </tr>
                  {expandableRow && isExpanded && (
                    <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/80">
                      <td
                        className="px-6 pb-5 pt-0 text-slate-900 dark:text-slate-100 text-sm"
                        colSpan={columns.length + (actions ? 1 : 0) + 1}
                      >
                        {expandableRow(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
          {calculatedTotals && (
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-700 font-semibold">
                {columns.map((col) => {
                  if (col.key === "quantity" && calculatedTotals.quantity !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.quantity)} m³
                      </td>
                    )
                  }
                  if (col.key === "cost" && calculatedTotals.cost !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.cost)} so'm
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
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.amount)} so'm
                      </td>
                    )
                  }
                  if (col.key === "total" && calculatedTotals.total !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.total)} so'm
                      </td>
                    )
                  }
                  if (col.key === "advance" && calculatedTotals.advance !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.advance)} so'm
                      </td>
                    )
                  }
                  if (col.key === "remaining" && calculatedTotals.remaining !== undefined) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 text-sm">
                        {new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(calculatedTotals.remaining)} so'm
                      </td>
                    )
                  }
                  if (col.key === "batchId" || col.key === "id") {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 dark:text-slate-100 text-right font-semibold text-sm">
                        Jami:
                      </td>
                    )
                  }
                  // Show count in operator column if count is available
                  if (col.key === "operator" && calculatedTotals.count !== undefined && calculatedTotals.count > 0) {
                    return (
                      <td key={col.key} className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold text-sm">
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
                    <td key={col.key} className="px-6 py-4 text-slate-400 dark:text-slate-500 text-sm">
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
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
