"use server"
import { db } from "@/lib/db"
import { ProfileFormValues } from "@/components/campaigns/CampaignForm"

async function upsertCampaign(values: ProfileFormValues, id?: string) {
  const startUTC = new Date(values.start)
  const endUTC = new Date(values.end)
  const campaign = {
    name: values.name,
    description: values.description,
    start: startUTC,
    end: endUTC,
    isActive: values.isActive,
    streakWinCount: Number(values.streakWinCount),
  }

  const result = await db.campaign.upsert({
    where: { id: id },
    update: campaign,
    create: campaign,
  })
  return result
}

export { upsertCampaign }
