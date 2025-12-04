"use client"

import type { ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
}

export function Modal({ isOpen, title, onClose, children, size = "md" }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-slate-950/60 backdrop-blur-sm sm-animate-overlay-in">
      <div
        className={`w-full ${sizeClasses[size]} bg-white rounded-2xl border border-slate-200/80 card-shadow-lg overflow-hidden max-h-[90vh] flex flex-col sm-animate-modal-in`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80">
          <h2 className="text-base md:text-lg font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
