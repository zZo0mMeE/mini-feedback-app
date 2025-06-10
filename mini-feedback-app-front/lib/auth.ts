"use client"

import { jwtDecode } from "jwt-decode"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  email: string
  role: string
  _id: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

interface JwtPayload {
  email: string
  role: string
  _id: string
  exp: number
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token: string) => {
        try {
          const decoded = jwtDecode<JwtPayload>(token)

          // Check if token is expired
          const currentTime = Date.now() / 1000
          if (decoded.exp < currentTime) {
            set({ token: null, user: null, isAuthenticated: false })
            return
          }

          set({
            token,
            user: {
              email: decoded.email,
              role: decoded.role,
              _id: decoded._id,
            },
            isAuthenticated: true,
          })
        } catch (error) {
          console.error("Failed to decode token:", error)
          set({ token: null, user: null, isAuthenticated: false })
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
