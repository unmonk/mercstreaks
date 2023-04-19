interface EventFooterProps {
  leftPickCount?: number;
  rightPickCount?: number;
}

const EventFooter = (props: EventFooterProps) => {
  return (
    <div className="flex items-center justify-between text-center">
      <span className="text-md font-semibold text-black">
        {props.leftPickCount ?? "50"}%
      </span>
      <a href="#" className="text-green-800 underline">
        Preview
      </a>
      <span className="text-md font-semibold text-black">
        {props.rightPickCount ?? "50"}%
      </span>
    </div>
  );
};

export { EventFooter };
