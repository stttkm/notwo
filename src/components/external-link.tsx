import { ComponentProps } from "react";
import { cn } from "@/shared/utils/tailwind";
import { openExternalLink } from "@/app/shell/actions/shell";

export default function ExternalLink({
  children,
  className,
  href,
  ...props
}: ComponentProps<"a">) {
  function open() {
    if (!href) return;
    openExternalLink(href);
  }

  return (
    <a
      className={cn("cursor-pointer underline", className)}
      {...props}
      onClick={open}
    >
      {children}
    </a>
  );
}
