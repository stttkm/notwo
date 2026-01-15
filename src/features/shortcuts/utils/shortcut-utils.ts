import type { KeyCombination, ModifierKey } from "../types/shortcut";

import { getKeyDisplayLabel } from "./key-display";

/**
 * Checks if a keyboard event matches a key combination
 * Uses event.code for keyboard layout independence
 */
export function matchesKeyCombination(
  event: KeyboardEvent,
  combination: KeyCombination,
): boolean {
  if (event.code !== combination.code) return false;

  const modifierState: Record<ModifierKey, boolean> = {
    ctrl: event.ctrlKey,
    alt: event.altKey,
    shift: event.shiftKey,
    meta: event.metaKey,
  };

  const requiredModifiers = new Set(combination.modifiers);

  for (const modifier of Object.keys(modifierState) as ModifierKey[]) {
    const isRequired = requiredModifiers.has(modifier);
    const isPressed = modifierState[modifier];
    if (isRequired !== isPressed) return false;
  }

  return true;
}

/**
 * Extracts a key combination from a keyboard event
 * Uses event.code for keyboard layout independence
 */
export function extractKeyCombination(
  event: KeyboardEvent,
): KeyCombination | null {
  const code = event.code;

  // Ignore modifier-only key presses
  const modifierCodes = [
    "ControlLeft",
    "ControlRight",
    "AltLeft",
    "AltRight",
    "ShiftLeft",
    "ShiftRight",
    "MetaLeft",
    "MetaRight",
  ];

  if (modifierCodes.includes(code)) return null;

  const modifiers: ModifierKey[] = [];
  if (event.ctrlKey) modifiers.push("ctrl");
  if (event.altKey) modifiers.push("alt");
  if (event.shiftKey) modifiers.push("shift");
  if (event.metaKey) modifiers.push("meta");

  return { code, modifiers };
}

/**
 * Detects if running on macOS.
 * Uses navigator.platform as fallback (works in Electron).
 * For React components, prefer using isMacAtom from @/shared/atoms/platform-atom.
 */
function detectIsMac(): boolean {
  return (
    typeof navigator !== "undefined" && navigator.platform.includes("Mac")
  );
}

/**
 * Formats a key combination for display as a single string.
 * @param combination - The key combination to format
 * @param isMac - Optional: override platform detection (use isMacAtom in React)
 */
export function formatKeyCombination(
  combination: KeyCombination,
  isMac?: boolean,
): string {
  const parts = getKeyCombinationParts(combination, isMac);
  const mac = isMac ?? detectIsMac();
  return parts.join(mac ? "" : "+");
}

/**
 * Returns an array of display parts for a key combination.
 * Useful for rendering each part in a separate Kbd component.
 * @param combination - The key combination to get parts for
 * @param isMac - Optional: override platform detection (use isMacAtom in React)
 */
export function getKeyCombinationParts(
  combination: KeyCombination,
  isMac?: boolean,
): string[] {
  const mac = isMac ?? detectIsMac();

  const modifierSymbols: Record<ModifierKey, string> = mac
    ? { ctrl: "⌃", alt: "⌥", shift: "⇧", meta: "⌘" }
    : { ctrl: "Ctrl", alt: "Alt", shift: "Shift", meta: "Win" };

  const modifierOrder: ModifierKey[] = ["ctrl", "alt", "shift", "meta"];
  const parts: string[] = [];

  for (const mod of modifierOrder) {
    if (combination.modifiers.includes(mod)) parts.push(modifierSymbols[mod]);
  }

  parts.push(getKeyDisplayLabel(combination.code));

  return parts;
}

/**
 * Serializes a key combination to a string for storage
 */
export function serializeKeyCombination(combination: KeyCombination): string {
  const modifiers = [...combination.modifiers].sort().join("+");
  return modifiers ? `${modifiers}+${combination.code}` : combination.code;
}

/**
 * Parses a serialized key combination string
 */
export function parseKeyCombination(serialized: string): KeyCombination {
  const parts = serialized.split("+");
  const code = parts.pop() ?? "";
  const modifiers = parts as ModifierKey[];

  return { code, modifiers };
}
