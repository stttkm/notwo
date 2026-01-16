import { ACCENT_COLORS, BASE_COLORS } from "../types/theme-colors";
import type { AccentColor, BaseColor } from "../types/theme-colors";
import type { TailwindShade } from "../types/tailwind-palette";
import { atomWithStorage } from "jotai/utils";
import { createCustomStorage } from "@/shared/utils/custom-storage";
import { z } from "zod";

// Schemas
const baseColorSchema = z.enum(BASE_COLORS);

const accentColorStateSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("preset"), color: z.enum(ACCENT_COLORS) }),
  z.object({ type: z.literal("custom"), color: z.string() }),
]);

const tailwindShadeSchema = z.union([
  z.literal(50),
  z.literal(100),
  z.literal(200),
  z.literal(300),
  z.literal(400),
  z.literal(500),
  z.literal(600),
  z.literal(700),
  z.literal(800),
  z.literal(900),
  z.literal(950),
]);

const sidebarColorStateSchema = z.union([
  z.literal("auto"),
  z.object({
    type: z.literal("preset"),
    color: z.enum(ACCENT_COLORS),
    shade: tailwindShadeSchema,
  }),
  z.object({ type: z.literal("custom"), color: z.string() }),
]);

// Types
export type AccentColorState = z.infer<typeof accentColorStateSchema>;
export type SidebarColorState = z.infer<typeof sidebarColorStateSchema>;

// Defaults
const DEFAULT_ACCENT: AccentColorState = { type: "preset", color: "blue" };
const DEFAULT_BASE: BaseColor = "neutral";
const DEFAULT_SIDEBAR: SidebarColorState = "auto";

// Atoms
export const accentColorAtom = atomWithStorage<AccentColorState>(
  "accent-color",
  DEFAULT_ACCENT,
  createCustomStorage(accentColorStateSchema),
);

export const baseColorAtom = atomWithStorage<BaseColor>(
  "base-color",
  DEFAULT_BASE,
  createCustomStorage(baseColorSchema),
);

export const sidebarColorAtom = atomWithStorage<SidebarColorState>(
  "sidebar-color",
  DEFAULT_SIDEBAR,
  createCustomStorage(sidebarColorStateSchema),
);

// Helpers
export function isPresetAccent(
  state: AccentColorState,
): state is { type: "preset"; color: AccentColor } {
  return state.type === "preset";
}

export function isCustomAccent(
  state: AccentColorState,
): state is { type: "custom"; color: string } {
  return state.type === "custom";
}

export function isAutoSidebar(state: SidebarColorState): state is "auto" {
  return state === "auto";
}

export function isPresetSidebar(
  state: SidebarColorState,
): state is { type: "preset"; color: AccentColor; shade: TailwindShade } {
  return typeof state === "object" && state.type === "preset";
}

export function isCustomSidebar(
  state: SidebarColorState,
): state is { type: "custom"; color: string } {
  return typeof state === "object" && state.type === "custom";
}
