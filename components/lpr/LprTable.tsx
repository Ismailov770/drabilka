"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { ImageOff } from "lucide-react"

import { LprRecordResponse, toFullLprImageUrl } from "@/styles/lib/lpr"

interface LprTableProps {
  records: LprRecordResponse[]
  onPreview: (record: LprRecordResponse) => void
}

function normalizeCapturedAt(value: string): string {
  if (!value) return value
  return value.replace(/\.(\d{3})\d+/, ".$1")
}

function formatCapturedAt(value: string): string {
  const normalized = normalizeCapturedAt(value)
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return "—"
  return format(date, "dd.MM.yyyy HH:mm:ss")
}

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false)

  const key = useMemo(() => src, [src])

  if (error) {
    return (
      <div className="w-16 h-16 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center">
        <ImageOff className="w-4 h-4 text-slate-400" />
        <span className="mt-1 text-[10px] text-slate-500">Rasm yo'q</span>
      </div>
    )
  }

  return (
    <img
      key={key}
      src={src}
      alt={alt}
      crossOrigin="anonymous"
      onError={() => setError(true)}
      className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-white"
    />
  )
}

export function LprTable({ records, onPreview }: LprTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 dark:bg-slate-950/30 dark:border-slate-800">
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Rasm</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Raqam</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Vaqt</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Fayl</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => {
            const fullImageUrl = toFullLprImageUrl(r.imageUrl)
            return (
              <tr
                key={`${r.filename}-${r.capturedAt}`}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onPreview(r)}
                    className="inline-flex items-center"
                    aria-label="Rasmni ochish"
                  >
                    <Thumbnail src={fullImageUrl} alt={r.filename} />
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100 font-medium">
                  {r.plateNumber && r.plateNumber.length > 0 ? r.plateNumber : "—"}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-100">{formatCapturedAt(r.capturedAt)}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900 dark:text-slate-100">{r.filename}</div>
                  <div className="text-xs text-slate-500 mt-1">{r.imageUrl}</div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
