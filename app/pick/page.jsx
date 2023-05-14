import { DateTabs } from "@/components/DateTabs";
import EventPickList from "@/components/events/EventPickList";

export default function PicksPage() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    <div className="flex flex-col items-center">
      <DateTabs today={today} tomorrow={tomorrow} yesterday={yesterday} />
      <EventPickList />
    </div>
  );
}
