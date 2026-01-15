import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import { commandPaletteOpenAtom } from "../atoms/command-palette-atoms";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { useCommands } from "../hooks/use-commands";
import { useTranslation } from "react-i18next";
import { isMacAtom } from "@/shared/atoms/platform-atom";
import { CommandPaletteGroup } from "./command-palette-group";

export function CommandPalette() {
  const { t } = useTranslation();
  const [open, setOpen] = useAtom(commandPaletteOpenAtom);
  const { groupedCommands } = useCommands();
  const isMac = useAtomValue(isMacAtom);

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const runCommand = useCallback(
    (action: () => void) => {
      handleClose();
      action();
    },
    [handleClose],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={t("commandPalette")}
      description={t("searchCommands")}
    >
      <Command>
        <CommandInput placeholder={t("searchCommands")} />
        <CommandList>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <CommandPaletteGroup
              key={category}
              category={category}
              commands={commands}
              isMac={isMac}
              onSelect={runCommand}
            />
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
