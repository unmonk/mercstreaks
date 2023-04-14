import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";

interface PickboxProps {
  teamName: string;
  id: string;
  left: boolean;
  right?: boolean;
}

const Pickbox = (props: PickboxProps) => {
  const checkName = `check-${props.id}`;

  return (
    <form className="flex items-center">
      <CheckboxPrimitive.Root
        id={checkName}
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded bg-slate-200 dark:bg-slate-400",
          "radix-state-checked:bg-purple-600 radix-state-unchecked:bg-red-900 dark:radix-state-unchecked:bg-red-900",
          "focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
        )}
      >
        {!!props.right && (
          <LabelPrimitive.Label
            htmlFor={checkName}
            className="mr-3 select-none text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {props.teamName}
          </LabelPrimitive.Label>
        )}
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="self-center text-green-700" />
        </CheckboxPrimitive.Indicator>
        {!!props.left && (
          <LabelPrimitive.Label
            htmlFor={checkName}
            className="ml-3 select-none text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {props.teamName}
          </LabelPrimitive.Label>
        )}
      </CheckboxPrimitive.Root>
    </form>
  );
};

export { Pickbox };
