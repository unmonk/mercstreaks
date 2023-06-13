"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "@/components/ui/calendar"
import dayjs from "dayjs"

import Link from "next/link"

export default function DateTabs({ date }: { date: string | null }) {
  const router = useRouter()
  const dateParam = date ? dayjs(date) : dayjs()

  const yesterday = dateParam.subtract(1, "day").format("YYYY-MM-DD")
  const tomorrow = dateParam.add(1, "day").format("YYYY-MM-DD")
  const todayDisplay = dateParam.format("ddd, MMM D")

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      router.push(`/pick?date=${dayjs(date).format("YYYY-MM-DD")}`)
    }
  }

  return (
    <div className="mb-3 flex w-full flex-wrap items-center justify-center border-b border-zinc-800 p-1 text-center align-middle lg:w-3/5">
      <Link
        href={`/pick?date=${yesterday}`}
        className="inline-flex h-10 w-1/5 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowLeftIcon />
      </Link>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={"w-3/5 justify-center text-center text-lg font-normal"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {todayDisplay}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateParam.toDate()}
            onSelect={(e) => handleDateChange(e)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Link
        href={`/pick?date=${tomorrow}`}
        className="inline-flex h-10 w-1/5 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <ArrowRightIcon />
      </Link>
    </div>
  )
}
