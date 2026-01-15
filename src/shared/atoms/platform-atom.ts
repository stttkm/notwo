import { atom } from "jotai";
import { getPlatform } from "@/shared/actions/app";

/**
 * Atom that stores the current platform (darwin, win32, linux).
 * Initialized asynchronously from Electron's main process.
 */
export const platformAtom = atom<string | null>(null);

/**
 * Atom to initialize platform detection.
 * Call this once at app startup.
 */
export const initPlatformAtom = atom(null, async (_get, set) => {
  try {
    const platform = await getPlatform();
    set(platformAtom, platform);
  } catch (error) {
    console.error("Failed to detect platform:", error);
  }
});

/**
 * Derived atom to check if running on macOS
 */
export const isMacAtom = atom((get) => get(platformAtom) === "darwin");
