import { API_BASE_URL, get } from "@/styles/lib/api"

export interface LprRecordResponse {
  filename: string
  plateNumber?: string | null
  capturedAt: string
  imageUrl: string
}

export interface FetchLprRecordsParams {
  dateFrom?: string
  dateTo?: string
  plate?: string
  limit?: number
  offset?: number
}

function getBackendOrigin(): string {
  try {
    const parsed = new URL(API_BASE_URL)
    return parsed.origin
  } catch {
    return API_BASE_URL.replace(/\/+$/, "")
  }
}

export function toFullLprImageUrl(imageUrl: string): string {
  if (!imageUrl) return ""
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl

  const origin = getBackendOrigin()
  if (imageUrl.startsWith("/")) return `${origin}${imageUrl}`
  return `${origin}/${imageUrl}`
}

export async function fetchLprRecords(params: FetchLprRecordsParams = {}, signal?: AbortSignal): Promise<LprRecordResponse[]> {
  return get<LprRecordResponse[]>("/lpr/records", {
    params: {
      dateFrom: params.dateFrom || undefined,
      dateTo: params.dateTo || undefined,
      plate: params.plate || undefined,
      limit: params.limit ?? 200,
      offset: params.offset ?? 0,
    },
    signal,
  })
}
