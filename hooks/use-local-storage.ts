"use client"

import { useEffect, useState } from "react"

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(defaultValue)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) {
        window.localStorage.setItem(key, JSON.stringify(defaultValue))
        return
      }
      const parsed = JSON.parse(raw) as T
      setState(parsed)
    } catch {
      // ignore JSON errors and keep default
    }
  }, [key])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // ignore quota or access errors
    }
  }, [key, state])

  return [state, setState] as const
}
