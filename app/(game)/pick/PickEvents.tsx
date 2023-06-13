import { PickType } from "@prisma/client"
import { EventPickCard } from "@/components/events/EventPickCard"

interface EventProps {
  id: string
  description: string
  leftOption: string
  rightOption: string
  startTime: string
  endTime: string
  leftImage?: string
  rightImage?: string
  league: string
  network: string
  temperature: number
  leftPercentage: number
  rightPercentage: number
  leftResult?: string
  rightResult?: string
  winner?: PickType
  userPicked?: PickType

  picks: {
    id: string
    userId: string
    option: string
  }[]
  _count: {
    picks: number
  }
}

interface PickEventsProps {
  events: EventProps[]
  userId: string | null
}

export default async function PickEvents({ events, userId }: PickEventsProps) {
  if (!events) return null
  if (!userId) return null

  const mappedEvents = events
    .filter((event) => {
      for (const pick of event.picks) {
        if (event.winner && pick.userId === userId) {
          event.userPicked = pick.option as PickType
          return true
        } else if (pick.userId === userId) {
          return false
        }
      }
      return true
    })
    .map((event) => {
      let leftPickCount = 0
      let rightPickCount = 0
      for (let i = 0; i < event.picks.length; i++) {
        if (event.picks[i].option === "LEFT") {
          leftPickCount++
        } else if (event.picks[i].option === "RIGHT") {
          rightPickCount++
        }
      }
      const leftPercentage = Math.round(
        (leftPickCount / event._count.picks) * 100
      )
      const rightPercentage = Math.round(
        (rightPickCount / event._count.picks) * 100
      )
      const temperature = event._count.picks <= 100 ? event._count.picks : 100

      return (
        // @ts-expect-error Server Component
        <EventPickCard
          key={event.id}
          id={event.id}
          description={event.description}
          leftOption={event.leftOption}
          rightOption={event.rightOption}
          startTime={event.startTime}
          endTime={event.endTime}
          leftImage={event.leftImage ?? undefined}
          rightImage={event.rightImage ?? undefined}
          league={event.league}
          network={event.network}
          temperature={temperature}
          leftPercentage={leftPercentage}
          rightPercentage={rightPercentage}
          leftResult={event.leftResult}
          rightResult={event.rightResult}
          winner={event.winner}
          userPicked={event.userPicked}
        />
      )
    })

  return (
    <>
      {mappedEvents.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">No More Events Today</h1>
          <p className="text-lg font-medium">Check back tomorrow!</p>
        </div>
      )}
      {mappedEvents.length > 0 && <h4>{mappedEvents.length} Events</h4>}

      {mappedEvents}
    </>
  )
}
