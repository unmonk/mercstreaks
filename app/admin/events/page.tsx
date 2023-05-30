import EventsList from "@/components/events/EventsList"
import { EventDatePicker } from "@/components/events/EventDatePicker"
import EventModal from "@/components/events/EventModal"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EventsPage() {
  return (
    <div className="flex w-full">
      <div className="mr-4 mt-4">
        <EventsList />
      </div>
    </div>
  )
}
