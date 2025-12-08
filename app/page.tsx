"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ApiError, post } from "@/styles/lib/api"
import { getHomePathForRole } from "@/styles/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

const UZBEK_CONTENT = {
  title: "DrabilkaUz",
  subtitle: "Semento Zavodi Boshqaruv Tizimi",
  selectRole: "Rolni Tanlang",
  loginLabel: "Login",
  password: "Parol",
  login: "Kirish",
  demo: "Demo ma'lumotlari: har qanday login/parol kombinatsiyasi",
  roles: {
    owner: "Zavod Ega",
    cashier: "Kasser",
    driver: "Wafyor (Yo'l Hodisalari)",
    technical: "Texnik Mas'ul",
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await post<any>("/auth/login", {
        username,
        password,
      })

      const raw: any = response as any
      const accessToken: string | null =
        (raw && (raw.accessToken as string | undefined)) ||
        (raw && (raw.token as string | undefined)) ||
        (raw && raw.data && (raw.data.accessToken as string | undefined)) ||
        null
      const refreshToken: string | null =
        (raw && (raw.refreshToken as string | undefined)) ||
        (raw && raw.data && (raw.data.refreshToken as string | undefined)) ||
        null
      const role: string | null =
        (raw && (raw.role as string | undefined)) ||
        (raw && raw.user && (raw.user.role as string | undefined)) ||
        null
      const user = (raw && raw.user) || null
      const language: string =
        (user && (user.language as string | undefined)) ||
        (raw && (raw.language as string | undefined)) ||
        "uz"

      if (!accessToken) {
        setError("Kirishda xatolik yuz berdi. Token olinmadi.")
        return
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("authToken", accessToken)
        if (refreshToken) {
          window.localStorage.setItem("refreshToken", refreshToken)
        }
        if (user) {
          window.localStorage.setItem("authUser", JSON.stringify(user))
        }
        if (role) {
          window.localStorage.setItem("userRole", role)
          window.sessionStorage.setItem("userRole", role)
        }
        if (language) {
          window.localStorage.setItem("userLanguage", language)
        }
      }

      const homePath = getHomePathForRole(role)

      if (!role || !homePath) {
        setError("Bu login uchun rol aniqlanmadi. Iltimos, administrator bilan bog'laning.")
        return
      }

      router.push(homePath)
    } catch (err: any) {
      if (err instanceof ApiError) {
        if (err.status === 400 || err.status === 401 || err.status === 403) {
          setError("Login yoki parol noto'g'ri. Iltimos, qayta tekshirib ko'ring.")
        } else {
          const backendMessage =
            (err.data && (err.data as any).message) || err.message || "Kirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
          setError(backendMessage)
        }
      } else {
        setError("Tarmoq xatosi yoki serverga ulanish imkoni yo'q.")
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-end mb-4">
          <ThemeToggle />
        </div>
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{UZBEK_CONTENT.title}</h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">{UZBEK_CONTENT.subtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            {/* Login */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.loginLabel}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="login kiriting"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!username || !password || isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? "Yuklanmoqda..." : UZBEK_CONTENT.login}
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
            <p>{UZBEK_CONTENT.demo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
