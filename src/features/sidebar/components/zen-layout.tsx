import type { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { SidebarContent } from "./sidebar-content";
import { SidebarResizer } from "./sidebar-resizer";
import {
  leftSidebarOpenAtom,
  rightSidebarOpenAtom,
  leftSidebarWidthAtom,
  rightSidebarWidthAtom,
} from "../atoms/sidebar-atoms";

interface ZenLayoutProps {
  children: ReactNode;
  leftSidebarContent?: ReactNode;
  rightSidebarContent?: ReactNode;
}

/**
 * Zen browser-style layout with two sidebars and layered visual effect.
 *
 * Layer 0 (background): Solid color containing sidebars
 * Layer 1 (foreground): Main content as floating card with rounded corners
 *
 * When sidebars toggle, the main content shrinks to reveal the sidebar,
 * creating the effect of uncovering content beneath.
 */
export function ZenLayout({
  children,
  leftSidebarContent,
  rightSidebarContent,
}: ZenLayoutProps) {
  const isLeftOpen = useAtomValue(leftSidebarOpenAtom);
  const isRightOpen = useAtomValue(rightSidebarOpenAtom);
  const leftWidth = useAtomValue(leftSidebarWidthAtom);
  const rightWidth = useAtomValue(rightSidebarWidthAtom);

  return (
    <div className="bg-zen-layer-0 flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar */}
      <div
        className="relative h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
        style={{ width: isLeftOpen ? leftWidth : 0 }}
      >
        <div
          className="h-full overflow-y-auto overflow-x-hidden"
          style={{ width: leftWidth }}
        >
          {leftSidebarContent ?? <SidebarContent position="left" />}
        </div>
        {isLeftOpen && (
          <SidebarResizer position="left" currentWidth={leftWidth} />
        )}
      </div>

      {/* Main Content */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="bg-background m-2 flex flex-1 flex-col overflow-hidden rounded-lg shadow-lg">
          {children}
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className="relative h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-out"
        style={{ width: isRightOpen ? rightWidth : 0 }}
      >
        <div
          className="h-full overflow-y-auto overflow-x-hidden"
          style={{ width: rightWidth }}
        >
          {rightSidebarContent ?? <SidebarContent position="right" />}
        </div>
        {isRightOpen && (
          <SidebarResizer position="right" currentWidth={rightWidth} />
        )}
      </div>
    </div>
  );
}
