import Image from "next/image";
import { cn } from "@/lib/cn";

/** Company logo if provided, otherwise a monogram. */
export function CompanyMark({
  name,
  logo,
  monogram,
  className,
}: {
  name: string;
  logo?: string;
  monogram?: string;
  className?: string;
}) {
  const base = cn("flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-2", className);
  if (logo) {
    return (
      <span className={base}>
        <Image src={logo} alt={`${name} logo`} width={44} height={44} className="size-full object-contain p-1.5" />
      </span>
    );
  }
  const initials =
    monogram ??
    name
      .replace(/[^A-Za-z ]/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  return (
    <span aria-hidden className={cn(base, "font-mono text-xs font-medium text-fg-muted")}>
      {initials}
    </span>
  );
}
