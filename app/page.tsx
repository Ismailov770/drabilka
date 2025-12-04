"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ApiError, post } from "@/styles/lib/api"

const UZBEK_CONTENT = {
  title: "SimentMaker",
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
  const [role, setRole] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role || !username || !password) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await post<{
        user: {
          id: string
          username: string
          role: string
          name: string
          language?: string
        }
        token: string
      }>("/auth/login", {
        username,
        password,
        role,
      })

      if (typeof window !== "undefined") {
        window.localStorage.setItem("authToken", response.token)
        window.localStorage.setItem("authUser", JSON.stringify(response.user))
        window.localStorage.setItem("userRole", response.user.role)
        window.localStorage.setItem("userLanguage", response.user.language || "uz")
      }

      router.push(`/${response.user.role}-dashboard`)
    } catch (err: any) {
      if (err instanceof ApiError) {
        const backendMessage = (err.data && (err.data as any).message) || err.message || "Kirishda xatolik yuz berdi"
        setError(backendMessage)
      } else {
        setError("Kirishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const roleOptions = [
    { id: "owner", label: UZBEK_CONTENT.roles.owner, icon: "👔" },
    { id: "cashier", label: UZBEK_CONTENT.roles.cashier, icon: "💰" },
    { id: "driver", label: UZBEK_CONTENT.roles.driver, icon: "🚚" },
    { id: "technical", label: UZBEK_CONTENT.roles.technical, icon: "⚙️" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            {!role && (
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">{UZBEK_CONTENT.selectRole}</label>
                <div className="space-y-2">
                  {roleOptions.map((r) => (
                    <label
                      key={r.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border-2 ${
                        role === r.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r.id}
                        checked={role === r.id}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-lg">{r.icon}</span>
                      <span className="ml-2 font-medium text-slate-900">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {role && (
              <>
                {/* Login */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">{UZBEK_CONTENT.loginLabel}</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="owner01 yoki login"
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
                  disabled={!role || !username || !password || isLoading}
                  className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? "Yuklanmoqda..." : UZBEK_CONTENT.login}
                </button>
                {error && (
                  <p className="mt-3 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </>
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
