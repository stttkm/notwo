import { toggleCommandPaletteAtom } from "@/features/command-palette/atoms/command-palette-atoms";
import { toggleSidebarAtom } from "@/features/sidebar/atoms/sidebar-atoms";
import { useGlobalShortcuts } from "@/features/shortcuts/hooks/use-global-shortcuts";
import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";

export function useLayoutShortcuts() {
  const toggleSidebar = useSetAtom(toggleSidebarAtom);
  const toggleCommandPalette = useSetAtom(toggleCommandPaletteAtom);
  const navigate = useNavigate();

  const handlers = useMemo(
    () => ({
      "toggle-left-sidebar": () => toggleSidebar("left"),
      "toggle-right-sidebar": () => toggleSidebar("right"),
      "open-command-palette": () => toggleCommandPalette(),
      "open-settings": () => navigate({ to: "/settings" }),
    }),
    [toggleSidebar, toggleCommandPalette, navigate],
  );

  useGlobalShortcuts(handlers);
}
