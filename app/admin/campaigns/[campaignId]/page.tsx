import CampaignForm from "@/components/campaigns/CampaignForm"
import { db } from "@/lib/db"
import React from "react"

async function fetchCampaign(id: string) {
  if (id === "new") return
  const campaign = await db.campaign.findUnique({
    where: { id },
  })
  return campaign
}

export default async function SingleCampaignPage({
  params,
}: {
  params: { campaignId: string }
}) {
  const campaign = await fetchCampaign(params.campaignId)
  return (
    <>
      <div>
        <CampaignForm campaign={campaign ?? undefined} />
      </div>
    </>
  )
}
