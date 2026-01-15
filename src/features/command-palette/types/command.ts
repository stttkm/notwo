import type { ReactNode } from "react";
import type { KeyCombination } from "@/features/shortcuts/types/shortcut";

export interface Command {
  id: string;
  label: string;
  category?: string;
  shortcut?: KeyCombination;
  icon?: ReactNode;
  action: () => void;
}

export interface CommandCategory {
  id: string;
  label: string;
  commands: Command[];
}
