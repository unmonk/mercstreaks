import ActivePick from "@/components/events/ActivePick"

import { auth, redirectToSignIn } from "@clerk/nextjs"
import DateTabs from "@/components/DateTabs"
import { Separator } from "@/components/ui/separator"
import PickEvents from "./PickEvents"
import { getActivePick, getEvents } from "@/app/(actions)/pickActions"
import { headers } from "next/headers"

interface PickPageProps {
  searchParams: {
    date: string | undefined
  }
}

export default async function Pick({ searchParams }: PickPageProps) {
  const { userId } = auth()
  const headersList = headers()
  const timezone = headersList.get("x-vercel-ip-timezone") || "America/New_York"
  if (!userId) {
    redirectToSignIn()
  }
  const dateParam = searchParams.date ?? null
  const [activePick, todaysEvents] = await Promise.all([
    getActivePick(userId),
    getEvents(dateParam),
  ])

  return (
    <div className="flex flex-col items-center">
      <DateTabs date={dateParam} timezone={timezone} />
      <Separator className="my-2" />
      {/* @ts-expect-error Server Component */}
      <ActivePick activePick={activePick} timezone={timezone} />
      {/* @ts-expect-error Server Component */}
      <PickEvents events={todaysEvents} userId={userId} timezone={timezone} />
    </div>
  )
}

export const revalidate = 0
