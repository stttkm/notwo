/**
 * Maps physical key codes to display labels
 * Shows the key that would be produced on a US QWERTY layout
 */

const SPECIAL_KEYS: Record<string, string> = {
  Space: "Space",
  Enter: "Enter",
  Tab: "Tab",
  Escape: "Esc",
  Backspace: "Backspace",
  Delete: "Delete",
  ArrowUp: "Up",
  ArrowDown: "Down",
  ArrowLeft: "Left",
  ArrowRight: "Right",
  Home: "Home",
  End: "End",
  PageUp: "PageUp",
  PageDown: "PageDown",
  // Function keys
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  // Punctuation (US QWERTY)
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
};

export function getKeyDisplayLabel(code: string): string {
  // Letter keys (KeyA-KeyZ)
  if (code.startsWith("Key") && code.length === 4) return code.charAt(3);

  // Digit keys (Digit0-Digit9)
  if (code.startsWith("Digit") && code.length === 6) return code.charAt(5);

  return SPECIAL_KEYS[code] ?? code;
}
