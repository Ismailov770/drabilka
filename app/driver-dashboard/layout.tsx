"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "driver") {
      router.push("/")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) return null

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Haydovchi kabinasi</p>
          <h1 className="text-xl font-bold text-foreground">Driver Dashboard</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex items-start justify-center">
        {children}
      </main>
    </div>
  )
}

