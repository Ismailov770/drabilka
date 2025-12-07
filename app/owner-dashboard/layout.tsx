"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  LayoutDashboard,
  Factory,
  Boxes,
  Repeat2,
  Wallet2,
  CreditCard,
  FileText,
  Truck,
  Wrench,
  ClipboardList,
  Settings2,
  BarChart3,
  Menu,
} from "lucide-react"

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthed, setIsAuthed] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "owner") {
      router.push("/")
    } else {
      setIsAuthed(true)
    }
  }, [router])

  if (!isAuthed) return null

  const navItems = [
    { label: "Boshqaruv paneli", href: "/owner-dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    {
      label: "Mahsulotlar",
      icon: <Factory className="w-5 h-5" />,
      href: "#",
      children: [
        { label: "Chiqarilgan Mahsulot", href: "/owner-dashboard/production", icon: <Boxes className="w-4 h-4" /> },
        {
          label: "Mahsulot Kirim/Chiqim",
          href: "/owner-dashboard/product-flow",
          icon: <Repeat2 className="w-4 h-4" />,
        },
      ],
    },
    {
      label: "Moliyaviy Holat",
      icon: <Wallet2 className="w-5 h-5" />,
      href: "#",
      children: [
        { label: "Umumiy Rasxodlar", href: "/owner-dashboard/expenses", icon: <FileText className="w-4 h-4" /> },
        { label: "Qarzlar", href: "/owner-dashboard/debts", icon: <CreditCard className="w-4 h-4" /> },
        { label: "Ishchilar Oyligi", href: "/owner-dashboard/payroll", icon: <FileText className="w-4 h-4" /> },
      ],
    },
    {
      label: "Texnika & Transport",
      icon: <Truck className="w-5 h-5" />,
      href: "#",
      children: [
        { label: "Tehnikalar Kirim/Chiqim", href: "/owner-dashboard/equipment-flow", icon: <Wrench className="w-4 h-4" /> },
        {
          label: "Haydovchilar yoqilg'i sarfi",
          href: "/owner-dashboard/driver-fuel",
          icon: <ClipboardList className="w-4 h-4" />,
        },
      ],
    },
    
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white dark:bg-slate-900/70 sticky top-0 z-30 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
            S
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">DrabilkaUz · Zavod egasi</span>
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
        <SidebarNav role="owner" items={navItems} onNavigate={() => setIsMobileNavOpen(false)} />
      </aside>

      {/* Mobile drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm sm-animate-overlay-in"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 sm-animate-drawer-left-in">
            <SidebarNav role="owner" items={navItems} onNavigate={() => setIsMobileNavOpen(false)} />
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
