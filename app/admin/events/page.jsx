import EventsList from "@/components/events/EventsList";
import CreateEventForm from "@/components/events/CreateEventForm";
import { EventDatePicker } from "@/components/events/EventDatePicker";
import { buttonVariants } from "@/components/ui/button";
import EventModal from "@/components/events/EventModal";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <h1>Events</h1>
        <div className="mx-2 flex flex-row px-2">
          <EventDatePicker />
          <EventModal />
        </div>
      </div>

      <div className="flex flex-row">
        <EventsList />
      </div>
    </div>
  );
}
