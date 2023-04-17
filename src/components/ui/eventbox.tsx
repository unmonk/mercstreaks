import React, { useState } from "react";

interface EventboxProps {
  leftOption: string;
  rightOption: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  id: string;
}

enum PickOption {
  LEFT,
  RIGHT,
  NONE,
}

const Eventbox = (props: EventboxProps) => {
  const [pick, setPick] = useState(PickOption.NONE);
  //setPick api.picks.create

  const handlePick = (picked: PickOption) => {
    setPick((prevState) => (prevState === picked ? PickOption.NONE : picked));
  };

  return (
    <div
      className={`rounded-lg bg-gray-100 p-4 dark:bg-gray-700 ${
        pick !== PickOption.NONE ? `opacity-50` : `opacity-100`
      }`}
    >
      <div className="flex justify-center bg-slate-200 text-xl">
        {props.description}
      </div>
      <div className="flex items-center justify-between">
        <input
          className="m-2 h-6 w-6 rounded-sm border border-gray-300 bg-white"
          checked={pick === PickOption.LEFT}
          disabled={PickOption.RIGHT === pick}
          type="checkbox"
          onChange={() => handlePick(PickOption.LEFT)}
        />
        <div className="m-1">
          <div className="text-lg font-semibold">{props.leftOption}</div>
          <div className="text-xs text-gray-500">W8 - L0</div>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="my-2 text-sm">{props.startTime.toLocaleString()}</div>
          <div className="text-xs">
            Projected Finish: {props.endTime?.toLocaleString()}
          </div>
        </div>
        <div className="m-1 text-black dark:text-white">
          <div className="text-lg font-semibold">{props.rightOption}</div>
          <div className="text-xs text-gray-500">W7 - L1</div>
        </div>
        <input
          className="m-2 h-6 w-6 rounded-sm border border-gray-300 bg-white"
          checked={pick === PickOption.RIGHT}
          disabled={PickOption.LEFT === pick}
          type="checkbox"
          onChange={() => handlePick(PickOption.RIGHT)}
        />
      </div>
    </div>
  );
};

export { Eventbox };
