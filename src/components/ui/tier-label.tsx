import { cn } from "@/lib/cn";
import { tiers, type Tier } from "@/lib/tiers";

/** Monospace marker such as `● silver / experience`. */
export function TierLabel({ tier, className }: { tier: Tier; className?: string }) {
  const t = tiers[tier];
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-xs tracking-wide lowercase", t.text, className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", t.dot)} />
      {t.label} / {t.theme}
    </span>
  );
}
