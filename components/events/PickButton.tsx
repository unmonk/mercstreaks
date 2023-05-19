import { Button } from "@/components/ui/button";
import { PickType } from "@prisma/client";
import {
  CheckCheckIcon,
  CheckSquareIcon,
  HourglassIcon,
  FrownIcon,
  TrophyIcon,
} from "lucide-react";
interface PickButtonProps {
  pick: PickType;
  handlePick: (picked: PickType) => void;
  selected?: boolean;
  disabled?: boolean;
  type?: "active" | "pending" | "won" | "lost";
}

const PickButton = ({
  pick,
  handlePick,
  selected,
  disabled,
  type,
}: PickButtonProps) => {
  return (
    <Button
      className={`aspect-square h-14 w-14 rounded-lg bg-slate-200 text-white dark:bg-gray-700 sm:h-20 sm:w-20
      ${type === "pending" && selected && "bg-yellow-500 dark:bg-yellow-500"}
      ${type === "active" && selected && "bg-blue-500 dark:bg-blue-500"}
      ${type === "won" && selected && "bg-green-500 dark:bg-green-500"}
      ${type === "lost" && selected && "bg-red-500 dark:bg-red-500"}`}
      onClick={() => handlePick(PickType.LEFT)}
      disabled={disabled}
    >
      {selected && type === "pending" && <CheckSquareIcon />}
      {selected && type === "lost" && <FrownIcon />}
      {selected && type === "won" && <TrophyIcon />}
      {selected && type === "active" && (
        <HourglassIcon className="animate-spin" />
      )}
      {/* <CheckSquareIcon /> */}
    </Button>
  );
};

export { PickButton };
