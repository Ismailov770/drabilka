import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PwaInstallPrompt } from "@/components/pwa-install-prompt"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DrabilkaUz - Cement Factory Management",
  description: "Enterprise management system for cement factories",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/icon-db.png",
        type: "image/png",
      },
    ],
    apple: "/icon-db.png",
  },
}

export const viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <PwaInstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  )
}
