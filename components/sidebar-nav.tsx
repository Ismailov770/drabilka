"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: ReactNode
  children?: NavItem[]
}

interface SidebarNavProps {
  role: string
  items: NavItem[]
  onNavigate?: () => void
}

export function SidebarNav({ role, items, onNavigate }: SidebarNavProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("authToken")
      window.localStorage.removeItem("refreshToken")
      window.localStorage.removeItem("authUser")
      window.localStorage.removeItem("userRole")
      window.localStorage.removeItem("userLanguage")
      window.sessionStorage.removeItem("userRole")
    }
    router.push("/")
  }

  const isActive = (href: string) => pathname === href

  return (
    <div className="h-full w-full bg-[#0F172A] text-white overflow-y-auto flex flex-col">
      {/* Header
      <div className="p-6 border-b border-[#1E293B]">
        <h2 className="text-2xl font-bold">SimentMaker</h2>
        <p className="text-sm text-[#94A3B8] mt-1 capitalize">{role.replace("-", " ")} Dashboard</p>
      </div> */}

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#1E293B] transition-colors text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </span>
                  <span
                    className={`text-slate-400 transition-transform ${
                      expandedItems.includes(item.label) ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="ml-4 mt-1 space-y-1 sm-animate-submenu-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          isActive(child.href) ? "bg-[#2563EB] text-white" : "text-[#CBD5E1] hover:bg-[#1E293B]"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href) ? "bg-[#2563EB] text-white" : "text-[#CBD5E1] hover:bg-[#1E293B]"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#1E293B]">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors font-medium"
        >
          Chiqish
        </button>
      </div>
    </div>
  )
}
