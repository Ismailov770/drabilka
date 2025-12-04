import type { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: { value: number; isPositive: boolean }
  color?: "blue" | "green" | "orange" | "red" | "purple"
}

const colorMap = {
  blue: "from-[#2563EB] to-[#4F46E5] text-white",
  green: "from-[#22C55E] to-[#16A34A] text-white",
  orange: "from-[#FDBA74] to-[#FB923C] text-[#7C2D12]",
  red: "from-[#FCA5A5] to-[#F97373] text-[#7F1D1D]",
  purple: "from-[#C4B5FD] to-[#A855F7] text-white",
}

export function StatCard({ label, value, icon, trend, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-slate-100 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="text-3xl md:text-4xl font-semibold text-slate-900">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 md:text-sm ${trend.isPositive ? "text-emerald-500" : "text-rose-500"}`}>
              {trend.isPositive ? "▲" : "▼"} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[color]} shadow-md`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
