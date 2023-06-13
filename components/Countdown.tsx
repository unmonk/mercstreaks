"use client"
import { useCountdown } from "@/hooks/useCountdown"

function Countdown({ startTime }: { startTime: Date }) {
  const [days, hours, minutes, seconds] = useCountdown(startTime)
  return (
    <div className="flex w-full justify-between">
      <p className="mx-1 min-w-fit">Locks in:</p>

      <span className="mx-1 min-w-fit" hidden={days == 0}>
        {days} days
      </span>
      <span className="mx-1 min-w-fit" hidden={hours == 0 && days == 0}>
        {hours} hours
      </span>
      <span
        className="mx-1 min-w-fit"
        hidden={minutes == 0 && hours == 0 && days == 0}
      >
        {minutes} mins
      </span>
      <span className="mx-1 min-w-fit" hidden={hours > 0}>
        {seconds} secs
      </span>
    </div>
  )
}

export default Countdown
