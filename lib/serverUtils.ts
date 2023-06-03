"use server"
import { League } from "@prisma/client"
const { nfl, nba, nhl, cfb, mbb, wbb, wnba } = require("sportsdataverse")
export async function getChicagoDate(): Promise<{
  year: number
  month: string
  day: string
}> {
  let chicago_datetime_str = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  })
  let date_chicago = new Date(chicago_datetime_str)
  let year = date_chicago.getFullYear()
  let month = ("0" + (date_chicago.getMonth() + 1)).slice(-2)
  let day = ("0" + date_chicago.getDate()).slice(-2)

  return { year, month, day }
}

export async function getApiClient(
  league: League
): Promise<{ api: any; timeOffset: number }> {
  switch (league) {
    case League.NFL:
      return { api: nfl, timeOffset: 3 }
    case League.NBA:
      return { api: nba, timeOffset: 3 }
    case League.NHL:
      return { api: nhl, timeOffset: 2 }
    case League.CFB:
      return { api: cfb, timeOffset: 3 }
    case League.MBB:
      return { api: mbb, timeOffset: 3 }
    case League.WBB:
      return { api: wbb, timeOffset: 3 }
    case League.WNBA:
      return { api: wnba, timeOffset: 3 }
    default:
      throw new Error("Invalid league")
  }
}
