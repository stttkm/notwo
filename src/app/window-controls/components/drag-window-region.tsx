import { WindowButtons } from "@/app/window-controls/components/window-buttons";
import type { ReactNode } from "react";
import { useAtomValue } from "jotai";
import { isMacAtom } from "@/shared/atoms/platform-atom";

interface DragWindowRegionProps {
  title?: ReactNode;
}

export default function DragWindowRegion({ title }: DragWindowRegionProps) {
  const isMacOS = useAtomValue(isMacAtom);

  return (
    <div className="flex w-full items-stretch justify-between">
      <div className="draglayer w-full">
        {title && !isMacOS && (
          <div className="flex flex-1 p-2 text-xs whitespace-nowrap text-gray-400 select-none">
            {title}
          </div>
        )}
        {isMacOS && (
          <div className="flex flex-1 p-2">
            {/* Maintain the same height but do not display content */}
          </div>
        )}
      </div>
      {!isMacOS && <WindowButtons />}
    </div>
  );
}
