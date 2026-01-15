import type { ReactNode } from "react";

interface SidebarContentProps {
  children?: ReactNode;
  position: "left" | "right";
}

export function SidebarContent({ children, position }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="text-sidebar-foreground/70 mb-4 text-sm font-medium tracking-wide uppercase">
        {position === "left" ? "Left Sidebar" : "Right Sidebar"}
      </div>
      {children ?? (
        <div className="text-sidebar-foreground/50 text-sm">
          Placeholder content for the {position} sidebar.
        </div>
      )}
    </div>
  );
}
