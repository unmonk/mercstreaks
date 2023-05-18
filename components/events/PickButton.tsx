import { Button } from "@/components/ui/button";
import { PickType } from "@prisma/client";
import { CheckCheckIcon, CheckSquareIcon } from "lucide-react";
interface PickButtonProps {
  pick: PickType;
  handlePick: (picked: PickType) => void;
}

const PickButton = ({ pick, handlePick }: PickButtonProps) => {
  return (
    <Button
      className={`aspect-square h-16 w-16 rounded-lg bg-slate-200 text-white dark:bg-gray-700 sm:h-20 sm:w-20`}
      onClick={() => handlePick(PickType.LEFT)}
    >
      <CheckSquareIcon />
    </Button>
  );
};

export { PickButton };
