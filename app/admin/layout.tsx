import React from "react"
import Sidebar from "@/components/admin/Sidebar"
import { Navbar } from "@/components/Navbar"
import { auth } from "@clerk/nextjs"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { sessionClaims } = auth()
  const adminOrg = process.env.ADMIN_ORG as string
  const organizations = sessionClaims?.organizations as Record<string, string>
  if (organizations[adminOrg] !== "admin") {
    return <div>Not Authorized</div>
  }

  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-6">
        <Sidebar />
        <div className="lg:border-1 col-span-4 lg:col-span-5">{children}</div>
      </div>
    </>
  )
}
