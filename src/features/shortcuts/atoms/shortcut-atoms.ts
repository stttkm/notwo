import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  type ShortcutId,
  type KeyCombination,
  type ShortcutsMap,
  DEFAULT_SHORTCUTS,
  shortcutsMapSchema,
} from "../types/shortcut";
import { createCustomStorage } from "@/shared/utils/custom-storage";

const STORAGE_KEY = "notwo-shortcuts";

/**
 * Main atom storing all shortcuts, persisted to localStorage.
 * Uses merge to preserve default shortcuts for any missing keys.
 */
export const shortcutsAtom = atomWithStorage<ShortcutsMap>(
  STORAGE_KEY,
  DEFAULT_SHORTCUTS,
  createCustomStorage(shortcutsMapSchema, {
    merge: (initial, parsed) => ({ ...initial, ...parsed }),
  }),
);

/**
 * Atom to get a specific shortcut by ID
 */
export const shortcutAtomFamily = (id: ShortcutId) =>
  atom(
    (get) => get(shortcutsAtom)[id],
    (get, set, newCombination: KeyCombination) => {
      const current = get(shortcutsAtom);
      set(shortcutsAtom, { ...current, [id]: newCombination });
    },
  );

/**
 * Atom to reset all shortcuts to defaults
 */
export const resetShortcutsAtom = atom(null, (_get, set) => {
  set(shortcutsAtom, DEFAULT_SHORTCUTS);
});

/**
 * Atom to reset a single shortcut to default
 */
export const resetSingleShortcutAtom = atom(
  null,
  (get, set, id: ShortcutId) => {
    const current = get(shortcutsAtom);
    const defaultValue = DEFAULT_SHORTCUTS[id];
    set(shortcutsAtom, { ...current, [id]: defaultValue });
  },
);
