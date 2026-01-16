/**
 * Base color (neutral) definitions for dark mode.
 * These affect background, card, muted, accent, border, etc.
 */

import type { BaseColor } from "./theme-colors";

interface BaseColorValues {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
}

/**
 * OKLCH values for base colors in dark mode.
 * Light mode uses standard white/black regardless of base color.
 */
export const BASE_COLOR_VALUES: Record<BaseColor, BaseColorValues> = {
  slate: {
    background: "oklch(0.13 0.028 261)",
    foreground: "oklch(0.985 0.002 248)",
    card: "oklch(0.21 0.034 265)",
    cardForeground: "oklch(0.985 0.002 248)",
    popover: "oklch(0.21 0.034 265)",
    popoverForeground: "oklch(0.985 0.002 248)",
    muted: "oklch(0.278 0.033 257)",
    mutedForeground: "oklch(0.707 0.022 261)",
    accent: "oklch(0.278 0.033 257)",
    accentForeground: "oklch(0.985 0.002 248)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.551 0.027 264)",
  },
  gray: {
    background: "oklch(0.13 0.006 265)",
    foreground: "oklch(0.985 0.002 248)",
    card: "oklch(0.21 0.006 265)",
    cardForeground: "oklch(0.985 0.002 248)",
    popover: "oklch(0.21 0.006 265)",
    popoverForeground: "oklch(0.985 0.002 248)",
    muted: "oklch(0.27 0.006 265)",
    mutedForeground: "oklch(0.71 0.006 265)",
    accent: "oklch(0.27 0.006 265)",
    accentForeground: "oklch(0.985 0.002 248)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.55 0.006 265)",
  },
  zinc: {
    background: "oklch(0.14 0.005 286)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.21 0.006 286)",
    cardForeground: "oklch(0.985 0 0)",
    popover: "oklch(0.21 0.006 286)",
    popoverForeground: "oklch(0.985 0 0)",
    muted: "oklch(0.27 0.006 286)",
    mutedForeground: "oklch(0.71 0.006 286)",
    accent: "oklch(0.27 0.006 286)",
    accentForeground: "oklch(0.985 0 0)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.55 0.006 286)",
  },
  neutral: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.205 0 0)",
    cardForeground: "oklch(0.985 0 0)",
    popover: "oklch(0.205 0 0)",
    popoverForeground: "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    mutedForeground: "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    accentForeground: "oklch(0.985 0 0)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.556 0 0)",
  },
  stone: {
    background: "oklch(0.15 0.014 70)",
    foreground: "oklch(0.985 0.001 106)",
    card: "oklch(0.22 0.014 70)",
    cardForeground: "oklch(0.985 0.001 106)",
    popover: "oklch(0.22 0.014 70)",
    popoverForeground: "oklch(0.985 0.001 106)",
    muted: "oklch(0.27 0.014 70)",
    mutedForeground: "oklch(0.71 0.014 70)",
    accent: "oklch(0.27 0.014 70)",
    accentForeground: "oklch(0.985 0.001 106)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.55 0.014 70)",
  },
};
