interface EventPickHeaderProps {
  league?: string;
  startTime: Date;
  network?: string;
  active?: boolean;
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
        {props.startTime.toLocaleTimeString([], {
          timeZoneName: "short",
          hour: "numeric",
          minute: "numeric",
        })}
      </h3>
      <span className="text-sm">{props.network ?? "N/A"}</span>
    </div>
  );
};

export { EventPickHeader };
