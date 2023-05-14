interface EventPickQuestionProps {
  description: string;
  tempColor: string;
  tempWidth: string | number;
  tempLabel: string;
}

const EventPickQuestion = (props: EventPickQuestionProps) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      <p className="text-black">{props.description}</p>
      <div className="flex h-2 w-1/6 rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`${props.tempColor} h-1 rounded-full`}
          style={{ width: props.tempWidth }}
        ></div>
        {props.tempLabel}
      </div>
    </div>
  );
};

export { EventPickQuestion };
