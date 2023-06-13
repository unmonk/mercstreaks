"use client"
import { Button } from "@/components/ui/button"
import { PickType, Status } from "@prisma/client"
import {
  CheckSquareIcon,
  HourglassIcon,
  FrownIcon,
  TrophyIcon,
} from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useToast } from "../ui/use-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage } from "../ui/avatar"
import useMediaQuery from "@/hooks/useMediaQuery"
interface PickButtonProps {
  side: PickType
  selected?: boolean
  disabled?: boolean
  eventId: string
  status?: Status
  image?: string
  winner?: PickType
  userPicked?: PickType
  deletePick?: (eventId: string) => Promise<void>
  selectPick?: (eventId: string, side: PickType) => Promise<void>
}

const PickButton = ({
  side,
  selected,
  disabled,
  status,
  eventId,
  image,
  winner,
  userPicked,
  deletePick,
  selectPick,
}: PickButtonProps) => {
  const router = useRouter()
  const isNotMobile = useMediaQuery("(min-width: 640px)")
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()
  const doPick = () => {
    if (!selectPick) return
    startTransition(async () => {
      await selectPick(eventId, side)
      router.refresh()
    })
  }

  const unSelectPick = () => {
    if (!deletePick) return
    startTransition(async () => {
      await deletePick(eventId)
      router.refresh()
    })
  }

  if (selected) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className={`aspect-square h-14 w-14 rounded-lg bg-slate-200 text-white dark:bg-gray-700 sm:h-20 sm:w-20
      ${status === Status.PENDING && "bg-yellow-500 dark:bg-yellow-500"}
      ${status === Status.ACTIVE && "bg-blue-500 dark:bg-blue-500"}
      ${status === Status.WIN && "bg-green-500 dark:bg-green-500"}
      ${status === Status.LOSS && "bg-red-500 dark:bg-red-500"}`}
            disabled={disabled ? true : winner ? true : false}
          >
            {status === Status.PENDING && <CheckSquareIcon />}
            {status === Status.LOSS && <FrownIcon />}
            {status === Status.WIN && <TrophyIcon />}
            {status === Status.ACTIVE &&
              ({ image } && !isNotMobile ? (
                <Avatar className="animate-spin">
                  <AvatarImage src={image} alt={side} />
                </Avatar>
              ) : (
                <HourglassIcon className="animate-spin" />
              ))}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will remove your active pick.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => unSelectPick()}
              className="bg-destructive"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Button
      className={`aspect-square h-14 w-14 rounded-lg bg-slate-200 text-white dark:bg-gray-700 sm:h-20 sm:w-20
      ${
        userPicked === side &&
        winner === side &&
        "bg-green-500 dark:bg-green-500"
      }
      ${userPicked === side && winner !== side && "bg-red-500 dark:bg-red-500"}
      `}
      onClick={() => doPick()}
      disabled={disabled ? true : winner ? true : false}
    >
      {userPicked === side && winner !== side && <FrownIcon size={14} />}
      {userPicked === side && winner === side && <TrophyIcon size={14} />}
      {image && !isNotMobile && (
        <Avatar>
          <AvatarImage src={image} alt={side} />
        </Avatar>
      )}
      {isPending && <HourglassIcon className="animate-spin" />}
    </Button>
  )
}

export { PickButton }
