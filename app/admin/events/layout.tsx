import EventsList from "@/components/admin/events/EventsList"
import { EventDatePicker } from "@/components/admin/events/EventDatePicker"
import EventModal from "@/components/admin/events/EventModal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function EventsLayout({
  children,
  pendingresults,
  recentlypopular,
}: {
  children: React.ReactNode
  pendingresults: React.ReactNode
  recentlypopular: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="col-span-2 row-span-2 md:col-span-1 md:row-span-1">
        {children}
      </div>
      <div className="col-span-2 row-span-2 md:col-span-1 md:row-span-1">
        {pendingresults}
      </div>
      <div className="col-span-2 row-span-2 md:col-span-1 md:row-span-1">
        tbd
      </div>
      <div className="col-span-2 row-span-2 md:col-span-1 md:row-span-1">
        {recentlypopular}
      </div>
    </div>
  )
}
