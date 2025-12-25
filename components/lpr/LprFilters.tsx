"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface LprFiltersValue {
  dateFrom: string
  dateTo: string
  plate: string
}

interface LprFiltersProps {
  value: LprFiltersValue
  onChange: (next: LprFiltersValue) => void
  onSearch: () => void
  onReset: () => void
  onRefresh: () => void
  isLoading?: boolean
}

export function LprFilters({ value, onChange, onSearch, onReset, onRefresh, isLoading }: LprFiltersProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 card-shadow-lg border border-slate-100 dark:border-slate-800 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Boshlanish sana</label>
          <Input
            type="date"
            value={value.dateFrom}
            onChange={(e) => onChange({ ...value, dateFrom: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Tugash sana</label>
          <Input
            type="date"
            value={value.dateTo}
            onChange={(e) => onChange({ ...value, dateTo: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">Davlat raqami</label>
          <Input
            placeholder="01A234BC"
            value={value.plate}
            onChange={(e) => onChange({ ...value, plate: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch()
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 justify-end">
        <Button type="button" variant="default" onClick={onSearch} disabled={!!isLoading}>
          Qidirish
        </Button>
        <Button type="button" variant="outline" onClick={onReset} disabled={!!isLoading}>
          Tozalash
        </Button>
        <Button type="button" variant="secondary" onClick={onRefresh} disabled={!!isLoading}>
          Yangilash
        </Button>
      </div>
    </div>
  )
}
