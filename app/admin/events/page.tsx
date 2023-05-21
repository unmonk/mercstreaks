import EventsList from "@/components/events/EventsList";
import { EventDatePicker } from "@/components/events/EventDatePicker";
import EventModal from "@/components/events/EventModal";

export default function EventsPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <h1>Events</h1>
        <div className="mx-2 flex flex-row px-2">
          <EventDatePicker />
          <EventModal
            modalType="create"
            onComplete={() => console.log("test")}
          />
        </div>
      </div>

      <div className="flex flex-row">
        <EventsList />
      </div>
    </div>
  );
}
