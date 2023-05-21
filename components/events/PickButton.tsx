"use client";
import { Button } from "@/components/ui/button";
import { PickType, Status } from "@prisma/client";
import {
  CheckSquareIcon,
  HourglassIcon,
  FrownIcon,
  TrophyIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useToast } from "../ui/use-toast";

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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "../ui/avatar";
import useMediaQuery from "@/hooks/useMediaQuery";
interface PickButtonProps {
  side: PickType;
  selected?: boolean;
  disabled?: boolean;
  eventId: string;
  status?: Status;
  image?: string;
}

const PickButton = ({
  side,
  selected,
  disabled,
  status,
  eventId,
  image,
}: PickButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isNotMobile = useMediaQuery("(min-width: 640px)");
  const { toast } = useToast();
  const isMutating = isFetching || isPending;

  const select = async (side: PickType) => {
    setIsFetching(true);
    const res = await fetch("/api/picks", {
      method: "POST",
      body: JSON.stringify({
        eventId: eventId,
        option: side,
      }),
    });
    setIsFetching(false);
    if (res.status === 400) {
      toast({
        title: "Pick Failed",
        variant: "destructive",
        description: "You already have an active pick.",
      });
      return;
    } else {
      startTransition(() => {
        router.refresh();
      });
    }
  };
  const unSelect = async () => {
    setIsFetching(true);
    const res = await fetch(`/api/picks/${eventId}`, {
      method: "DELETE",
    });
    setIsFetching(false);
    if (res.status === 400) {
      toast({
        title: "Failed to unselect pick",
        variant: "destructive",
      });
      return;
    } else {
      startTransition(() => {
        router.refresh();
      });
    }
  };

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
            disabled={disabled}
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
              onClick={() => unSelect()}
              className="bg-destructive"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      className={`aspect-square h-14 w-14 rounded-lg bg-slate-200 text-white dark:bg-gray-700 sm:h-20 sm:w-20`}
      onClick={() => select(side)}
      disabled={disabled}
    >
      {image && !isNotMobile && (
        <Avatar>
          <AvatarImage src={image} alt={side} />
        </Avatar>
      )}
      {isMutating && <HourglassIcon className="animate-spin" />}
    </Button>
  );
};

export { PickButton };
