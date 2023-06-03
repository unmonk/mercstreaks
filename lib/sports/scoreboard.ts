"use server"
import { League, PickType, PrismaClient, Event, Status } from "@prisma/client"
import { getApiClient } from "@/lib/serverUtils"

async function getScoreboard(
  year: number,
  month: string,
  day: string,
  writeToDb: boolean,
  prisma: PrismaClient,
  league: League
): Promise<{
  league: League
  totalFetched: number
  totalUpdated: number
  time: number
  updatedEvents: string[]
  totalPicksUpdated: number
  updatedPicks: string[]
}> {
  performance.mark(`getScoreboard${league}start`)

  const { api } = await getApiClient(league)
  const scoreboard = await api.getScoreboard({ year, month, day })
  const events = scoreboard.events
  const finishedEvents: Partial<Event>[] = []
  const updatedEvents: string[] = []
  const updatedPicks: string[] = []

  for (const event of events) {
    //check status is final
    const status = event.status?.type?.name
    if (status !== "STATUS_FINAL") continue
    const gameId = event.id
    const competitors = event.competitions[0].competitors
    let awayScore = null
    let homeScore = null
    let winner = null
    for (const competitor of competitors) {
      //Away = Left Side
      if (competitor.homeAway === "away") {
        awayScore = competitor.score
        if (competitor.winner) {
          winner = PickType.LEFT
        }
      }
      //Home = Right Side
      if (competitor.homeAway === "home") {
        homeScore = competitor.score
        if (competitor.winner) {
          winner = PickType.RIGHT
        }
      }
    }
    const eventToUpdate: Partial<Event> = {
      gameId: gameId,
      leftResult: awayScore,
      rightResult: homeScore,
      endTime: new Date(),
      winner: winner,
    }
    finishedEvents.push(eventToUpdate)
  }
  //write to db
  if (writeToDb) {
    const eventPromises: Promise<any>[] = []
    const pickPromises: Promise<any>[] = []
    for (const ev of finishedEvents) {
      const picks = await prisma.pick.findMany({
        where: {
          event: {
            gameId: ev.gameId,
          },
        },
      })
      picks.forEach((pick) => {
        const pickPromise = prisma.pick.update({
          where: {
            id: pick.id,
          },
          data: {
            status: ev.winner === pick.option ? Status.WIN : Status.LOSS,
            isActive: false,
          },
        })
        pickPromises.push(pickPromise)
      })

      const eventPromise = prisma.event.updateMany({
        where: {
          gameId: ev.gameId,
        },
        data: {
          leftResult: ev.leftResult,
          rightResult: ev.rightResult,
          endTime: ev.endTime,
          winner: ev.winner,
        },
      })
      eventPromises.push(eventPromise)
    }

    const results = await Promise.all(eventPromises)
    const pickResults = await Promise.all(pickPromises)

    results.forEach((result) => {
      if (result) updatedEvents.push(result)
    })
    pickResults.forEach((result) => {
      if (result) updatedPicks.push(result.id)
    })
  }

  performance.mark(`getScoreboard${league}end`)
  const perf = performance.measure(
    `getScoreboard${league}`,
    `getScoreboard${league}start`,
    `getScoreboard${league}end`
  )

  return {
    league: league,
    totalFetched: events.length,
    totalUpdated: updatedEvents.length,
    time: perf.duration,
    updatedEvents: updatedEvents,
    totalPicksUpdated: updatedPicks.length,
    updatedPicks: updatedPicks,
  }
}

export { getScoreboard }
