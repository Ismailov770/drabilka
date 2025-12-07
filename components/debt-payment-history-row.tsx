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
}

const paymentsCache = new Map<string | number, DebtPaymentResponse[]>()

async function getDebtPayments(debtId: string | number): Promise<DebtPaymentResponse[]> {
  return get<DebtPaymentResponse[]>(`/debts/${debtId}/payments`)
}

interface DebtPaymentHistoryRowProps {
  debtId: string | number
  outstanding: number
}

export function DebtPaymentHistoryRow({ debtId, outstanding }: DebtPaymentHistoryRowProps) {
  const [payments, setPayments] = useState<DebtPaymentResponse[] | null>(() => {
    const cached = paymentsCache.get(debtId)
    return cached ?? null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        paymentsCache.set(debtId, sorted)
        setPayments(sorted)
      } catch (err: any) {
        if (cancelled) return
        if (err instanceof ApiError) {
          const backendMessage = (err.data && (err.data as any).message) || err.message || "Failed to load payment history"
          setError(backendMessage)
        } else {
          setError("Failed to load payment history. Please try again.")
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
    paymentsCache.delete(debtId)
    setPayments(null)
  }

  const totalPaid = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0

  return (
    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="font-semibold text-slate-900">Payment history</h4>
        {isLoading && (
          <span className="inline-flex items-center gap-2 text-xs text-slate-500">
            <Spinner className="h-4 w-4" /> Loading...
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
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && payments && payments.length === 0 && (
        <p className="text-xs text-slate-500">No payments recorded yet.</p>
      )}

      {!error && payments && payments.length > 0 && (
        <div className="mt-1 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-xs md:text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Date</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Amount paid</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Status after</th>
                <th className="px-3 py-2 text-left font-medium text-slate-600">Comment</th>
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

                return (
                  <tr key={p.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-800">{p.date}</td>
                    <td className="px-3 py-2 text-slate-800">${p.amount.toLocaleString()}</td>
                    <td className={`px-3 py-2 font-medium ${statusColor}`}>{p.statusAfterPayment}</td>
                    <td className="px-3 py-2 text-slate-600">{p.comment || "—"}</td>
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
            <span className="text-slate-500">Total paid: </span>
            <span className="font-semibold text-slate-900">${totalPaid.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-500">Outstanding: </span>
            <span className="font-semibold text-red-700">${outstanding.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
