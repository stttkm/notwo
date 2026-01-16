import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Check } from "lucide-react";
import { cn } from "@/shared/utils/tailwind";

interface ColorSwatchProps<T extends string> {
  color: T;
  backgroundColor: string;
  isSelected: boolean;
  onSelect: (color: T) => void;
  variant?: "circle" | "square";
  label?: string;
}

export function ColorSwatch<T extends string>({
  color,
  backgroundColor,
  isSelected,
  onSelect,
  variant = "circle",
  label,
}: ColorSwatchProps<T>) {
  const displayLabel = label ?? color.charAt(0).toUpperCase() + color.slice(1);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={() => onSelect(color)}
          className={cn(
            "relative size-8 cursor-pointer border-2 transition-transform hover:scale-110",
            {
              "rounded-full": variant === "circle",
              "rounded-md": variant === "square",
              "border-foreground": isSelected,
              "border-muted-foreground/30": !isSelected,
            },
          )}
          style={{ backgroundColor }}
          aria-label={`Select ${color} color`}
        >
          {isSelected && (
            <Check className="absolute inset-0 m-auto size-4 text-white drop-shadow-md" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="capitalize">{displayLabel}</TooltipContent>
    </Tooltip>
  );
}
