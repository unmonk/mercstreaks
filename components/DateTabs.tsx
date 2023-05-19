"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

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
  const [date, setDate] = useState<Date>();

  return (
    <div className="mb-3 flex w-full flex-wrap items-center justify-center border-b border-zinc-800 p-1 text-center align-middle lg:w-3/5">
      <Button variant={"ghost"} className="w-1/5">
        <ArrowLeftIcon onClick={() => router.push(yesterday.routeString)} />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={"w-3/5 justify-center text-center text-lg font-normal"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {today.displayString}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button variant={"ghost"} className="w-1/5">
        <ArrowRightIcon onClick={() => router.push(tomorrow.routeString)} />
      </Button>
    </div>
  );
}
