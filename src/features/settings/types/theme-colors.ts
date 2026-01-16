/**
 * Theme color type definitions.
 * Color values come from the Tailwind palette in tailwind-palette.ts.
 */

export const ACCENT_COLORS = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

export type AccentColor = (typeof ACCENT_COLORS)[number];

export const BASE_COLORS = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

export type BaseColor = (typeof BASE_COLORS)[number];
