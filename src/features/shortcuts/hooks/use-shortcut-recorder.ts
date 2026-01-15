import { useCallback, useEffect, useRef, useState } from "react";

import type { KeyCombination } from "../types/shortcut";
import { extractKeyCombination } from "../utils/shortcut-utils";

interface UseShortcutRecorderOptions {
  value: KeyCombination;
  onChange: (combination: KeyCombination) => void;
}

export function useShortcutRecorder({
  value,
  onChange,
}: UseShortcutRecorderOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [pendingCombination, setPendingCombination] =
    useState<KeyCombination | null>(null);
  const inputRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isRecording) return;

      event.preventDefault();
      event.stopPropagation();

      if (event.key === "Escape") {
        setIsRecording(false);
        setPendingCombination(null);
        inputRef.current?.blur();
        return;
      }

      if (event.key === "Enter" && pendingCombination) {
        onChange(pendingCombination);
        setIsRecording(false);
        setPendingCombination(null);
        inputRef.current?.blur();
        return;
      }

      const combination = extractKeyCombination(event);
      if (combination) setPendingCombination(combination);
    },
    [isRecording, pendingCombination, onChange],
  );

  useEffect(() => {
    if (isRecording) document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isRecording, handleKeyDown]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setPendingCombination(null);
  }, []);

  const stopRecording = useCallback(() => {
    setTimeout(() => {
      setIsRecording(false);
      setPendingCombination(null);
    }, 100);
  }, []);

  return {
    inputRef,
    isRecording,
    pendingCombination,
    currentValue: value,
    startRecording,
    stopRecording,
  };
}
