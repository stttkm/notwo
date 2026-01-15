import { z } from "zod";

export const modifierKeySchema = z.enum(["ctrl", "alt", "shift", "meta"]);
export type ModifierKey = z.infer<typeof modifierKeySchema>;

export const shortcutIdSchema = z.enum([
  "toggle-left-sidebar",
  "toggle-right-sidebar",
  "open-command-palette",
  "open-settings",
]);
export type ShortcutId = z.infer<typeof shortcutIdSchema>;

export const keyCombinationSchema = z.object({
  // Physical key code (e.g., "KeyS", "KeyK") - layout independent
  code: z.string().min(1),
  modifiers: z.array(modifierKeySchema),
});
export type KeyCombination = z.infer<typeof keyCombinationSchema>;

export const shortcutConfigSchema = z.object({
  id: shortcutIdSchema,
  label: z.string(),
  combination: keyCombinationSchema,
});
export type ShortcutConfig = z.infer<typeof shortcutConfigSchema>;

export const shortcutsMapSchema = z.record(
  shortcutIdSchema,
  keyCombinationSchema,
);
export type ShortcutsMap = z.infer<typeof shortcutsMapSchema>;

export const SHORTCUT_LABELS: Record<ShortcutId, string> = {
  "toggle-left-sidebar": "Toggle Left Sidebar",
  "toggle-right-sidebar": "Toggle Right Sidebar",
  "open-command-palette": "Open Command Palette",
  "open-settings": "Open Settings",
};

// Using physical key codes (KeyS, KeyK, KeyO) for keyboard layout independence
// These correspond to the physical position on a QWERTY keyboard
export const DEFAULT_SHORTCUTS: ShortcutsMap = {
  "toggle-left-sidebar": {
    code: "KeyS",
    modifiers: ["meta"],
  },
  "toggle-right-sidebar": {
    code: "KeyK",
    modifiers: ["meta"],
  },
  "open-command-palette": {
    code: "KeyO",
    modifiers: ["meta"],
  },
  "open-settings": {
    code: "Comma",
    modifiers: ["meta"],
  },
};
