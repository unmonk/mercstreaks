import React from "react"
import { EventPickQuestion } from "@/components/events/EventPickQuestion"
import { EventPickHeader } from "@/components/events/EventPickHeader"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PickButton } from "./PickButton"
import { PickType } from "@prisma/client"
import dayjs from "dayjs"

interface EventPickCardProps {
  leftOption: string
  leftPercentage?: number
  rightOption: string
  rightPercentage?: number
  leftImage?: string
  rightImage?: string
  description: string
  startTime: string
  endTime?: string
  network?: string
  temperature: number
  league?: string
  id: string
}

const EventPickCard = async (props: EventPickCardProps) => {
  return (
    <Card className="mb-2 w-5/6 md:w-3/4 xl:w-1/2">
      <CardHeader>
        <EventPickHeader
          league={props.league}
          startTime={new Date(props.startTime)}
          network={props.network}
        />
      </CardHeader>
      {/* Row Above Teams / Buttons */}
      <CardContent>
        <EventPickQuestion
          description={props.description}
          temperature={props.temperature}
          showTemperature
        />
      </CardContent>
      <CardContent>
        <div className="grid grid-flow-row grid-cols-5 md:grid-cols-5">
          <div className="col-span-1 flex justify-self-start">
            {/* Pick Left */}
            <PickButton
              eventId={props.id}
              side={PickType.LEFT}
              image={props.leftImage}
            />
          </div>
          {/* Left */}
          <div className="col-span-1 flex items-center justify-self-start ">
            <div className="hidden sm:block">
              {props.leftImage && (
                <Avatar>
                  <AvatarImage src={props.leftImage} alt={props.leftOption} />
                </Avatar>
              )}
            </div>
            <span className="mx-1 px-1 text-xs sm:text-sm md:text-base ">
              {props.leftOption}
            </span>
          </div>
          {/* Middle */}
          <div className="col-span-1 md:block"></div>
          {/* Right */}
          <div className="col-span-1 flex items-center justify-self-end">
            <div className="hidden sm:block">
              {props.rightImage && (
                <Avatar>
                  <AvatarImage src={props.rightImage} alt={props.rightOption} />
                </Avatar>
              )}
            </div>

            <span className="mx-1 px-1 text-xs sm:text-sm md:text-base">
              <span className="pr-0.5 text-xs font-light text-primary">@</span>
              {props.rightOption}
            </span>
          </div>
          {/* Pick Right */}
          <div className="col-span-1 justify-self-end">
            <PickButton
              side={PickType.RIGHT}
              eventId={props.id}
              image={props.rightImage}
            />
          </div>
        </div>
      </CardContent>
      {/* Row Beneath Teams / Buttons */}
      <CardContent>
        <div className="grid grid-flow-row grid-cols-5 md:grid-cols-5">
          <div className="col-span-1 flex justify-start">
            {/* Pick Left */}
            <p className="text-xs font-light sm:text-sm  md:text-base">
              {props.leftPercentage ? props.leftPercentage : 0}%
            </p>
          </div>
          {/* Left */}
          <div className="col-span-1 justify-self-center">
            <div className="hidden flex-row gap-1 sm:flex"></div>
          </div>
          {/* Middle */}
          <div className="col-span-1"></div>
          {/* Right */}
          <div className="col-span-1 justify-self-center">
            <div className="hidden flex-row gap-1 sm:flex "></div>
          </div>
          {/* Pick Right */}
          <div className="col-span-1 justify-self-end">
            <p className="text-xs font-light sm:text-sm md:text-base">
              {props.rightPercentage ? props.rightPercentage : 0}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { EventPickCard }
