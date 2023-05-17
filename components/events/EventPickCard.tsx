"use client";
import React, { useState } from "react";
import { EventPickQuestion } from "@/components/events/EventPickQuestion";
import { EventPickHeader } from "@/components/events/EventPickHeader";
import { EventPickFooter } from "@/components/events/EventPickFooter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { PickButton } from "./PickButton";

interface EventPickCardProps {
  leftOption: string;
  leftPickCount?: number;
  rightOption: string;
  rightPickCount?: number;
  leftImage?: string;
  rightImage?: string;
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
    <Card className="mb-2 w-5/6 md:w-3/4">
      <CardHeader>
        <EventPickHeader
          league={props.league}
          startTime={props.startTime}
          network={props.network}
        />
      </CardHeader>
      <CardDescription>
        <EventPickQuestion
          description={props.description}
          tempColor={tempColor}
          tempLabel={tempLabel}
          tempWidth={tempWidth}
        />
      </CardDescription>
      <CardContent>
        <div className="grid grid-flow-row grid-cols-5 md:grid-cols-5">
          {/* Left */}
          <div className="col-span-1 flex justify-start">
            <PickButton pick={"LEFT"} handlePick={() => console.log("hello")} />
          </div>
          <div className="col-span-1 flex items-center justify-self-start ">
            {props.leftImage && (
              <Avatar>
                <AvatarImage src={props.leftImage} alt={props.leftOption} />
              </Avatar>
            )}
            <span className=" mx-1 px-1 text-base ">{props.leftOption}</span>
          </div>
          {/* Middle */}
          <div className="col-span-1"></div>
          {/* Right */}
          <div className="col-span-1 flex items-center justify-self-end">
            {props.rightImage && (
              <Avatar>
                <AvatarImage src={props.rightImage} alt={props.rightOption} />
              </Avatar>
            )}
            <span className="px-0.5">@</span>
            <span className=" mx-1 px-1 text-base "> {props.rightOption}</span>
          </div>
          <div className="col-span-1 justify-self-end">
            <PickButton
              pick={"RIGHT"}
              handlePick={() => console.log("hello")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { EventPickCard };
