"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Button } from "./ui/button"
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import dayjs, { Dayjs } from "dayjs"

export default function DateTabs() {
  const router = useRouter()
  const [date, setDate] = useState<Dayjs>(dayjs(new Date()))
  const today = date.format("YYYY-MM-DD")
  const yesterday = date.subtract(1, "day").format("YYYY-MM-DD")
  const tomorrow = date.add(1, "day").format("YYYY-MM-DD")
  const todayDisplay = date.format("ddd, MMM D")

  const plusDate = useCallback(() => {
    setDate((date) => date.add(1, "day"))
    router.push(`/pick/${tomorrow}`)
  }, [setDate, router, tomorrow])

  // const minusDate = useCallback(() => {
  //   setDate((date) => date.subtract(1, "day"))

  // }, [setDate, router, yesterday])

  const minusDate = () => {
    setDate((date) => date.subtract(1, "day"))
    router.push(`/pick/${yesterday}`)
  }

  return (
    <div className="mb-3 flex w-full flex-wrap items-center justify-center border-b border-zinc-800 p-1 text-center align-middle lg:w-3/5">
      <Button variant={"ghost"} className="w-1/5">
        <ArrowLeftIcon onClick={minusDate} />
      </Button>
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
          {/* <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          /> */}
        </PopoverContent>
      </Popover>
      <Button variant={"ghost"} className="w-1/5">
        <ArrowRightIcon onClick={plusDate} />
      </Button>
    </div>
  )
}
