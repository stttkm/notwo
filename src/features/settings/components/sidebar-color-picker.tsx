import {
  accentColorAtom,
  isAutoSidebar,
  isPresetAccent,
  isPresetSidebar,
  sidebarColorAtom,
} from "../atoms/theme-atoms";
import { useAtom, useAtomValue } from "jotai";

import type { AccentColor } from "../types/theme-colors";
import { Label } from "@/components/ui/label";
import { ManualSidebarPicker } from "./manual-sidebar-picker";
import { Switch } from "@/components/ui/switch";
import type { TailwindShade } from "../types/tailwind-palette";
import { getColor } from "../types/tailwind-palette";
import { useTranslation } from "react-i18next";

export function SidebarColorPicker() {
  const { t } = useTranslation();
  const accent = useAtomValue(accentColorAtom);
  const [sidebar, setSidebar] = useAtom(sidebarColorAtom);

  const isAuto = isAutoSidebar(sidebar);
  const isPreset = isPresetSidebar(sidebar);

  // Derive default color from accent
  const defaultColor = isPresetAccent(accent) ? accent.color : "blue";
  const defaultCustomColor = isPresetAccent(accent)
    ? getColor(accent.color, 500)
    : accent.color;

  const handleAutoToggle = (checked: boolean) => {
    if (checked) {
      setSidebar("auto");
    } else {
      setSidebar({ type: "preset", color: defaultColor, shade: 950 });
    }
  };

  const handleColorSelect = (color: AccentColor, shade: TailwindShade) => {
    setSidebar({ type: "preset", color, shade });
  };

  const handleCustomSelect = (color: string) => {
    setSidebar({ type: "custom", color });
  };

  const customColor = isPreset || isAuto ? defaultCustomColor : sidebar.color;
  const selectedColor = isPreset ? sidebar.color : null;
  const selectedShade = isPreset ? sidebar.shade : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="auto-sidebar" className="text-sm font-normal">
          {t("autoSidebarColor")}
        </Label>
        <Switch
          id="auto-sidebar"
          checked={isAuto}
          onCheckedChange={handleAutoToggle}
        />
      </div>

      {!isAuto && (
        <ManualSidebarPicker
          customColor={customColor}
          isCustom={!isPreset}
          selectedColor={selectedColor}
          selectedShade={selectedShade}
          onCustomSelect={handleCustomSelect}
          onColorSelect={handleColorSelect}
        />
      )}
    </div>
  );
}
