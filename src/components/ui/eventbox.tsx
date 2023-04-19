import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import { EventHeader } from "./eventheader";
import { EventQuestion } from "./eventquestion";
import { EventFooter } from "./eventfooter";

interface EventboxProps {
  leftOption: string;
  leftPickCount?: number;
  rightOption: string;
  rightPickCount?: number;
  description: string;
  startTime: Date;
  endTime?: Date;
  network?: string;
  temperature: number;
  league?: string;
  id: string;
}

enum PickType {
  LEFT,
  RIGHT,
  NONE,
}

const Eventbox = (props: EventboxProps) => {
  const { userId } = useAuth();
  const [pick, setPick] = useState(PickType.NONE);
  //setPick api.picks.create

  const handlePick = (picked: PickType) => {
    setPick((prevState) => (prevState === picked ? PickType.NONE : picked));
    // if (picked === pick) {
    //   //Do Unselect Pick
    //   setPick(PickType.NONE);
    // } else {
    //   //Do Select Pick
    //   setPick(picked);
    //   console.log(picked, pick);
    // }
  };

  const tempWidth = props.temperature
    ? props.temperature.toString()
    : 10 ?? "10" + "%";
  const tempLabel =
    props.temperature >= 70 ? "Hot" : props.temperature >= 30 ? "Warm" : "Cold";
  const tempColor =
    props.temperature >= 70
      ? "bg-red-600"
      : props.temperature >= 30
      ? "bg-yellow-600"
      : "bg-blue-600";

  return (
    <div
      className={`rounded-lg bg-gray-400 p-2 shadow-md dark:bg-gray-700 ${
        pick !== PickType.NONE ? `opacity-80` : `opacity-100`
      } ${
        pick !== PickType.NONE
          ? " border-2 border-yellow-200 shadow-lg shadow-yellow-200 transition-shadow"
          : "border-gray-400"
      }`}
    >
      <EventHeader
        league={props.league}
        startTime={props.startTime}
        network={props.network}
      />

      <div className="pickcard rounded-lg bg-slate-50 p-2">
        <EventQuestion
          description={props.description}
          tempColor={tempColor}
          tempLabel={tempLabel}
          tempWidth={tempWidth}
        />

        <div className="mb-2 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <button
              disabled={pick === PickType.RIGHT}
              className={`${
                pick === PickType.LEFT
                  ? "bg-slate-500"
                  : "bg-slate-300 bg-gradient-to-t from-slate-200"
              } aspect-square h-16 w-16 rounded-lg  px-2 py-2 text-white`}
              onClick={() => handlePick(PickType.LEFT)}
            >
              <div className="text-center text-4xl">
                {pick === PickType.LEFT && "☑️"}
              </div>
            </button>
            <span className=" mx-1 text-base text-black ">
              {props.leftOption}
            </span>
          </div>
          <div className="hidden text-5xl md:block">🏈</div>
          <div className="flex items-center gap-1">
            <span className=" mx-1 text-base text-black">
              {props.rightOption}
            </span>
            <button
              disabled={pick === PickType.LEFT}
              className={`${
                pick === PickType.RIGHT
                  ? "bg-slate-500"
                  : "bg-slate-300 bg-gradient-to-t from-slate-200"
              } aspect-square h-16 w-16 rounded-lg  px-2 py-2 text-white`}
              onClick={() => handlePick(PickType.RIGHT)}
            >
              <div className="text-center text-4xl">
                {pick === PickType.RIGHT && "☑️"}
              </div>
            </button>
          </div>
        </div>

        <EventFooter
          leftPickCount={props.leftPickCount}
          rightPickCount={props.rightPickCount}
        />
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
