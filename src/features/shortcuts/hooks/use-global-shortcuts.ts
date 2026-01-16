import { useEffect, useRef } from "react";

import type { ShortcutId } from "../types/shortcut";
import { matchesKeyCombination } from "../utils/shortcut-utils";
import { shortcutsAtom } from "../atoms/shortcut-atoms";
import { useAtomValue } from "jotai";

type ShortcutHandlers = Partial<Record<ShortcutId, () => void>>;

const THROTTLE_MS = 300;

/**
 * Hook to register global keyboard shortcut handlers
 */
export function useGlobalShortcuts(handlers: ShortcutHandlers): void {
  const shortcuts = useAtomValue(shortcutsAtom);
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastTriggerRef.current < THROTTLE_MS) return;

      const target = event.target;
      const isInputField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      // Allow command palette even in inputs
      if (isInputField) {
        const cmdPalette = shortcuts["open-command-palette"];
        if (cmdPalette && matchesKeyCombination(event, cmdPalette)) {
          event.preventDefault();
          lastTriggerRef.current = now;
          handlers["open-command-palette"]?.();
        }
        return;
      }

      for (const [id, combination] of Object.entries(shortcuts)) {
        const handler = handlers[id as ShortcutId];
        if (handler && matchesKeyCombination(event, combination)) {
          event.preventDefault();
          lastTriggerRef.current = now;
          handler();
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, handlers]);
}
