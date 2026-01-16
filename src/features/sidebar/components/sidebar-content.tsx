import type { ReactNode } from "react";
import { LeftSidebarHeader } from "./left-sidebar-header";

interface SidebarContentProps {
  children?: ReactNode;
  position: "left" | "right";
}

export function SidebarContent({ children, position }: SidebarContentProps) {
  const isLeft = position === "left";

  return (
    <div className="flex h-full flex-col">
      {isLeft && <LeftSidebarHeader />}
      <div className={isLeft ? "flex-1 p-4 pt-0" : "flex-1 p-4"}>
        {children ?? (
          <div className="text-sidebar-foreground/50 text-sm">
            Placeholder content for the {position} sidebar.
          </div>
        )}
      </div>
    </div>
  );
}
