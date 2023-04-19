interface EventHeaderProps {
  league?: string;
  startTime: Date;
  network?: string;
}

const EventHeader = (props: EventHeaderProps) => {
  return (
    <div className="mx-1 mb-2 flex items-center justify-between rounded-lg bg-gray-400 dark:bg-gray-700">
      <h3 className="text-md font-semibold">
        {props.league ?? "OTHER"} |{" "}
        {props.startTime.toLocaleTimeString([], {
          timeZoneName: "short",
          hour: "numeric",
          minute: "numeric",
        })}
      </h3>
      <span className="text-sm text-gray-600">{props.network ?? "N/A"}</span>
    </div>
  );
};

export { EventHeader };
