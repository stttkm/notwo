import { CommandPalette } from "@/features/command-palette/components/command-palette";
import DragWindowRegion from "@/app/window-controls/components/drag-window-region";
import React from "react";
import { ZenLayout } from "@/features/sidebar/components/zen-layout";
import { useLayoutShortcuts } from "./hooks/use-layout-shortcuts";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutShortcuts();

  return (
    <ZenLayout>
      <DragWindowRegion title="Notwo" />
      <main className="h-full flex-1 overflow-auto p-2">{children}</main>
      <CommandPalette />
    </ZenLayout>
  );
}
