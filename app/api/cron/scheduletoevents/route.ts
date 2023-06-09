import { NextRequest, NextResponse } from "next/server"
import { getSchedule } from "@/lib/sports"

import { db } from "@/lib/db"
import { League } from "@prisma/client"

export async function POST(request: NextRequest) {
  const cronSecret = request.headers.get("x-merc-cron-secret")
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ status: 401, message: "Unauthorized" })
  }
  
  const writeToDb = true
  const year = new Date().getFullYear()
  const ESPNLEAGUES = [
    League.NFL,
    League.NBA,
    League.NHL,
    League.CFB,
    League.MBB,
    League.WBB,
    League.WNBA,
  ]
  const results = []
  for (const league of ESPNLEAGUES) {
    const result = await getSchedule(year, writeToDb, db, league)
    results.push(result)
  }
  const totalFetched = results.reduce((acc, cur) => acc + cur.totalFetched, 0)
  const totalWritten = results.reduce((acc, cur) => acc + cur.totalWritten, 0)
  const time = results.reduce((acc, cur) => acc + cur.time, 0)
  const response = {
    totalFetched,
    totalWritten,
    time,
    results,
  }

  return NextResponse.json(response, { status: 200 })
}
