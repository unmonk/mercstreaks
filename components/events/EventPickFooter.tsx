interface EventPickFooterProps {
  leftPickCount?: number;
  rightPickCount?: number;
}

const EventPickFooter = (props: EventPickFooterProps) => {
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

export { EventPickFooter };
