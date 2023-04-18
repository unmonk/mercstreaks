import { useAuth } from "@clerk/nextjs";
import { procedureTypes } from "@trpc/server";
import React, { useState } from "react";

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
  const { userId, orgSlug, orgRole } = useAuth();
  console.log(orgSlug, orgRole);
  console.log(userId);
  const [pick, setPick] = useState(PickType.NONE);
  //setPick api.picks.create

  const handlePick = (picked: PickType) => {
    if (picked === pick) {
      //Do Unselect Pick
      setPick(PickType.NONE);
    } else {
      //Do Select Pick
      setPick(picked);
    }
    setPick((prevState) => (prevState === picked ? PickType.NONE : picked));
  };

  const tempWidth = props.temperature ?? "10" + "%";
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
        pick !== PickType.NONE ? `opacity-50` : `opacity-100`
      }`}
    >
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

      <div className=" rounded-lg bg-slate-50 p-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-gray-600">{props.description}</p>
          <div className="flex h-2 w-1/6 rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`${tempColor} h-1 rounded-full`}
              style={{ width: tempWidth }}
            ></div>
            {tempLabel}
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <button
              className="aspect-square h-16 w-16 rounded-lg bg-slate-300 bg-gradient-to-t from-slate-200 px-2 py-2 text-white  "
              onClick={() => handlePick(PickType.LEFT)}
            ></button>
            <span className=" mx-1 text-sm text-black ">
              {props.leftOption}
            </span>
          </div>
          <div className="hidden text-5xl md:block">🏈</div>
          <div className="flex items-center gap-1">
            <span className=" mx-1 text-sm text-black">
              {props.rightOption}
            </span>
            <button
              className="aspect-square h-16 w-16 rounded-lg bg-slate-300 bg-gradient-to-t from-slate-200 px-2 py-2 text-white"
              onClick={() => handlePick(PickType.RIGHT)}
            ></button>
          </div>
        </div>

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
