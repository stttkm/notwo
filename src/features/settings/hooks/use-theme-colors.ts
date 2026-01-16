import {
  accentColorAtom,
  baseColorAtom,
  sidebarColorAtom,
} from "../atoms/theme-atoms";
import { useEffect, useState } from "react";

import { applyThemeColors } from "../actions/apply-theme-colors";
import { useAtomValue } from "jotai";

/**
 * Hook to initialize and sync theme colors on startup.
 * Also reapplies colors when dark mode changes.
 */
export function useThemeColors() {
  const accent = useAtomValue(accentColorAtom);
  const base = useAtomValue(baseColorAtom);
  const sidebar = useAtomValue(sidebarColorAtom);

  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  // Watch for dark mode class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Apply colors when any color setting or dark mode changes
  useEffect(() => {
    applyThemeColors(accent, base, sidebar);
  }, [accent, base, sidebar, isDark]);
}
