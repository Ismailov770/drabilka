const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000"

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface RequestOptions {
  method?: HttpMethod
  params?: Record<string, string | number | boolean | null | undefined>
  body?: any
  headers?: Record<string, string>
  signal?: AbortSignal
}

export class ApiError<T = any> extends Error {
  status: number
  data: T | null

  constructor(message: string, status: number, data: T | null = null) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const base = path.startsWith("http") ? path : `${API_BASE_URL}${path}`
  if (!params) return base

  const url = new URL(base)

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    url.searchParams.append(key, String(value))
  })

  return url.toString()
}

export async function apiRequest<T = any>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", params, body, headers, signal } = options

  const url = buildUrl(path, params)

  let finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  }

  if (typeof window !== "undefined") {
    try {
      const token = window.localStorage.getItem("authToken")
      if (token && !finalHeaders.Authorization) {
        finalHeaders = {
          ...finalHeaders,
          Authorization: `Bearer ${token}`,
        }
      }
    } catch {
    }
  }

  const init: RequestInit = {
    method,
    headers: finalHeaders,
    signal,
  }

  if (body !== undefined && body !== null && method !== "GET") {
    if (body instanceof FormData) {
      const { ["Content-Type"]: _removed, ...rest } = finalHeaders as Record<string, string>
      finalHeaders = rest
      init.headers = finalHeaders
      init.body = body
    } else {
      init.body = JSON.stringify(body)
    }
  }

  const response = await fetch(url, init)
  const text = await response.text()

  let data: any = null

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!response.ok) {
    throw new ApiError(response.statusText || "Request failed", response.status, data)
  }

  return data as T
}

export function get<T = any>(path: string, options?: Omit<RequestOptions, "method" | "body">): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "GET" })
}

export function post<T = any, B = any>(
  path: string,
  body?: B,
  options?: Omit<RequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "POST", body })
}

export function put<T = any, B = any>(
  path: string,
  body?: B,
  options?: Omit<RequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "PUT", body })
}

export function patch<T = any, B = any>(
  path: string,
  body?: B,
  options?: Omit<RequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "PATCH", body })
}

export function del<T = any, B = any>(
  path: string,
  body?: B,
  options?: Omit<RequestOptions, "method" | "body">,
): Promise<T> {
  return apiRequest<T>(path, { ...options, method: "DELETE", body })
}

export { API_BASE_URL }
