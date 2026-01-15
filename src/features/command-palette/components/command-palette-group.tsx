import {
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

import type { Command } from "../types/command";
import { getKeyCombinationParts } from "@/features/shortcuts/utils/shortcut-utils";

interface CommandPaletteGroupProps {
  category: string;
  commands: Command[];
  isMac: boolean;
  onSelect: (action: () => void) => void;
}

export function CommandPaletteGroup({
  category,
  commands,
  isMac,
  onSelect,
}: CommandPaletteGroupProps) {
  return (
    <CommandGroup heading={category}>
      {commands.map((command) => (
        <CommandItem key={command.id} onSelect={() => onSelect(command.action)}>
          {command.icon}
          <span>{command.label}</span>
          {command.shortcut && (
            <CommandShortcut>
              <KbdGroup>
                {getKeyCombinationParts(command.shortcut, isMac).map(
                  (part, index) => (
                    <Kbd key={index}>{part}</Kbd>
                  ),
                )}
              </KbdGroup>
            </CommandShortcut>
          )}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
