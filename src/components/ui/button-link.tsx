import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  download?: boolean;
  className?: string;
  children: React.ReactNode;
};

const variants = {
  primary: "bg-fg text-bg hover:bg-white",
  secondary: "border border-border-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-2",
  ghost: "text-fg-muted hover:text-fg",
};

export function ButtonLink({ href, variant = "primary", external, download, className, children }: Props) {
  const classes = cn(
    "inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors",
    variants[variant],
    className,
  );

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
