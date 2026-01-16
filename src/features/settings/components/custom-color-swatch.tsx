import { Pipette } from "lucide-react";
import { cn } from "@/shared/utils/tailwind";

interface CustomColorSwatchProps {
  color: string;
  isSelected: boolean;
  onSelect: (color: string) => void;
  variant?: "circle" | "square";
  size?: "sm" | "md";
  label?: string;
}

export function CustomColorSwatch({
  color,
  isSelected,
  onSelect,
  variant = "circle",
  size = "md",
  label,
}: CustomColorSwatchProps) {
  const sizeClasses = size === "sm" ? "size-6" : "size-8";
  const iconClasses = size === "sm" ? "size-3.5" : "size-4";

  return (
    <div className="flex items-center gap-2">
      <label
        className={cn(
          "relative flex cursor-pointer items-center justify-center transition-transform hover:scale-110",
          "ring-offset-background focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2",
          sizeClasses,
          {
            "rounded-full border-2": variant === "circle",
            rounded: variant === "square",
            "border-foreground": variant === "circle" && isSelected,
            "border-muted-foreground/30": variant === "circle" && !isSelected,
            "ring-primary ring-2 ring-offset-1":
              variant === "square" && isSelected,
          },
        )}
        style={{ backgroundColor: color }}
        title="Custom color"
      >
        <Pipette className={cn(iconClasses, "text-white drop-shadow-md")} />
        <input
          type="color"
          value={color}
          onChange={(e) => onSelect(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      {label && <span className="text-muted-foreground text-xs">{label}</span>}
    </div>
  );
}
