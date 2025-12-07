"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface SelectFieldProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
}

export function SelectField({ value, onChange, options, placeholder, className }: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!buttonRef.current && !listRef.current) return
      if (buttonRef.current?.contains(target) || listRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const selected = options.find((o) => o.value === value)

  return (
    <div className={`relative ${className ?? ""}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full sm-select flex items-center justify-between gap-2"
      >
        <span
          className={
            selected
              ? "text-slate-900 dark:text-slate-100"
              : "text-slate-400 dark:text-slate-400"
          }
        >
          {selected?.label ?? placeholder ?? "Tanlang"}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg max-h-60 overflow-auto sm-animate-submenu-in"
        >
          {options.map((option) => {
            const isActive = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
