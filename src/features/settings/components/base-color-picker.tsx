import { BASE_COLORS } from "../types/theme-colors";
import { BASE_COLOR_VALUES } from "../types/base-colors";
import type { BaseColor } from "../types/theme-colors";
import { ColorSwatch } from "./color-swatch";
import { applyBaseColor } from "../actions/apply-theme-colors";
import { baseColorAtom } from "../atoms/theme-atoms";
import { useAtom } from "jotai";

export function BaseColorPicker() {
  const [baseColor, setBaseColor] = useAtom(baseColorAtom);

  const handleSelect = (color: BaseColor) => {
    setBaseColor(color);
    applyBaseColor(color);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {BASE_COLORS.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          backgroundColor={BASE_COLOR_VALUES[color].background}
          isSelected={baseColor === color}
          onSelect={handleSelect}
          variant="square"
        />
      ))}
    </div>
  );
}
