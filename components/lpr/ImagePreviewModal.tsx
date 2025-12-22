"use client"

import { useEffect, useMemo, useState } from "react"

import { Modal } from "@/components/modal"

interface ImagePreviewModalProps {
  isOpen: boolean
  title: string
  imageUrl: string
  onClose: () => void
}

export function ImagePreviewModal({ isOpen, title, imageUrl, onClose }: ImagePreviewModalProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setHasError(false)
    }
  }, [isOpen, imageUrl])

  const key = useMemo(() => `${imageUrl}::${isOpen}`, [imageUrl, isOpen])

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} size="lg">
      <div className="flex justify-center">
        {hasError ? (
          <div className="w-full max-w-2xl">
            <div className="h-[60vh] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Rasm yo'q</div>
                <div className="text-xs text-slate-500 mt-1">Rasm yuklanmadi</div>
              </div>
            </div>
          </div>
        ) : (
          <img
            key={key}
            src={imageUrl}
            alt={title}
            crossOrigin="anonymous"
            onError={() => setHasError(true)}
            className="max-h-[80vh] w-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
          />
        )}
      </div>
    </Modal>
  )
}
