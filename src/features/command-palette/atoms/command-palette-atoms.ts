import { atom } from "jotai";

/**
 * Atom for controlling command palette open state
 */
export const commandPaletteOpenAtom = atom(false);

/**
 * Atom to toggle the command palette (open if closed, close if open)
 */
export const toggleCommandPaletteAtom = atom(null, (get, set) => {
  set(commandPaletteOpenAtom, !get(commandPaletteOpenAtom));
});
