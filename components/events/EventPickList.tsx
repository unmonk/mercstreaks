import { db } from "@/lib/db";
import { EventPickCard } from "@/components/events/EventPickCard";

export default (async function EventPickList() {
  const events = await db.event.findMany({
    orderBy: {
      startTime: "desc",
    },
    take: 15,
  });

  return (
    <>
      {events.map((event) => (
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
          temperature={40}
        />
      ))}
    </>
  );
} as unknown as (props: any) => JSX.Element);
