import React from "react"
import Sidebar from "@/components/admin/Sidebar"
import { Navbar } from "@/components/Navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
