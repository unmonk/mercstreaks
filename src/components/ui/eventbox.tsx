import React, { useState } from "react";

interface EventboxProps {
  leftOption: string;
  rightOption: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  id: string;
}

enum PickType {
  LEFT,
  RIGHT,
  NONE,
}

const Eventbox = (props: EventboxProps) => {
  const [pick, setPick] = useState(PickType.NONE);
  //setPick api.picks.create

  const handlePick = (picked: PickType) => {
    setPick((prevState) => (prevState === picked ? PickType.NONE : picked));
  };

  return (
    <div
      className={`rounded-lg bg-gray-400 p-2 shadow-md dark:bg-gray-700 ${
        pick !== PickType.NONE ? `opacity-50` : `opacity-100`
      }`}
    >
      <div className="mx-1 mb-2 flex items-center justify-between rounded-lg bg-gray-400 dark:bg-gray-700">
        <h3 className="text-md font-semibold">NFL | 8:25 PM</h3>
        <span className="text-sm text-gray-600">NFL Network</span>
      </div>

      <div className=" rounded-lg bg-slate-50 p-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            NFL Who will WIN this matchup?
          </p>
          <div className="flex h-2 w-1/6 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1 rounded-full bg-red-600"
              style={{ width: "90%" }}
            ></div>
            Hot
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <button className="aspect-square h-16 w-16 rounded-lg bg-slate-300 bg-gradient-to-t from-slate-200 px-2 py-2 text-white "></button>
            <span className=" mx-1 text-sm text-black ">
              Chicago Bears (3-1)
            </span>
          </div>
          <div className="hidden text-5xl md:block">🏈</div>
          <div className="flex items-center gap-1">
            <span className=" mx-1 text-sm text-black">
              New Orleans Saints (1-3)
            </span>
            <button className="aspect-square h-16 w-16 rounded-lg bg-slate-300 bg-gradient-to-t from-slate-200 px-2 py-2 text-white"></button>
          </div>
        </div>

        <div className="flex items-center justify-between text-center">
          <span className="text-md font-semibold text-black">6.8%</span>
          <a href="#" className="text-green-800 underline">
            Preview
          </a>
          <span className="text-md font-semibold text-black">93.2%</span>
        </div>
      </div>
    </div>
  );
};

export { Eventbox };

{
  /* <div className="flex w-full justify-center bg-slate-200 text-xl">
        {props.description}
      </div>
      <div className="flex items-center justify-between">
        <input
          className="h-6 w-6 rounded-sm border border-gray-300 bg-white"
          checked={pick === PickType.LEFT}
          disabled={PickType.RIGHT === pick}
          type="checkbox"
          onChange={() => handlePick(PickType.LEFT)}
        />
        <div className="m-1">
          <div className="text-lg font-semibold">{props.leftOption}</div>
          <div className="text-xs text-gray-500">W8 - L0</div>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="my-2 text-sm">{props.startTime.toLocaleString()}</div>
          <div className="text-xs">Ends: {props.endTime?.toLocaleString()}</div>
        </div>
        <div className="m-1 text-black dark:text-white">
          <div className="text-lg font-semibold">{props.rightOption}</div>
          <div className="text-xs text-gray-500">W7 - L1</div>
        </div>
        <input
          className="m-1 h-6 w-6 rounded-sm border border-gray-300 bg-white"
          checked={pick === PickType.RIGHT}
          disabled={PickType.LEFT === pick}
          type="checkbox"
          onChange={() => handlePick(PickType.RIGHT)}
        />
      </div> */
}
