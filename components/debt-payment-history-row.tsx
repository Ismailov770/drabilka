"use client"

import { useEffect, useState } from "react"

import { ApiError, get } from "@/styles/lib/api"
import { Spinner } from "@/components/ui/spinner"

type DebtPaymentResponse = {
  id: number
  debtId: number
  amount: number
  date: string
  comment: string | null
  statusAfterPayment: "Open" | "Partial" | "Paid"
  createdByFullName?: string | null
  createdByUsername?: string | null
  createdByRole?: "OWNER" | "CASHIER" | string | null
  createdBy?: string | null
}

async function getDebtPayments(debtId: string | number): Promise<DebtPaymentResponse[]> {
  return get<DebtPaymentResponse[]>(`/debts/${debtId}/payments`)
}

interface DebtPaymentHistoryRowProps {
  debtId: string | number
  outstanding: number
}

type AuthUser = {
  id: string
  username: string
  role: string
  name: string
}

export function DebtPaymentHistoryRow({ debtId, outstanding }: DebtPaymentHistoryRowProps) {
  const [payments, setPayments] = useState<DebtPaymentResponse[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("authUser")
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed && parsed.username && parsed.role) {
        setCurrentUser({
          id: String(parsed.id ?? ""),
          username: String(parsed.username),
          role: String(parsed.role),
          name: String(parsed.name ?? parsed.username ?? ""),
        })
      }
    } catch {
    }
  }, [])

  useEffect(() => {
    if (payments !== null) return

    let cancelled = false

    const fetchPayments = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getDebtPayments(debtId)
        if (cancelled) return
        const sorted = [...response].sort((a, b) => a.date.localeCompare(b.date))
        setPayments(sorted)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "To'lovlar tarixini yuklashda xatolik yuz berdi"
          setError(backendMessage)
        } else {
          setError("To'lovlar tarixini yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchPayments()

    return () => {
      cancelled = true
    }
  }, [debtId, payments])

  const handleRetry = () => {
    setPayments(null)
  }

  const totalPaid = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0

  const formatStatusLabel = (status: DebtPaymentResponse["statusAfterPayment"]) => {
    if (status === "Paid") return "To'liq to'langan"
    if (status === "Partial") return "Qisman to'langan"
    return "Ochiq"
  }

  const formatRoleLabel = (role?: string | null) => {
    if (!role) return "—"
    const normalized = role.toUpperCase()
    if (normalized === "OWNER") return "Egasi"
    if (normalized === "CASHIER") return "Kassir"
    return role
  }

  const getRoleBadgeClasses = (role?: string | null) => {
    const normalized = (role ?? "").toUpperCase()
    if (normalized === "OWNER") {
      return "inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800"
    }
    if (normalized === "CASHIER") {
      return "inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-800"
    }
    return "inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
  }

  const isCurrentUser = (username?: string | null) => {
    if (!username || !currentUser) return false
    return username.toLowerCase() === currentUser.username.toLowerCase()
  }

  return (
    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="font-semibold text-slate-900">To'lovlar tarixi</h4>
        {isLoading && (
          <span className="inline-flex items-center gap-2 text-xs text-slate-500">
            <Spinner className="h-4 w-4" /> Yuklanmoqda...
          </span>
        )}
      </div>

      {error && (
        <div className="mb-2 flex items-center justify-between gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="shrink-0 rounded-full border border-red-200 px-2 py-1 text-[11px] font-medium text-red-700 hover:bg-red-100"
          >
            Qayta urinib ko'rish
          </button>
        </div>
      )}

      {!isLoading && !error && payments && payments.length === 0 && (
        <p className="text-xs text-slate-500">Hozircha to'lovlar qayd etilmagan.</p>
      )}

      {!error && payments && payments.length > 0 && (
        <div className="mt-1 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Sana</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">To'langan summa</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">To'lovdan keyingi holat</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Izoh</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Kim tomonidan</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Login</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Rol</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const statusColor =
                  p.statusAfterPayment === "Paid"
                    ? "text-emerald-600"
                    : p.statusAfterPayment === "Partial"
                    ? "text-amber-600"
                    : "text-slate-600"

                const roleLabel = formatRoleLabel(p.createdByRole)
                const isMe = isCurrentUser(p.createdByUsername)
                const commentText = p.comment ?? "—"
                const displayBy = p.createdByFullName || p.createdByUsername || "—"

                return (
                  <tr key={p.id} className="border-t border-slate-100 align-top">
                    <td className="px-3 py-2 text-slate-800">{p.date}</td>
                    <td className="px-3 py-2 text-slate-800">{p.amount.toLocaleString()} so'm</td>
                    <td className={`px-3 py-2 font-medium ${statusColor}`}>{formatStatusLabel(p.statusAfterPayment)}</td>
                    <td className="px-3 py-2 text-slate-600">{commentText}</td>
                    <td className="px-3 py-2 text-slate-800">
                      <div className="flex items-center gap-1 flex-wrap">
                        <span>{displayBy}</span>
                        {isMe && (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-800">
                            Siz
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-slate-600">{p.createdByUsername || "—"}</td>
                    <td className="px-3 py-2 text-slate-600">
                      <span className={getRoleBadgeClasses(p.createdByRole)}>{roleLabel}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {!error && payments && (
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs md:text-sm">
          <div>
            <span className="text-slate-500">Jami to'langan: </span>
            <span className="font-semibold text-slate-900">{totalPaid.toLocaleString()} so'm</span>
          </div>
          <div>
            <span className="text-slate-500">Qoldiq qarz: </span>
            <span className="font-semibold text-red-700">{outstanding.toLocaleString()} so'm</span>
          </div>
        </div>
      )}
    </div>
  )
}
