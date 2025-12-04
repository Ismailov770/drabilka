"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function TechnicalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "technical") {
      router.push("/")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) return null

  return <main className="min-h-screen p-6 bg-[#F8FAFC] flex items-start justify-center">{children}</main>
}

