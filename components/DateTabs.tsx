"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "@/components/ui/calendar"
import dayjs, { Dayjs } from "dayjs"
import Loading from "@/components/ui/loading"

export default function DateTabs() {
  const router = useRouter()
  const params = useParams()
  const [date, setDate] = useState<Dayjs>(
    dayjs(params.date ? params.date : new Date())
  )
  const [loading, setLoading] = useState(false)
  const yesterday = date.subtract(1, "day").format("YYYY-MM-DD")
  const tomorrow = date.add(1, "day").format("YYYY-MM-DD")
  const todayDisplay = date.format("ddd, MMM D")
  const minusDate = () => {
    setLoading(true)
    router.push(`/pick/${yesterday}`)
  }
  const plusDate = () => {
    setLoading(true)
    router.push(`/pick/${tomorrow}`)
  }
  const handleDateChange = (date: Date | undefined) => {
    setLoading(true)
    if (date) {
      router.push(`/pick/${dayjs(date).format("YYYY-MM-DD")}`)
    }
  }

  return (
    <div className="mb-3 flex w-full flex-wrap items-center justify-center border-b border-zinc-800 p-1 text-center align-middle lg:w-3/5">
      <Button variant={"ghost"} className="w-1/5" onClick={minusDate} > 
        {loading ? <Loading /> : <ArrowLeftIcon />}
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
          {loading ? (
            <Loading />
          ) : (
            <Calendar
              mode="single"
              selected={date.toDate()}
              onSelect={(e) => handleDateChange(e)}
              initialFocus
            />
          )}
        </PopoverContent>
      </Popover>
      <Button variant={"ghost"} className="w-1/5" onClick={plusDate}>
        {loading ? <Loading /> : <ArrowRightIcon  />}
      </Button>
    </div>
  )
}
