import { useHotkeys } from "react-hotkeys-hook";
import { useAtomValue } from "jotai";

import type { ShortcutId, KeyCombination } from "../types/shortcut";
import { shortcutsAtom } from "../atoms/shortcut-atoms";

type ShortcutHandlers = Partial<Record<ShortcutId, () => void>>;

/**
 * Converts a KeyCombination to react-hotkeys-hook format.
 * e.g., { code: "KeyS", modifiers: ["meta"] } -> "meta+s"
 */
function toHotkeyString(combination: KeyCombination): string {
  const key = combination.code
    .replace(/^Key/, "")
    .replace(/^Digit/, "")
    .toLowerCase();

  if (combination.modifiers.length === 0) return key;
  return [...combination.modifiers, key].join("+");
}

/**
 * Hook to register global keyboard shortcut handlers using react-hotkeys-hook.
 */
export function useGlobalShortcuts(handlers: ShortcutHandlers): void {
  const shortcuts = useAtomValue(shortcutsAtom);

  useHotkeys(
    toHotkeyString(shortcuts["toggle-left-sidebar"]),
    () => handlers["toggle-left-sidebar"]?.(),
    { preventDefault: true },
  );

  useHotkeys(
    toHotkeyString(shortcuts["toggle-right-sidebar"]),
    () => handlers["toggle-right-sidebar"]?.(),
    { preventDefault: true },
  );

  useHotkeys(
    toHotkeyString(shortcuts["open-command-palette"]),
    () => handlers["open-command-palette"]?.(),
    { preventDefault: true, enableOnFormTags: true },
  );

  useHotkeys(
    toHotkeyString(shortcuts["open-settings"]),
    () => handlers["open-settings"]?.(),
    { preventDefault: true },
  );
}
