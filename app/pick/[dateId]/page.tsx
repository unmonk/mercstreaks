import DateTabs from "@/components/DateTabs";
import EventPickList from "@/components/events/EventPickList";
import { Suspense } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default async function PicksPage({
  params,
}: {
  params: { dateId: string };
}) {
  dayjs.extend(customParseFormat);
  const dateId = params.dateId;
  const today = dayjs(dateId, "YYYY-MM-DD", true);
  const todayString = today.format("ddd MMM D");
  const tomorrow = today.add(1, "day").format("ddd MMM D");
  const yesterday = today.subtract(1, "day").format("ddd MMM D");

  if (!today.isValid()) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">Invalid Date</div>
        <Link href={`/pick/${dayjs().format("YYYY-MM-DD")}`}> Go to Today</Link>
      </div>
    );
  }

  //get events by date

  return (
    <div className="flex flex-col items-center">
      <DateTabs today={todayString} tomorrow={tomorrow} yesterday={yesterday} />
      <Suspense fallback={<div>Loading...</div>}>
        <EventPickList />
      </Suspense>
    </div>
  );
}
