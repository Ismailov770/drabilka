"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ApiError } from "@/styles/lib/api"
import { fetchLprRecords, type LprRecordResponse, toFullLprImageUrl } from "@/styles/lib/lpr"

import { ImagePreviewModal } from "@/components/lpr/ImagePreviewModal"
import { LprFilters, type LprFiltersValue } from "@/components/lpr/LprFilters"
import { LprTable } from "@/components/lpr/LprTable"

const defaultLimit = 50

function normalizePlate(value: string): string {
  return value.trim()
}

export function LprPage() {
  const [filters, setFilters] = useState<LprFiltersValue>({
    dateFrom: "",
    dateTo: "",
    plate: "",
  })

  const [appliedFilters, setAppliedFilters] = useState<LprFiltersValue>({
    dateFrom: "",
    dateTo: "",
    plate: "",
  })

  const [limit, setLimit] = useState<number>(defaultLimit)
  const [offset, setOffset] = useState<number>(0)

  const [records, setRecords] = useState<LprRecordResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestSeqRef = useRef(0)

  const [preview, setPreview] = useState<{ title: string; url: string } | null>(null)

  const canPrev = offset > 0
  const canNext = records.length === limit

  const requestParams = useMemo(
    () => ({
      dateFrom: appliedFilters.dateFrom || undefined,
      dateTo: appliedFilters.dateTo || undefined,
      plate: appliedFilters.plate ? normalizePlate(appliedFilters.plate) : undefined,
      limit,
      offset,
    }),
    [appliedFilters.dateFrom, appliedFilters.dateTo, appliedFilters.plate, limit, offset],
  )

  const load = useCallback(async () => {
    requestSeqRef.current += 1
    const seq = requestSeqRef.current

    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchLprRecords(requestParams)
      if (seq !== requestSeqRef.current) return
      setRecords(Array.isArray(data) ? data : [])
    } catch (err: any) {
      if (seq !== requestSeqRef.current) return
      if (err instanceof ApiError) {
        const backendMessage =
          (err.data && (err.data as any).message) || err.message || "LPR yozuvlarini yuklab bo'lmadi"
        setError(backendMessage)
      } else {
        setError("LPR yozuvlarini yuklab bo'lmadi. Qayta urinib ko'ring.")
      }
      setRecords([])
    } finally {
      if (seq === requestSeqRef.current) {
        setIsLoading(false)
      }
    }
  }, [requestParams])

  useEffect(() => {
    load()
    return () => {
      requestSeqRef.current += 1
    }
  }, [load])

  const onSearch = () => {
    setOffset(0)
    setAppliedFilters(filters)
  }

  const onReset = () => {
    setFilters({ dateFrom: "", dateTo: "", plate: "" })
    setOffset(0)
    setAppliedFilters({ dateFrom: "", dateTo: "", plate: "" })
  }

  const onRefresh = () => {
    load()
  }

  const openPreview = (record: LprRecordResponse) => {
    setPreview({
      title: record.plateNumber && record.plateNumber.length > 0 ? record.plateNumber : record.filename,
      url: toFullLprImageUrl(record.imageUrl),
    })
  }

  const onLimitChange = (nextLimit: number) => {
    setOffset(0)
    setLimit(nextLimit)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">ANPR / LPR</h1>
        <p className="text-sm text-slate-500 mt-1">Aniqlangan avtomobillar ro'yxati</p>
      </div>

      <LprFilters
        value={filters}
        onChange={setFilters}
        onSearch={onSearch}
        onReset={onReset}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Xatolik</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Natijalar</CardTitle>
            <CardDescription>Ko'rsatilgan: {records.length}</CardDescription>
          </div>
          <CardAction className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
              disabled={!canPrev || isLoading}
            >
              Oldingi
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOffset((prev) => prev + limit)}
              disabled={!canNext || isLoading}
            >
              Keyingi
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="bg-slate-50 border-b border-slate-200 dark:bg-slate-950/30 dark:border-slate-800 px-6 py-3">
                  <div className="grid grid-cols-[80px_120px_200px_1fr] gap-6 items-center">
                    <Skeleton className="h-4 w-14" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="px-6 py-4">
                      <div className="grid grid-cols-[80px_120px_200px_1fr] gap-6 items-center">
                        <Skeleton className="h-16 w-16 rounded-lg" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-40" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[70%]" />
                          <Skeleton className="h-3 w-[55%]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : records.length === 0 ? (
            <div className="py-12 text-center text-slate-500">Ma'lumot yo'q</div>
          ) : (
            <LprTable records={records} onPreview={openPreview} />
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">Siljish: {offset} · Limit: {limit}</div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={limit === 50 ? "secondary" : "ghost"}
                onClick={() => onLimitChange(50)}
                disabled={isLoading}
              >
                50
              </Button>
              <Button
                type="button"
                variant={limit === 100 ? "secondary" : "ghost"}
                onClick={() => onLimitChange(100)}
                disabled={isLoading}
              >
                100
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ImagePreviewModal
        isOpen={!!preview}
        title={preview?.title ?? "Rasm"}
        imageUrl={preview?.url ?? ""}
        onClose={() => setPreview(null)}
      />
    </div>
  )
}
