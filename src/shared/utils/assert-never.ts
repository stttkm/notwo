/**
 * Utility for exhaustive type checking in switch statements.
 * If this function is reachable, TypeScript will error because
 * the value should have been narrowed to `never`.
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
