import type { KeyCombination } from "../types/shortcut";
import { cn } from "@/shared/utils/tailwind";
import { formatKeyCombination } from "../utils/shortcut-utils";
import { useShortcutRecorder } from "../hooks/use-shortcut-recorder";

interface ShortcutRecorderProps {
  value: KeyCombination;
  onChange: (combination: KeyCombination) => void;
  className?: string;
}

export function ShortcutRecorder({
  value,
  onChange,
  className,
}: ShortcutRecorderProps) {
  const {
    inputRef,
    isRecording,
    pendingCombination,
    startRecording,
    stopRecording,
  } = useShortcutRecorder({ value, onChange });

  const displayValue = isRecording
    ? pendingCombination
      ? formatKeyCombination(pendingCombination)
      : "Press keys..."
    : formatKeyCombination(value);

  return (
    <button
      ref={inputRef}
      type="button"
      onClick={startRecording}
      onBlur={stopRecording}
      className={cn(
        "bg-muted text-foreground inline-flex min-w-32 items-center justify-center rounded border px-3 py-2 font-mono text-sm transition-colors",
        isRecording
          ? "border-primary ring-primary/50 ring-2"
          : "hover:bg-accent border-border",
        className,
      )}
    >
      {displayValue}
    </button>
  );
}
