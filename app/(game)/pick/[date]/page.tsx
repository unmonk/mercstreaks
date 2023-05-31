import DateTabs from "@/components/DateTabs"
import ActivePick from "@/components/events/ActivePick"
import PickListWrapper from "@/components/events/PickListWrapper"
import EventPickCardSkeleton from "@/components/skeletons/EventPickCardSkeleton"
import { Separator } from "@/components/ui/separator"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import dayjs from "dayjs"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default function Pick() {
  const { userId } = auth()
  if (!userId) {
    redirectToSignIn()
  }

  return (
    <div className="flex flex-col items-center">
      <DateTabs />
      <Suspense fallback={<EventPickCardSkeleton num={1} />}>
        <ActivePick />
      </Suspense>
      <Separator className="my-2" />
      <Suspense fallback={<EventPickCardSkeleton num={3} />}>
        {/* @ts-expect-error Server Component */}
        <PickListWrapper />
      </Suspense>
    </div>
  )
}
