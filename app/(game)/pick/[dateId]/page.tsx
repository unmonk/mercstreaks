import DateTabs from "@/components/DateTabs"
import EventPickList from "@/components/events/EventPickList"
import { Suspense } from "react"
import dayjs from "dayjs"
import Link from "next/link"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { Separator } from "@/components/ui/separator"
import ActivePick from "@/components/events/ActivePick"

export default async function PicksPage({
  params,
}: {
  params: { dateId: string }
}) {
  const tomorrowDate = dayjs(params.dateId, "YYYY-MM-DD").add(1, "day")

  return (
    <div className="flex flex-col items-center">
      <DateTabs />
      <Suspense fallback={<div>Loading..</div>}>
        <ActivePick />
      </Suspense>
      <Separator className="my-2" />
      <Suspense fallback={<div>Loading..</div>}>
        <EventPickList tomorrow={tomorrowDate} />
      </Suspense>
    </div>
  )
}
