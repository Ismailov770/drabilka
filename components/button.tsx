import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const variants = {
  primary:
    "bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white shadow-md hover:shadow-lg hover:brightness-110",
  secondary:
    "bg-card text-foreground border border-border hover:bg-muted",
  danger: "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-sm",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
}

const sizes = {
  sm: "h-8 px-3 text-xs md:text-sm",
  md: "h-9 px-4 text-sm md:text-base",
  lg: "h-10 px-6 text-base md:text-lg",
}

export function Button({ variant = "primary", size = "md", children, disabled, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
