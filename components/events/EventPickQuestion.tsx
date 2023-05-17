interface EventPickQuestionProps {
  description: string;
  tempColor: string;
  tempWidth: string | number;
  tempLabel: string;
}

const EventPickQuestion = (props: EventPickQuestionProps) => {
  return (
    <div className="mb-2 flex flex-row justify-between px-6">
      <p className="text-base font-bold">{props.description}</p>
      <div className="h-2 w-1/6 rounded-full bg-gray-200 dark:bg-gray-700">
        <div className={`${props.tempColor} h-2 rounded-full`}></div>
        {props.tempLabel}
      </div>
    </div>
  );
};

export { EventPickQuestion };
