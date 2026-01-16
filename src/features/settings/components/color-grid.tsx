import {
  TAILWIND_PALETTE,
  TAILWIND_SHADES,
  type TailwindShade,
} from "../types/tailwind-palette";
import type { AccentColor } from "../types/theme-colors";
import { ColorGridRow } from "./color-grid-row";

interface ColorGridProps {
  selectedColor: AccentColor | null;
  selectedShade: TailwindShade | null;
  onSelect: (color: AccentColor, shade: TailwindShade) => void;
}

export function ColorGrid({
  selectedColor,
  selectedShade,
  onSelect,
}: ColorGridProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex">
        <div className="w-16 shrink-0" />
        {TAILWIND_SHADES.map((shade) => (
          <div
            key={shade}
            className="text-muted-foreground flex w-6 shrink-0 justify-center text-[9px]"
          >
            {shade}
          </div>
        ))}
      </div>

      {Object.keys(TAILWIND_PALETTE).map((colorName) => (
        <ColorGridRow
          key={colorName}
          colorName={colorName}
          selectedColor={selectedColor}
          selectedShade={selectedShade}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
