import { useCallback, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { setSidebarWidthAtom } from "../atoms/sidebar-atoms";
import { MIN_SIDEBAR_WIDTH, MAX_SIDEBAR_WIDTH } from "../types/sidebar";
import type { SidebarPosition } from "../types/sidebar";
import { cn } from "@/shared/utils/tailwind";

interface SidebarResizerProps {
  position: SidebarPosition;
  currentWidth: number;
}

export function SidebarResizer({ position, currentWidth }: SidebarResizerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(currentWidth);
  const setSidebarWidth = useSetAtom(setSidebarWidthAtom);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      setStartWidth(currentWidth);
    },
    [currentWidth],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta =
        position === "left" ? e.clientX - startX : startX - e.clientX;
      const newWidth = Math.min(
        MAX_SIDEBAR_WIDTH,
        Math.max(MIN_SIDEBAR_WIDTH, startWidth + delta),
      );
      setSidebarWidth({ position, width: newWidth });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, position, startX, startWidth, setSidebarWidth]);

  return (
    <div
      className={cn(
        "absolute top-0 z-10 h-full w-1 cursor-col-resize transition-colors",
        "hover:bg-primary/20",
        isDragging ? "bg-primary/30" : "bg-transparent",
        position === "left" ? "right-0" : "left-0",
      )}
      onMouseDown={handleMouseDown}
    />
  );
}
