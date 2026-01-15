import { useAtom, useSetAtom } from "jotai";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShortcutRecorder } from "./shortcut-recorder";
import {
  shortcutsAtom,
  resetSingleShortcutAtom,
} from "../atoms/shortcut-atoms";
import {
  type ShortcutId,
  type KeyCombination,
  SHORTCUT_LABELS,
} from "../types/shortcut";
import { useTranslation } from "react-i18next";

const SHORTCUT_IDS: ShortcutId[] = [
  "toggle-left-sidebar",
  "toggle-right-sidebar",
  "open-command-palette",
  "open-settings",
];

export function ShortcutSettings() {
  const { t } = useTranslation();
  const [shortcuts, setShortcuts] = useAtom(shortcutsAtom);
  const resetSingle = useSetAtom(resetSingleShortcutAtom);

  const handleChange = (id: ShortcutId, combination: KeyCombination) => {
    setShortcuts({ ...shortcuts, [id]: combination });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t("keyboardShortcuts")}</h3>
      <div className="space-y-3">
        {SHORTCUT_IDS.map((id) => (
          <div
            key={id}
            className="flex items-center justify-between gap-4 rounded-lg border p-3"
          >
            <span className="text-sm font-medium">{SHORTCUT_LABELS[id]}</span>
            <div className="flex items-center gap-2">
              <ShortcutRecorder
                value={shortcuts[id]}
                onChange={(combination) => handleChange(id, combination)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => resetSingle(id)}
                title={t("reset")}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
