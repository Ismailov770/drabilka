export type UserRole = string

const ROLE_HOME_MAP: Record<string, string> = {
  ADMIN: "/admin",
  OPERATOR: "/operator",
  MANAGER: "/manager",
  owner: "/owner-dashboard",
  OWNER: "/owner-dashboard",
  cashier: "/cashier-dashboard/sales",
  CASHIER: "/cashier-dashboard/sales",
  driver: "/driver-dashboard",
  DRIVER: "/driver-dashboard",
  technical: "/technical-dashboard",
  TECHNICAL: "/technical-dashboard",
}

export function getHomePathForRole(role: string | null): string | null {
  if (!role) return null

  if (ROLE_HOME_MAP[role]) {
    return ROLE_HOME_MAP[role]
  }

  const upper = role.toUpperCase()
  if (ROLE_HOME_MAP[upper]) {
    return ROLE_HOME_MAP[upper]
  }

  const lower = role.toLowerCase()
  if (ROLE_HOME_MAP[lower]) {
    return ROLE_HOME_MAP[lower]
  }

  return null
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem("authToken")
  } catch {
    return null
  }
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem("refreshToken")
  } catch {
    return null
  }
}

export function getStoredRole(): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem("userRole") ?? window.sessionStorage.getItem("userRole")
  } catch {
    return null
  }
}

export function getStoredAuth(): { token: string | null; refreshToken: string | null; role: string | null } {
  const token = getStoredToken()
  const refreshToken = getStoredRefreshToken()
  const role = getStoredRole()

  return { token, refreshToken, role }
}

export function isRoleAllowed(requiredRole: string, currentRole: string | null): boolean {
  if (!requiredRole || !currentRole) return false
  return requiredRole.toLowerCase() === currentRole.toLowerCase()
}
