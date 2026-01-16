import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { leftSidebarOpenAtom } from "../atoms/sidebar-atoms";
import { isMacAtom } from "@/shared/atoms/platform-atom";
import { setTrafficLightVisibility } from "@/app/window-controls/actions/window";

/**
 * Syncs macOS traffic light visibility with left sidebar state.
 * Traffic lights are embedded in the left sidebar, so they hide when it closes.
 */
export function useTrafficLightSync(): void {
  const isLeftOpen = useAtomValue(leftSidebarOpenAtom);
  const isMac = useAtomValue(isMacAtom);

  useEffect(() => {
    if (!isMac) return;
    setTrafficLightVisibility(isLeftOpen);
  }, [isMac, isLeftOpen]);
}
