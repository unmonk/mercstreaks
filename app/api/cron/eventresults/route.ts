import { getScoreboard } from "@/lib/sports/scoreboard"
import { getChicagoDate } from "@/lib/serverUtils"
import { League } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  const writeToDb = true
  //Date Handling
  const { year, month, day } = await getChicagoDate()
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
    const result = await getScoreboard(year, month, day, writeToDb, db, league)
    results.push(result)
  }
  const totalFetched = results.reduce((acc, cur) => acc + cur.totalFetched, 0)
  const totalUpdated = results.reduce((acc, cur) => acc + cur.totalUpdated, 0)
  const time = results.reduce((acc, cur) => acc + cur.time, 0)
  const response = {
    totalFetched,
    totalUpdated,
    time,
    results,
  }

  return NextResponse.json(response)
}
