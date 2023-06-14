import { EventPickQuestion } from "@/components/events/EventPickQuestion"
import { EventPickHeader } from "@/components/events/EventPickHeader"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PickButton } from "./PickButton"
import { PickType } from "@prisma/client"
import { selectPick } from "@/app/(actions)/pickActions"
interface EventPickCardProps {
  leftOption: string
  leftPercentage?: number
  rightOption: string
  rightPercentage?: number
  leftImage?: string
  rightImage?: string
  leftResult?: string
  rightResult?: string
  winner?: PickType
  description: string
  startTime: string
  endTime?: string
  network?: string
  temperature: number
  league?: string
  id: string
  userPicked?: PickType
  timezone?: string
}

const EventPickCard = async (props: EventPickCardProps) => {
  const genResultOrPercentage = (side: PickType) => {
    let renderString: string | number = ""
    if (side === PickType.LEFT) {
      if (props.winner) {
        if (props.winner === PickType.LEFT) {
          renderString = props.leftResult ? props.leftResult : "W"
        } else {
          renderString = props.leftResult ? props.leftResult : "L"
        }
      } else {
        renderString = (props.leftPercentage ? props.leftPercentage : 0) + "%"
      }
    } else {
      if (props.winner) {
        if (props.winner === PickType.RIGHT) {
          renderString = props.rightResult ? props.rightResult : "W"
        } else {
          renderString = props.rightResult ? props.rightResult : "L"
        }
      } else {
        renderString = (props.rightPercentage ? props.rightPercentage : 0) + "%"
      }
    }
    return renderString
  }
  return (
    <Card
      className={`mb-2 w-5/6 md:w-3/4 xl:w-1/2
    ${
      props.userPicked && props.winner === props.userPicked
        ? "border border-green-400 dark:border-green-900"
        : props.userPicked && props.winner !== props.userPicked
        ? "border border-red-400 dark:border-red-900"
        : ""
    }
    `}
    >
      <CardHeader>
        <EventPickHeader
          league={props.league}
          startTime={new Date(props.startTime)}
          network={props.network}
          timezone={props.timezone}
        />
      </CardHeader>
      {/* Row Above Teams / Buttons */}
      <CardContent>
        <EventPickQuestion
          description={props.description}
          temperature={props.temperature}
          showTemperature={props.winner ? false : true}
        />
      </CardContent>

      <div className="grid grid-flow-row grid-cols-5 px-3 md:grid-cols-5">
        <div className="col-span-1 flex justify-self-start">
          {/* Pick Left */}
          <PickButton
            eventId={props.id}
            side={PickType.LEFT}
            image={props.leftImage}
            winner={props.winner}
            userPicked={props.userPicked}
            selectPick={selectPick}
          />
        </div>
        {/* Left */}
        <div
          className={`col-span-1 mx-2 flex w-full items-center justify-self-start p-2
          ${
            props.userPicked && props.winner === PickType.LEFT
              ? "rounded-lg bg-green-100 dark:bg-green-900"
              : props.winner === PickType.LEFT
              ? "rounded-lg bg-accent "
              : ""
          }
          `}
        >
          <div className="hidden sm:block">
            {props.leftImage && (
              <Avatar>
                <AvatarImage src={props.leftImage} alt={props.leftOption} />
              </Avatar>
            )}
          </div>
          <span className="mx-1 text-xs sm:text-sm md:text-base ">
            {props.leftOption}
          </span>
        </div>
        {/* Middle */}
        <div className="col-span-1 md:block"></div>
        {/* Right */}
        <div
          className={`col-span-1 mx-2 flex w-full items-center justify-self-end p-2
             ${
               props.userPicked && props.winner === PickType.RIGHT
                 ? "rounded-lg bg-green-100 dark:bg-green-900"
                 : props.winner === PickType.RIGHT
                 ? "rounded-lg bg-accent "
                 : ""
             }
          `}
        >
          <div className="hidden sm:block">
            {props.rightImage && (
              <Avatar>
                <AvatarImage src={props.rightImage} alt={props.rightOption} />
              </Avatar>
            )}
          </div>

          <span className="ml-1 mr-4 text-xs sm:text-sm md:text-base">
            <span className="pr-1 text-xs font-light text-primary">@</span>
            {props.rightOption}
          </span>
        </div>
        {/* Pick Right */}
        <div className="col-span-1 justify-self-end">
          <PickButton
            side={PickType.RIGHT}
            eventId={props.id}
            image={props.rightImage}
            winner={props.winner}
            userPicked={props.userPicked}
            selectPick={selectPick}
          />
        </div>
      </div>

      {/* Row Beneath Teams / Buttons */}
      <CardContent>
        <div className="grid grid-flow-row grid-cols-5 md:grid-cols-5">
          <div className="col-span-1 flex justify-start">
            {/* Pick Left */}
            <p className="text-xs font-light sm:text-sm  md:text-base">
              {genResultOrPercentage(PickType.LEFT)}
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
              {genResultOrPercentage(PickType.RIGHT)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { EventPickCard }
