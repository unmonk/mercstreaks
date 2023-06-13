import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import advancedFormat from "dayjs/plugin/advancedFormat"
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

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
        {dayjs(props.startTime).tz(props.timezone).format("h:mm A z")}
      </h3>
      <span className="text-sm">{props.network ?? "N/A"}</span>
    </div>
  )
}

export { EventPickHeader }
