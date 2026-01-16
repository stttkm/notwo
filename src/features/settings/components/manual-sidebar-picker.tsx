import type { AccentColor } from "../types/theme-colors";
import { ColorGrid } from "./color-grid";
import { CustomColorSwatch } from "./custom-color-swatch";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TailwindShade } from "../types/tailwind-palette";

interface ManualSidebarPickerProps {
  customColor: string;
  isCustom: boolean;
  selectedColor: AccentColor | null;
  selectedShade: TailwindShade | null;
  onCustomSelect: (color: string) => void;
  onColorSelect: (color: AccentColor, shade: TailwindShade) => void;
}

export function ManualSidebarPicker({
  customColor,
  isCustom,
  selectedColor,
  selectedShade,
  onCustomSelect,
  onColorSelect,
}: ManualSidebarPickerProps) {
  return (
    <div className="space-y-3">
      <CustomColorSwatch
        color={customColor}
        isSelected={isCustom}
        onSelect={onCustomSelect}
        variant="square"
        size="sm"
        label="Custom"
      />
      <ScrollArea className="h-80 rounded-md border p-2">
        <ColorGrid
          selectedColor={selectedColor}
          selectedShade={selectedShade}
          onSelect={onColorSelect}
        />
      </ScrollArea>
    </div>
  );
}
