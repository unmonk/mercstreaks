import React from "react"
import CampaignBar from "@/components/CampaignBar"
import { Navbar } from "@/components/Navbar"

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <CampaignBar />
      {children}
    </>
  )
}
