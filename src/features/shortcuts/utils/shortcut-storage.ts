import { shortcutsMapSchema, type ShortcutsMap, DEFAULT_SHORTCUTS } from "../types/shortcut";

const STORAGE_KEY = "notwo-shortcuts";

/**
 * Loads shortcuts from localStorage, returns defaults if not found or invalid
 */
export function loadShortcuts(): ShortcutsMap {
  if (typeof window === "undefined") {
    return DEFAULT_SHORTCUTS;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_SHORTCUTS;
    }

    const parsed: unknown = JSON.parse(stored);
    const result = shortcutsMapSchema.safeParse(parsed);

    if (result.success) {
      // Merge with defaults to ensure all shortcuts exist
      return { ...DEFAULT_SHORTCUTS, ...result.data };
    }

    console.warn("Invalid shortcuts in localStorage, using defaults");
    return DEFAULT_SHORTCUTS;
  } catch (error) {
    console.warn("Failed to load shortcuts from localStorage:", error);
    return DEFAULT_SHORTCUTS;
  }
}

/**
 * Saves shortcuts to localStorage
 */
export function saveShortcuts(shortcuts: ShortcutsMap): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
  } catch (error) {
    console.error("Failed to save shortcuts to localStorage:", error);
  }
}
