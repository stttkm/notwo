/**
 * Color utilities using culori for accurate contrast calculation.
 */

import { parse, wcagContrast } from "culori";

const WHITE = "oklch(0.98 0 0)";
const BLACK = "oklch(0.15 0 0)";

/**
 * Get appropriate foreground color (white or black) for a background.
 * Uses WCAG contrast ratio for accessibility.
 */
export function getContrastForeground(backgroundColor: string): string {
  const parsed = parse(backgroundColor);
  if (!parsed) return WHITE;

  const whiteContrast = wcagContrast(parsed, parse(WHITE)!);
  const blackContrast = wcagContrast(parsed, parse(BLACK)!);

  return whiteContrast > blackContrast ? WHITE : BLACK;
}
