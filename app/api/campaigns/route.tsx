import { NextResponse } from "next/server"

import { db } from "@/lib/db"

export async function GET(request: Request) {
  const campaigns = await db.campaign.findMany()
  return NextResponse.json(campaigns)
}

export async function POST(request: Request) {
  const body = await request.json()
  const campaign = await db.campaign.create({
    data: {
      name: body.name,
      description: body.description,
      start: body.start,
      end: body.end,
      isActive: false,
      streakWinCount: body.streakCountGoal,
    },
  })
  return NextResponse.json(campaign)
}
