"use client";
import React, { useState } from "react";
import { EventPickQuestion } from "@/components/events/EventPickQuestion";
import { EventPickHeader } from "@/components/events/EventPickHeader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCountdown } from "@/hooks/useCountdown";
import { PickButton } from "./PickButton";
import { Badge } from "../ui/badge";
import { BoneIcon, CrownIcon, DumbbellIcon, MedalIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

enum PickType {
  LEFT,
  RIGHT,
  NONE,
}

interface ActivePickCardProps {
  type: "active" | "pending" | "won" | "lost";
}

const ActivePickCard = ({ type }: ActivePickCardProps) => {
  const league = "nfl";
  const startTime = new Date();
  const network = "ESPN";
  const description = "Who will win the game?";
  const temperature = 0.5;
  const leftOption = "Team A";
  const rightOption = "Team B";
  const leftImage = "https://i.imgur.com/8XZQq3j.png";
  const rightImage = "https://i.imgur.com/8XZQq3j.png";
  const leftPercentage = 0.5;
  const rightPercentage = 0.5;
  const endTime = new Date("05/22/2023");
  const id = "1234";
  const [pick, setPick] = useState(PickType.NONE);
  const [days, hours, minutes, seconds] = useCountdown(endTime);

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

  return (
    <>
      <h4>
        {type === "active" ? "Active" : type === "pending" ? "Pending" : "Last"}{" "}
        Pick
      </h4>
      <Card
        className={`
      mb-2 w-5/6 border-2 md:w-3/4 xl:w-1/2
      ${
        type === "pending" &&
        "border-yellow-400 bg-slate-100 dark:border-yellow-500 dark:bg-slate-600"
      }
      ${
        type === "active" &&
        "border-blue-400 bg-slate-100 dark:border-blue-500 dark:bg-slate-600"
      }
      ${
        type === "won" &&
        "border-green-400 bg-slate-100 dark:border-green-500 dark:bg-slate-600"
      }
      ${
        type === "lost" &&
        "border-red-400 bg-slate-100 dark:border-red-500 dark:bg-slate-600"
      }
      `}
      >
        <CardHeader className="hidden md:block">
          <EventPickHeader
            league={league}
            startTime={startTime}
            network={network}
          />
        </CardHeader>
        <Separator className="mb-1" />
        <CardContent>
          <EventPickQuestion
            description={description}
            temperature={temperature}
          />
        </CardContent>
        <CardContent>
          <div className="grid grid-flow-row grid-cols-5 md:grid-cols-5">
            <div className="col-span-1 flex justify-self-start">
              {/* Pick Left */}
              <PickButton
                pick={"LEFT"}
                handlePick={() => console.log("left")}
                type={type}
              />
            </div>
            {/* Left */}
            <div className="col-span-1 mx-1 flex items-center justify-self-start">
              <div className="hidden sm:block">
                {leftImage && (
                  <Avatar>
                    <AvatarImage src={leftImage} alt={leftOption} />
                  </Avatar>
                )}
              </div>
              <span className="mx-1 px-1 text-xs sm:text-sm md:text-base ">
                {leftOption}
              </span>
            </div>
            {/* Middle */}
            <div className="col-span-1 md:block"></div>
            {/* Right */}
            <div className="col-span-1 mx-1 flex items-center justify-self-end">
              <div className="hidden sm:block">
                {rightImage && (
                  <Avatar>
                    <AvatarImage src={rightImage} alt={rightOption} />
                  </Avatar>
                )}
              </div>

              <span className="mx-1 px-1 text-xs sm:text-sm md:text-base">
                <span className="pr-0.5 text-xs font-light text-primary">
                  @
                </span>
                {rightOption}
              </span>
            </div>
            {/* Pick Right */}
            <div className="col-span-1 justify-self-end">
              <PickButton
                pick={"RIGHT"}
                handlePick={() => console.log("right")}
                selected
                disabled={false}
                type={type}
              />
            </div>
          </div>
        </CardContent>
        <Separator className="mb-1" />
        <CardContent className="hidden md:block">
          <div className="grid grid-flow-row grid-cols-3 md:grid-cols-3">
            <div className="col-span-1 flex justify-start">
              {/* Pick Left */}
              <p className="text-xs font-light sm:text-sm  md:text-base">
                {leftPercentage ? leftPercentage : 0}%
              </p>
            </div>

            {/* Middle */}
            <div className="col-span-1">
              <div className="flex flex-row text-xs">
                {type === "pending" && (
                  <>
                    <span className="mx-2">Locks in:</span>
                    <span className="mx-2" hidden={days == 0}>
                      {days} days
                    </span>
                    <span className="mx-2" hidden={hours == 0}>
                      {hours} hours
                    </span>
                    <span className="mx-2" hidden={minutes == 0}>
                      {minutes} minutes
                    </span>
                    <span className="mx-2" hidden={hours > 0 || seconds == 0}>
                      {seconds} seconds
                    </span>
                  </>
                )}
                {type === "active" && (
                  <span className="mx-2">
                    Estimated Completion: {endTime.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>

            {/* Pick Right */}
            <div className="col-span-1 justify-self-end">
              <p className="text-xs font-light sm:text-sm md:text-base">
                {rightPercentage ? rightPercentage : 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export { ActivePickCard };
