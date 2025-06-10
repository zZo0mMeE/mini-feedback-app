import type React from "react"
import Header from "@/components/header"
import AuthGuard from "@/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">{children}</div>
      </div>
    </AuthGuard>
  )
}
