"use client";
import React, { useState } from "react";
import { EventPickQuestion } from "@/components/events/EventPickQuestion";
import { EventPickHeader } from "@/components/events/EventPickHeader";
import { EventPickFooter } from "@/components/events/EventPickFooter";
import { Button } from "@/components/ui/button";

interface EventPickCardProps {
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

const EventPickCard = (props: EventPickCardProps) => {
  const [pick, setPick] = useState(PickType.NONE);

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
        pick !== PickType.NONE ? `opacity-90` : `opacity-100`
      } ${
        pick !== PickType.NONE
          ? "border-2 border-yellow-200 shadow-lg shadow-yellow-200 transition-shadow"
          : "border-gray-400"
      }`}
    >
      <EventPickHeader
        league={props.league}
        startTime={props.startTime}
        network={props.network}
      />

      <div className="pickcard rounded-lg bg-slate-50 p-2">
        <EventPickQuestion
          description={props.description}
          tempColor={tempColor}
          tempLabel={tempLabel}
          tempWidth={tempWidth}
        />

        <div className="mb-2 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Button
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
            </Button>
            <span className=" mx-1 text-base text-black ">
              {props.leftOption}
            </span>
          </div>
          <div className="hidden text-5xl md:block">🏈</div>
          <div className="flex items-center gap-1">
            <span className=" mx-1 text-base text-black">
              {props.rightOption}
            </span>
            <Button
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
            </Button>
          </div>
        </div>

        <EventPickFooter
          leftPickCount={props.leftPickCount}
          rightPickCount={props.rightPickCount}
        />
      </div>
    </div>
  );
};

export { EventPickCard };
