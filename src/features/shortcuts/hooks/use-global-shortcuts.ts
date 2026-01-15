import { useEffect, useCallback } from "react";
import { useAtomValue } from "jotai";
import { shortcutsAtom } from "../atoms/shortcut-atoms";
import type { ShortcutId } from "../types/shortcut";
import { matchesKeyCombination } from "../utils/shortcut-utils";

type ShortcutHandlers = Partial<Record<ShortcutId, () => void>>;

/**
 * Hook to register global keyboard shortcut handlers
 *
 * @example
 * useGlobalShortcuts({
 *   'toggle-left-sidebar': () => toggleLeft(),
 *   'open-command-palette': () => openPalette(),
 * });
 */
export function useGlobalShortcuts(handlers: ShortcutHandlers): void {
  const shortcuts = useAtomValue(shortcutsAtom);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        // Allow command palette shortcut even in inputs
        const commandPaletteCombination = shortcuts["open-command-palette"];
        if (
          commandPaletteCombination &&
          matchesKeyCombination(event, commandPaletteCombination)
        ) {
          event.preventDefault();
          handlers["open-command-palette"]?.();
        }
        return;
      }

      for (const [id, combination] of Object.entries(shortcuts)) {
        const shortcutId = id as ShortcutId;
        const handler = handlers[shortcutId];

        if (handler && matchesKeyCombination(event, combination)) {
          event.preventDefault();
          handler();
          return;
        }
      }
    },
    [shortcuts, handlers]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
