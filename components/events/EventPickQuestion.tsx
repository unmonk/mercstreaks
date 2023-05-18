interface EventPickQuestionProps {
  description: string;
  temperature: number;
}

const EventPickQuestion = (props: EventPickQuestionProps) => {
  const tempLabel =
    props.temperature >= 70 ? "Hot" : props.temperature >= 30 ? "Warm" : "Cold";
  const tempColor =
    props.temperature >= 70
      ? "bg-red-600"
      : props.temperature >= 30
      ? "bg-yellow-600"
      : "bg-blue-600";
  const width =
    props.temperature >= 70
      ? "w-4/5"
      : props.temperature >= 30
      ? "w-1/2"
      : "w-1/6";
  return (
    <div className="flex flex-row justify-between">
      <p className="pr-1 text-base font-bold">{props.description}</p>
      <div className="h-2 w-1/6 rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`
        ${tempColor} 
        h-2
        ${width}
          rounded-full`}
        />
        {tempLabel}
      </div>
    </div>
  );
};

export { EventPickQuestion };
