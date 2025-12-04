import type React from "react"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const variants = {
  primary:
    "bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-md hover:shadow-lg hover:brightness-110",
  secondary:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:border-[#CBD5E1]",
  danger: "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-sm",
  outline:
    "bg-transparent text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]",
  ghost: "bg-transparent text-[#0F172A] hover:bg-[#F1F5F9]",
}

const sizes = {
  sm: "px-3 py-1.5 text-xs md:text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-6 py-3 text-base md:text-lg",
}

export function Button({ variant = "primary", size = "md", children, disabled, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-[#F8FAFC] ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
