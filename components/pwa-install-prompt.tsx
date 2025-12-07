"use client"

import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [isIos, setIsIos] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const DISMISS_KEY = "pwa-install-dismissed-at"
    const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 1 hafta

    let recentlyDismissed = false
    try {
      const raw = window.localStorage.getItem(DISMISS_KEY)
      if (raw) {
        const ts = Number(raw)
        if (!Number.isNaN(ts) && Date.now() - ts < DISMISS_DURATION_MS) {
          recentlyDismissed = true
        }
      }
    } catch {
      // localStorage bo'lmasa, shunchaki davom etamiz
    }

    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true

    setIsIos(isIosDevice)

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {})
    }

    if (recentlyDismissed) {
      return
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    if (isIosDevice && !isStandalone) {
      setVisible(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // iOS yoki beforeinstallprompt bo'lmagan brauzerlar uchun
      setVisible(false)
      return
    }
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setVisible(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setVisible(false)
    setDeferredPrompt(null)

    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem("pwa-install-dismissed-at", String(Date.now()))
    } catch {
      // localStorage yo'q bo'lsa, shunchaki e'tiborsiz qoldiramiz
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
      <div className="mx-4 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3 max-w-md border border-slate-200">
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-900">DrabilkaUz ilovasini o'rnatish</div>
          <div className="text-xs text-slate-500 mt-1">
            {isIos
              ? "iOS qurilmalarida ilovani o'rnatish uchun brauzer menyusidan \"Add to Home Screen\" (Bosh ekranga qo'shish) ni tanlang."
              : "Tezroq kirish uchun ilovani qurilmangizga PWA sifatida o'rnating."}
          </div>
        </div>
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors"
        >
          O'rnatish
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
        >
          Bekor
        </button>
      </div>
    </div>
  )
}
