import { EventPickQuestion } from "@/components/events/EventPickQuestion"
import { EventPickHeader } from "@/components/events/EventPickHeader"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PickButton } from "./PickButton"
import { Separator } from "@/components/ui/separator"
import { PickType, Status } from "@prisma/client"
import Countdown from "../Countdown"
import { getActivePick, deletePick } from "@/app/(actions)/pickActions"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
dayjs.extend(timezone)

interface ActivePickProps {
  activePick: {
    event: {
      id: string
      description: string
      leftOption: string
      rightOption: string
      startTime: Date
      endTime: Date
      leftImage?: string
      rightImage?: string
      league: string
      network: string
      temperature: number
      leftPercentage: number
      rightPercentage: number
      leftResult?: string
      rightResult?: string
      winner?: PickType
      userPicked?: PickType
    }
    status: Status
    option: PickType
  }
  timezone: string
}

export default async function ActivePick({
  activePick,
  timezone,
}: ActivePickProps) {
  if (!activePick) return null
  const {
    league,
    startTime,
    network,
    description,
    leftOption,
    rightOption,
    leftImage,
    rightImage,
    endTime,
    id,
  } = activePick.event
  let { status, option } = activePick
  // if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
  //   status = Status.ACTIVE;
  // }
  const temperature = 0.5

  return (
    <>
      {activePick && (
        <>
          <h4>
            {status === Status.ACTIVE
              ? "Active"
              : status === "PENDING"
              ? "Pending"
              : "Last"}{" "}
            Pick
          </h4>
          <Card
            className={`
      mb-2 w-5/6 border-2 md:w-3/4 xl:w-1/2
      ${
        status === Status.PENDING &&
        "border-yellow-400 bg-slate-100 dark:border-yellow-500 dark:bg-slate-600"
      }
      ${
        status === Status.ACTIVE &&
        "border-blue-400 bg-slate-100 dark:border-blue-500 dark:bg-slate-600"
      }
      ${
        status === Status.WIN &&
        "border-green-400 bg-slate-100 dark:border-green-500 dark:bg-slate-600"
      }
      ${
        status === Status.LOSS &&
        "border-red-400 bg-slate-100 dark:border-red-500 dark:bg-slate-600"
      }
      `}
          >
            <CardHeader className="hidden md:block">
              <EventPickHeader
                league={league}
                startTime={startTime}
                network={network}
                timezone={timezone}
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
                    side={PickType.LEFT}
                    selected={option === PickType.LEFT}
                    disabled={status !== Status.PENDING}
                    eventId={id}
                    status={status}
                    image={leftImage ?? undefined}
                    deletePick={deletePick}
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
                    side={PickType.RIGHT}
                    selected={option === PickType.RIGHT}
                    disabled={status !== Status.PENDING}
                    eventId={id}
                    status={status}
                    image={rightImage ?? undefined}
                    deletePick={deletePick}
                  />
                </div>
              </div>
            </CardContent>
            <Separator className="mb-1" />
            <CardContent className="">
              <div className="grid grid-flow-row grid-cols-3 md:grid-cols-3">
                <div className="col-span-1 hidden justify-start md:flex">
                  {/* Pick Left */}
                  <p className="text-xs font-light sm:text-sm  md:text-base">
                    {/* {leftPercentage ? leftPercentage : 0}% */}
                  </p>
                </div>

                {/* Middle */}
                <div className="col-span-3 md:col-span-1">
                  <div className="flex flex-row text-xs">
                    {status === "PENDING" && (
                      <Countdown startTime={startTime} />
                    )}
                    {status === Status.ACTIVE && (
                      <span className="mx-2">
                        Estimated Completion:{" "}
                        {dayjs(endTime).tz(timezone).format("h:mm A")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pick Right */}
                <div className="col-span-1 hidden justify-self-end md:flex">
                  <p className="text-xs font-light sm:text-sm md:text-base">
                    {/* {rightPercentage ? rightPercentage : 0}% */}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
