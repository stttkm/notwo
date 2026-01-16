import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/shared/constants/routes";
import { Settings } from "lucide-react";
import { cn } from "@/shared/utils/tailwind";

const baseLinkStyles = cn(
  "inline-flex items-center justify-center size-6 rounded-md text-xs font-medium",
  "transition-all outline-none cursor-pointer",
  "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  "data-[status=active]:bg-primary data-[status=active]:text-primary-foreground",
  "data-[status=active]:hover:bg-primary/80",
  "[&_svg]:size-3 [&_svg]:shrink-0",
);

/**
 * Header for the left sidebar that accounts for macOS traffic lights.
 * Contains a settings icon on the far right that links to /settings.
 */
export function LeftSidebarHeader() {
  return (
    <div className="flex h-9.5 items-center justify-end px-3">
      <Link
        to={ROUTES.SETTINGS}
        className={baseLinkStyles}
        activeProps={{ "data-status": "active" }}
      >
        <Settings className="size-4" />
      </Link>
    </div>
  );
}
