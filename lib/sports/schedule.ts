import { League, PrismaClient } from "@prisma/client"
const { nfl, nba, nhl, cfb, mbb } = require("sportsdataverse")
import { addHours } from "@/lib/utils"

function getApiClient(league: League): { api: any; timeOffset: number } {
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
    default:
      throw new Error("Invalid league")
  }
}

async function getSchedule(
  year: number,
  writeToDb: boolean,
  prisma: PrismaClient,
  league: League
) {
  console.time(`getSchedule${league}`)
  const { api, timeOffset } = getApiClient(league)
  const schedule = await api.getSchedule({ year: year })
  const events = []
  for (const day in schedule) {
    if (!schedule[day].games) continue
    for (const game of schedule[day].games) {
      const data = game.competitions[0]
      const competitors = data.competitors
      const gameTime = game.date
      const question: string = `Who will win ${game.name}?`
      const gameId: string = game.id
      const network: string = data.geoBroadcasts[0]?.media?.shortName || "N/A"
      let leftImage = null
      let rightImage = null
      let rightOption = "home"
      let leftOption = "away"
      competitors.forEach((competitor: any) => {
        const displayName = competitor.team.displayName
        const teamImage = competitor.team.logo
        if (competitor.homeAway === "home") {
          rightOption = displayName
          rightImage = teamImage
        } else {
          leftOption = displayName
          leftImage = teamImage
        }
      })

      const event = {
        description: question,
        startTime: new Date(gameTime),
        endTime: addHours(new Date(gameTime), timeOffset),
        league: league,
        network: network,
        leftOption: leftOption,
        leftImage: leftImage,
        rightOption: rightOption,
        rightImage: rightImage,
        gameId: gameId,
      }
      events.push(event)
    }
  }
  if (writeToDb) {
    events.forEach(async (event) => {
      await prisma.event.upsert({
        where: {
          description_gameId: {
            description: event.description,
            gameId: event.gameId,
          },
        },
        update: {
          startTime: event.startTime,
          endTime: event.endTime,
          network: event.network,
          leftImage: event.leftImage,
          leftOption: event.leftOption,
          rightOption: event.rightOption,
          rightImage: event.rightImage,
        },
        create: event,
      })
    })
  }
  console.timeEnd(`getSchedule${league}`)
}

export { getSchedule }
