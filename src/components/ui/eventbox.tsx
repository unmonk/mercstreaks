import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";
import { Pickbox } from "./pickbox";

interface EventboxProps {
  homeTeam: string;
  awayTeam: string;
  startTime: Date;
  endTime?: Date;
  id: string;
}

const Eventbox = (props: EventboxProps) => {
  const checkName = `check-${props.id}`;

  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-6 rounded-sm border border-gray-300 bg-white"></div>
        <div>
          <div className="text-lg font-semibold">{props.homeTeam}</div>
          <div className="text-xs text-gray-500">W8 - L0</div>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <div className="my-2 text-sm">{props.startTime.toLocaleString()}</div>
          <div className="text-xs">
            Projected Finish: {props.endTime?.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold">{props.awayTeam}</div>
          <div className="text-xs text-gray-500">W7 - L1</div>
        </div>
        <div className="h-6 w-6 rounded-sm border border-gray-300 bg-white"></div>
      </div>
    </div>
  );
};

export { Eventbox };
