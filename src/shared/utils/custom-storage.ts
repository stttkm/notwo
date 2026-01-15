import type { z } from "zod";

type SyncStringStorage<T> = {
  getItem: (key: string, initialValue: T) => T;
  setItem: (key: string, value: T) => void;
  removeItem: (key: string) => void;
};

interface CreateZodStorageOptions<T> {
  /**
   * Optional function to merge parsed data with initial value.
   * Useful when you want to preserve defaults for missing keys.
   * Default: returns parsed data as-is.
   */
  merge?: (initialValue: T, parsedData: T) => T;
}

/**
 * Creates a Jotai-compatible storage adapter that validates data with a Zod schema.
 * Falls back to initialValue if validation fails or data is missing.
 *
 * @example
 * const storage = createZodStorage(mySchema);
 * const atom = atomWithStorage('key', defaultValue, storage);
 *
 * @example with merge
 * const storage = createZodStorage(mySchema, {
 *   merge: (initial, parsed) => ({ ...initial, ...parsed }),
 * });
 */
export function createCustomStorage<T>(
  schema: z.ZodType<T>,
  options?: CreateZodStorageOptions<T>,
): SyncStringStorage<T> {
  const merge = options?.merge ?? ((_initial: T, parsed: T) => parsed);

  return {
    getItem: (key: string, initialValue: T): T => {
      if (typeof window === "undefined") return initialValue;

      try {
        const stored = localStorage.getItem(key);
        if (!stored) return initialValue;

        const parsed: unknown = JSON.parse(stored);
        const result = schema.safeParse(parsed);

        if (result.success) return merge(initialValue, result.data);
        return initialValue;
      } catch {
        return initialValue;
      }
    },
    setItem: (key: string, value: T): void => {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string): void => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    },
  };
}
