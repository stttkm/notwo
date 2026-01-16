import { accentColorAtom, isPresetAccent } from "../atoms/theme-atoms";

import { ACCENT_COLORS } from "../types/theme-colors";
import type { AccentColor } from "../types/theme-colors";
import { ColorSwatch } from "./color-swatch";
import { CustomColorSwatch } from "./custom-color-swatch";
import { getColor } from "../types/tailwind-palette";
import { useAtom } from "jotai";

export function AccentColorPicker() {
  const [accent, setAccent] = useAtom(accentColorAtom);

  const handlePresetSelect = (color: AccentColor) =>
    setAccent({ type: "preset", color });

  const handleCustomSelect = (color: string) =>
    setAccent({ type: "custom", color });

  const isPreset = isPresetAccent(accent);
  const customColor = isPreset ? "#3b82f6" : accent.color;

  return (
    <div className="flex flex-wrap gap-2">
      {ACCENT_COLORS.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          backgroundColor={getColor(color, 500)}
          isSelected={isPreset && accent.color === color}
          onSelect={handlePresetSelect}
        />
      ))}
      <CustomColorSwatch
        color={customColor}
        isSelected={!isPreset}
        onSelect={handleCustomSelect}
      />
    </div>
  );
}
