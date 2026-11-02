import { cn } from "@/lib/cn";
import type { Tier } from "@/lib/tiers";
import { TierLabel } from "./tier-label";

type Props = {
  tier?: Tier;
  /** Monospace eyebrow shown when there is no tier, e.g. `skills`. */
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ tier, eyebrow, title, description, className }: Props) {
  return (
    <header className={cn("mb-10 max-w-2xl sm:mb-14", className)}>
      {tier ? (
        <TierLabel tier={tier} />
      ) : (
        eyebrow && <span className="font-mono text-xs tracking-wide text-fg-subtle lowercase">{eyebrow}</span>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-fg-muted">{description}</p>}
    </header>
  );
}
