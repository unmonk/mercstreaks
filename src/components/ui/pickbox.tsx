import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";

interface PickboxProps {
  teamName: string;
}

const Pickbox = (props: PickboxProps) => {
  return (
    <form className="flex items-center">
      <CheckboxPrimitive.Root
        id="c1"
        defaultChecked
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded bg-slate-200 dark:bg-slate-400",
          "radix-state-checked:bg-purple-600 radix-state-unchecked:bg-red-900 dark:radix-state-unchecked:bg-red-900",
          "focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
        )}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="text- h-4 w-4 self-center text-green-700" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <LabelPrimitive.Label
        htmlFor="c1"
        className="ml-3 select-none text-sm font-medium text-gray-900 dark:text-gray-100"
      >
        {props.teamName}
      </LabelPrimitive.Label>
    </form>
  );
};

export { Pickbox };
