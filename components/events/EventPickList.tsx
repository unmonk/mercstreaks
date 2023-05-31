import { EventPickCard } from "@/components/events/EventPickCard"
import { useAuth } from "@clerk/nextjs"

async function fetchEvents(date: string, useParam: boolean = false) {
  const res = await fetch(`/api/events/${useParam ? date : ""}`, {
    next: {
      revalidate: 60,
    },
    cache: "no-cache",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }
  return res.json()
}

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
  picks: {
    id: string
    userId: string
    option: string
  }[]
  _count: {
    picks: number
  }
}

interface EventPickListProps {
  date: string
  useParam?: boolean
}

export default async function EventPickList({
  date,
  useParam,
}: EventPickListProps) {
  const { userId } = useAuth()
  const events: EventProps[] = await fetchEvents(date, useParam)

  const mappedEvents = events
    .filter((event) => {
      for (const pick of event.picks) {
        if (pick.userId === userId) {
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
        <>
          {/* @ts-expect-error Server Component */}
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
          />
        </>
      )
    })

  //get number of left picks from event.picks

  return (
    <>
      {mappedEvents.length > 0 ? (
        mappedEvents
      ) : (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">No Remaining Events</h1>
          </div>
        </>
      )}
    </>
  )
}
