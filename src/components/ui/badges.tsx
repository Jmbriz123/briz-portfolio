import { cn } from "@/lib/cn";
import type { Scope, Status } from "@/content/types";

const statusStyles: Record<Status, { label: string; className: string; dot: string }> = {
  built: { label: "Built", className: "text-accent border-accent/30", dot: "bg-accent" },
  "in-progress": { label: "In progress", className: "text-progress border-progress/30", dot: "bg-progress" },
  planned: { label: "Planned", className: "text-fg-subtle border-border-strong border-dashed", dot: "bg-fg-subtle" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10.5px] leading-4",
        s.className,
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

const scopeStyles: Record<Scope, { label: string; className: string }> = {
  personal: { label: "I built", className: "text-fg bg-surface-2 border-border-strong" },
  participated: { label: "Contributed", className: "text-fg-muted bg-surface border-border" },
  team: { label: "Team", className: "text-fg-subtle bg-transparent border-border" },
};

export function ScopeBadge({ scope, className }: { scope: Scope; className?: string }) {
  const s = scopeStyles[scope];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded border px-1.5 font-mono text-[10px] leading-5 whitespace-nowrap",
        s.className,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
