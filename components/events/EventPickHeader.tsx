import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
dayjs.extend(timezone)

interface EventPickHeaderProps {
  league?: string
  startTime: Date
  network?: string
  active?: boolean
  timezone?: string
}

const EventPickHeader = (props: EventPickHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3
        className={`
        text-sm font-semibold
       `}
      >
        {props.league ?? "OTHER"} |{" "}
        {dayjs(props.startTime).tz(props.timezone).format("h:mm A ")}
      </h3>
      <span className="text-sm">{props.network ?? "N/A"}</span>
    </div>
  )
}

export { EventPickHeader }
