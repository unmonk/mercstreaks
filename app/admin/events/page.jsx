import EventsList from "@/components/events/EventsList";
import CreateEventForm from "@/components/CreateEventForm";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="flex  flex-col items-center">
      <div className="flex flex-row items-center justify-between">
        <h1>Events</h1>
        <Link
          href={"/admin/events/create"}
          className={buttonVariants({ variant: "outline" })}
        >
          +Create
        </Link>
      </div>
      <div className="flex flex-row">
        <EventsList />
        <CreateEventForm />
      </div>
    </div>
  );
}
