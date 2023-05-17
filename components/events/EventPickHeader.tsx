interface EventPickHeaderProps {
  league?: string;
  startTime: Date;
  network?: string;
}

const EventPickHeader = (props: EventPickHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-md font-semibold">
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
