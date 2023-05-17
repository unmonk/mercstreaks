import { Button } from "@/components/ui/button";
import { PickType } from "@prisma/client";

interface PickButtonProps {
  pick: PickType;
  handlePick: (picked: PickType) => void;
}

const PickButton = ({ pick, handlePick }: PickButtonProps) => {
  return (
    <Button
      className={`aspect-square h-16 w-16  rounded-lg bg-slate-200 px-2 py-2 text-white dark:bg-gray-700`}
      onClick={() => handlePick(PickType.LEFT)}
    >
      <div className="text-center text-4xl"></div>
    </Button>
  );
};

export { PickButton };
