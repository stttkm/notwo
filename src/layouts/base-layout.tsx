import { CommandPalette } from "@/features/command-palette/components/command-palette";
import DragWindowRegion from "@/app/window-controls/components/drag-window-region";
import React from "react";
import { ZenLayout } from "@/features/sidebar/components/zen-layout";
import { toggleCommandPaletteAtom } from "@/features/command-palette/atoms/command-palette-atoms";
import { toggleSidebarAtom } from "@/features/sidebar/atoms/sidebar-atoms";
import { useGlobalShortcuts } from "@/features/shortcuts/hooks/use-global-shortcuts";
import { useSetAtom } from "jotai";
import { useNavigate } from "@tanstack/react-router";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const toggleSidebar = useSetAtom(toggleSidebarAtom);
  const openCommandPalette = useSetAtom(toggleCommandPaletteAtom);
  const navigate = useNavigate();

  useGlobalShortcuts({
    "toggle-left-sidebar": () => toggleSidebar("left"),
    "toggle-right-sidebar": () => toggleSidebar("right"),
    "open-command-palette": () => openCommandPalette(),
    "open-settings": () => navigate({ to: "/settings" }),
  });

  return (
    <ZenLayout>
      <DragWindowRegion title="Notwo" />
      <main className="h-full flex-1 overflow-auto p-2">{children}</main>
      <CommandPalette />
    </ZenLayout>
  );
}
