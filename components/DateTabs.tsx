"use client";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
interface DateTabsProps {
  today: {
    routeString: string;
    displayString: string;
  };
  tomorrow: {
    routeString: string;
    displayString: string;
  };
  yesterday: {
    routeString: string;
    displayString: string;
  };
  selected?: boolean;
}

export default function DateTabs({
  today,
  tomorrow,
  yesterday,
  selected,
}: DateTabsProps) {
  const days = [yesterday, today, tomorrow];
  const router = useRouter();

  const handleClick = useCallback(() => {}, []);

  return (
    <div className="mb-3 flex w-full flex-wrap border-b border-zinc-800 p-4 lg:w-3/5">
      {days.length > 0 &&
        days.map((day) => {
          return (
            <button
              key={day.routeString}
              onClick={() => router.push(day.routeString)}
              className={`
              m-0
              w-1/3
              border-2
              border-r-0
              border-black
              p-2
              text-white
              hover:bg-green-700
              ${
                day === today
                  ? "bg-green-800 bg-gradient-to-b from-green-700"
                  : "bg-slate-800 bg-gradient-to-b from-slate-600"
              }`}
            >
              {day.displayString}
            </button>
          );
        })}
    </div>
  );
}
