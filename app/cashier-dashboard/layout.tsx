"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { getHomePathForRole, getStoredAuth, isRoleAllowed } from "@/styles/lib/auth"
import { LayoutDashboard, ShoppingCart, Receipt, Users, CreditCard, Menu, Fuel } from "lucide-react"

export default function CashierLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    const { token, role } = getStoredAuth()

    if (!token || !role) {
      router.push("/")
      return
    }

    const requiredRole = "cashier"

    if (!isRoleAllowed(requiredRole, role)) {
      const homePath = getHomePathForRole(role)
      router.push(homePath || "/")
      return
    }

    setIsAuthed(true)
  }, [router])

  if (!isAuthed) return null

  // Sidebar navigation items — ensure href is correct and not overwritten
  const navItems = [
    { label: "Savdolar boshqaruvi", href: "/cashier-dashboard/sales", icon: <ShoppingCart className="w-5 h-5" /> },
    { label: "Rasxodlar", href: "/cashier-dashboard/expenses", icon: <Receipt className="w-5 h-5" /> },
    { label: "Yoqilg'i (kassa)", href: "/cashier-dashboard/fuel", icon: <Fuel className="w-5 h-5" /> },
    { label: "Ish haqi", href: "/cashier-dashboard/payroll", icon: <Users className="w-5 h-5" /> },
    { label: "Qarzlar", href: "/cashier-dashboard/debts", icon: <CreditCard className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white dark:bg-slate-900/70 sticky top-0 z-30 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
            S
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">DrabilkaUz · Kassir</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40">
        <SidebarNav role="cashier" items={navItems} onNavigate={() => setIsMobileNavOpen(false)} />
      </aside>

      {/* Mobile drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm sm-animate-overlay-in"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 sm-animate-drawer-left-in">
            <SidebarNav role="cashier" items={navItems} onNavigate={() => setIsMobileNavOpen(false)} />
          </div>
        </div>
      )}
      <main className="flex-1 p-4 md:p-6 md:ml-64">
        <div className="hidden md:flex items-center justify-between mb-4">
          <div />
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  )
}
