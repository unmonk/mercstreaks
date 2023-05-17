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
  const todayDate = dayjs(dateId, "YYYY-MM-DD", true);

  if (!todayDate.isValid()) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">Invalid Date</div>
        <Link href={`/pick/${dayjs().format("YYYY-MM-DD")}`}> Go to Today</Link>
      </div>
    );
  }
  const tomorrowDate = todayDate.add(1, "day");
  const yesterdayDate = todayDate.subtract(1, "day");
  const today = {
    routeString: `/pick/${todayDate.format("YYYY-MM-DD")}`,
    displayString: todayDate.format("ddd, MMM D"),
  };
  const tomorrow = {
    routeString: `/pick/${tomorrowDate.format("YYYY-MM-DD")}`,
    displayString: tomorrowDate.format("ddd, MMM D"),
  };
  const yesterday = {
    routeString: `/pick/${yesterdayDate.format("YYYY-MM-DD")}`,
    displayString: yesterdayDate.format("ddd, MMM D"),
  };

  //get events by date

  return (
    <div className="flex flex-col items-center">
      <DateTabs today={today} tomorrow={tomorrow} yesterday={yesterday} />
      <Suspense fallback={<div>Loading...</div>}>
        <EventPickList />
      </Suspense>
    </div>
  );
}
