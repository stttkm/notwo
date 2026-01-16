import { TAILWIND_SHADES, type TailwindShade } from "../types/tailwind-palette";
import type { AccentColor } from "../types/theme-colors";
import { ColorGridCell } from "./color-grid-cell";

interface ColorGridRowProps {
  colorName: string;
  selectedColor: AccentColor | null;
  selectedShade: TailwindShade | null;
  onSelect: (color: AccentColor, shade: TailwindShade) => void;
}

export function ColorGridRow({
  colorName,
  selectedColor,
  selectedShade,
  onSelect,
}: ColorGridRowProps) {
  return (
    <div className="flex items-center">
      <span className="text-muted-foreground w-16 shrink-0 truncate pr-2 text-right text-[10px]">
        {colorName}
      </span>
      <div className="flex gap-0.5">
        {TAILWIND_SHADES.map((shade) => (
          <ColorGridCell
            key={shade}
            colorName={colorName}
            shade={shade}
            isSelected={selectedColor === colorName && selectedShade === shade}
            onSelect={() => onSelect(colorName as AccentColor, shade)}
          />
        ))}
      </div>
    </div>
  );
}
