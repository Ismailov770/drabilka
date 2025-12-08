"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { getHomePathForRole, getStoredAuth, isRoleAllowed } from "@/styles/lib/auth"

export default function TechnicalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const { token, role } = getStoredAuth()

    if (!token || !role) {
      router.push("/")
      return
    }

    const requiredRole = "technical"

    if (!isRoleAllowed(requiredRole, role)) {
      const homePath = getHomePathForRole(role)
      router.push(homePath || "/")
      return
    }

    setIsAuthed(true)
  }, [router])

  if (!isAuthed) return null

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Texnik mas'ul</p>
          <h1 className="text-xl font-bold text-foreground">Technical Dashboard</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex items-start justify-center">
        {children}
      </main>
    </div>
  )
}

