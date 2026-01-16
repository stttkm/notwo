import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/shared/utils/tailwind";
import { getColor, type TailwindShade } from "../types/tailwind-palette";

interface ColorGridCellProps {
  colorName: string;
  shade: TailwindShade;
  isSelected: boolean;
  onSelect: () => void;
}

export function ColorGridCell({
  colorName,
  shade,
  isSelected,
  onSelect,
}: ColorGridCellProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onSelect}
          className={cn(
            "relative size-5.5 shrink-0 rounded-[3px] transition-transform duration-100",
            "hover:z-10 hover:scale-125",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
            {
              "ring-primary ring-offset-background ring-2 ring-offset-1":
                isSelected,
            },
          )}
          style={{ backgroundColor: getColor(colorName, shade) }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/10 ring-inset" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs">
        {colorName}-{shade}
      </TooltipContent>
    </Tooltip>
  );
}
