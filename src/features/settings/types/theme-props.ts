/**
 * CSS variable name mappings for theme colors.
 */

// Map base color value keys to CSS variable names
export const BASE_COLOR_PROP_MAP: Record<string, string> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  popover: "--popover",
  popoverForeground: "--popover-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
};

export const BASE_PROPS = Object.values(BASE_COLOR_PROP_MAP);

export const ALL_THEME_PROPS = [
  "--primary",
  "--primary-foreground",
  "--zen-layer-0",
  "--sidebar-foreground",
  ...BASE_PROPS,
  "--sidebar",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
  "--sidebar-border",
  "--sidebar-ring",
];
