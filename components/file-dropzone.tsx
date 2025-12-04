"use client"

import React, { useCallback, useRef, useState } from "react"
import { UploadCloud } from "lucide-react"

interface FileDropzoneProps {
  label: string
  description?: string
  accept?: string
  multiple?: boolean
  required?: boolean
  valueText?: string
  onFilesSelected?: (files: FileList | null) => void
}

export function FileDropzone({
  label,
  description,
  accept,
  multiple,
  required,
  valueText,
  onFilesSelected,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (onFilesSelected) {
        onFilesSelected(files)
      }
    },
    [onFilesSelected],
  )

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)

    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      handleFiles(files)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files)
  }

  const hintText = description ??
    (multiple
      ? "Fayllarni bu yerga tortib tashlang yoki tanlang"
      : "Faylni bu yerga tortib tashlang yoki tanlang")

  const hasValue = Boolean(valueText && valueText.length > 0)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#0F172A]">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-col items-center justify-center w-full px-4 py-5 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
        }`}
      >
        <UploadCloud className="w-6 h-6 text-[#2563EB] mb-2" />
        <p className="text-sm font-medium text-[#0F172A] text-center">Drag & drop yoki faylni tanlang</p>
        <p className="mt-1 text-xs text-[#64748B] text-center">{hintText}</p>
        {hasValue && (
          <p className="mt-2 text-xs text-[#0F172A] max-w-full truncate">Tanlangan: {valueText}</p>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        required={required}
        onChange={handleInputChange}
      />
    </div>
  )
}
