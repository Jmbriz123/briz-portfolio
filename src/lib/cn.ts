/** Joins truthy class names. Small enough that a dependency isn't worth it. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
