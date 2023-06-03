"use server"
import { League, PrismaClient } from "@prisma/client"
import { addHours } from "@/lib/utils"
import { getApiClient } from "@/lib/serverUtils"

type EventProps = {
  description: string
  startTime: Date
  endTime: Date
  league: League
  network: string
  leftOption: string
  leftImage: string | null
  rightOption: string
  rightImage: string | null
  gameId: string
}

async function getSchedule(
  year: number,
  writeToDb: boolean,
  prisma: PrismaClient,
  league: League
): Promise<{
  league: League
  totalFetched: number
  totalWritten: number
  time: number
  createdEvents: string[]
}> {
  performance.mark(`getSchedule${league}start`)

  const { api, timeOffset } = await getApiClient(league)
  const schedule = await api.getSchedule({ year: year })
  const events: EventProps[] = []
  const createdEvents: string[] = []

  //Generate Events
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
  //Write to DB
  if (writeToDb) {
    const eventPromises: Promise<any>[] = []
    events.forEach(async (event) => {
      const eventPromise = prisma.event.upsert({
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
      eventPromises.push(eventPromise)
    })
    const results = await Promise.all(eventPromises)
    results.forEach((result) => {
      if (result) createdEvents.push(result.id)
    })
  }

  performance.mark(`getSchedule${league}end`)
  const perf = performance.measure(
    `getSchedule${league}`,
    `getSchedule${league}start`,
    `getSchedule${league}end`
  )

  return {
    league: league,
    totalFetched: events.length,
    totalWritten: createdEvents.length,
    time: perf.duration,
    createdEvents: createdEvents,
  }
}

export { getSchedule }
