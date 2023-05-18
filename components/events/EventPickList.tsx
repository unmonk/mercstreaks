import { db } from "@/lib/db";
import { EventPickCard } from "@/components/events/EventPickCard";
import { auth } from "@clerk/nextjs";

export default (async function EventPickList() {
  const events = await db.event.findMany({
    orderBy: {
      startTime: "desc",
    },
    include: {
      picks: true,
      _count: {
        select: { picks: true },
      },
    },
    take: 15,
  });

  const { userId } = auth();

  const mapEvents = events.map((event) => {
    let leftPickCount = 0;
    let rightPickCount = 0;
    for (let i = 0; i < event.picks.length; i++) {
      if (event.picks[i].option === "LEFT") {
        leftPickCount++;
      } else if (event.picks[i].option === "RIGHT") {
        rightPickCount++;
      }
    }
    const leftPercentage = Math.round(
      (leftPickCount / event._count.picks) * 100
    );
    const rightPercentage = Math.round(
      (rightPickCount / event._count.picks) * 100
    );
    const temperature = event._count.picks <= 100 ? event._count.picks : 100;

    return (
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
        temperature={temperature}
        leftPercentage={leftPercentage}
        rightPercentage={rightPercentage}
      />
    );
  });

  //get number of left picks from event.picks

  return <>{mapEvents}</>;
} as unknown as (props: any) => JSX.Element);
