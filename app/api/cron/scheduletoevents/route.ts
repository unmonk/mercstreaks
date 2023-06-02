import { NextResponse } from "next/server"
import { getSchedule } from "@/lib/sports"

import { db } from "@/lib/db"
import { League } from "@prisma/client"

export async function GET(request: Request) {
  const writeToDb = true
  const year = new Date().getFullYear()
  const LEAGUES = [
    League.NFL,
    League.NBA,
    League.NHL,
    League.CFB,
    League.MBB,
    League.WBB,
    League.WNBA,
  ]
  const results = []
  for (const league of LEAGUES) {
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

  return NextResponse.json(response)
}
