/**
 * Actions to apply theme colors (accent and base) to CSS variables.
 */
import type { BaseColor } from "../types/theme-colors";
import type { AccentColorState, SidebarColorState } from "../atoms/theme-atoms";
import { BASE_COLOR_VALUES } from "../types/base-colors";
import {
  ALL_THEME_PROPS,
  BASE_COLOR_PROP_MAP,
  BASE_PROPS,
} from "../types/theme-props";
import {
  getColor,
  getForegroundForShade,
  type TailwindShade,
} from "../types/tailwind-palette";
import { getContrastForeground } from "../utils/color-utils";

function setProperty(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

function removeProperty(name: string) {
  document.documentElement.style.removeProperty(name);
}

function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}

const clearProperties = (props: string[]) => props.forEach(removeProperty);
export const clearThemeColors = () => clearProperties(ALL_THEME_PROPS);

/** Apply accent color to CSS variables. */
export function applyAccentColor(accent: AccentColorState) {
  if (accent.type === "custom") {
    setProperty("--primary", accent.color);
    setProperty("--primary-foreground", getContrastForeground(accent.color));
    return;
  }
  const shade: TailwindShade = isDarkMode() ? 400 : 500;
  setProperty("--primary", getColor(accent.color, shade));
  setProperty("--primary-foreground", getForegroundForShade(shade));
}

/** Apply base color to CSS variables (dark mode only). */
export function applyBaseColor(base: BaseColor) {
  if (!isDarkMode()) {
    clearProperties(BASE_PROPS);
    return;
  }
  const colors = BASE_COLOR_VALUES[base];
  Object.entries(colors).forEach(([key, value]) => {
    const prop = BASE_COLOR_PROP_MAP[key];
    if (prop) setProperty(prop, value);
  });
}

/** Apply sidebar background color. */
export function applySidebarColor(
  accent: AccentColorState,
  sidebar: SidebarColorState,
) {
  // Custom sidebar color
  if (typeof sidebar === "object" && sidebar.type === "custom") {
    setProperty("--zen-layer-0", sidebar.color);
    setProperty("--sidebar-foreground", getContrastForeground(sidebar.color));
    return;
  }

  // Auto: derive from accent color
  if (sidebar === "auto") {
    if (accent.type === "custom") {
      setProperty("--zen-layer-0", accent.color);
      setProperty("--sidebar-foreground", getContrastForeground(accent.color));
    } else {
      const autoShade: TailwindShade = isDarkMode() ? 950 : 200;
      setProperty("--zen-layer-0", getColor(accent.color, autoShade));
      setProperty("--sidebar-foreground", getForegroundForShade(autoShade));
    }
    return;
  }

  // Preset sidebar color with shade
  setProperty("--zen-layer-0", getColor(sidebar.color, sidebar.shade));
  setProperty("--sidebar-foreground", getForegroundForShade(sidebar.shade));
}

/** Apply all theme colors. */
export function applyThemeColors(
  accent: AccentColorState,
  base: BaseColor,
  sidebar: SidebarColorState,
) {
  applyAccentColor(accent);
  applyBaseColor(base);
  applySidebarColor(accent, sidebar);
}
