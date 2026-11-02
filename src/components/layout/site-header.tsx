"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/profile";
import { navItems } from "@/lib/nav";
import { tiers } from "@/lib/tiers";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

/** Tracks which home-page section is in view so the nav can highlight it. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-border bg-bg/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="text-sm font-semibold tracking-tight text-fg">{profile.name}</span>
          <span className="hidden font-mono text-[11px] text-fg-subtle transition-colors group-hover:text-fg-muted sm:inline">
            {"// data engineer"}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.tier && (
                      <span
                        aria-hidden
                        className={cn(
                          "size-1.5 rounded-full transition-opacity",
                          tiers[item.tier].dot,
                          isActive ? "opacity-100" : "opacity-50",
                        )}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.links.resume}
            className="hidden h-8 items-center rounded-md border border-border-strong px-3 text-[13px] text-fg transition-colors hover:border-fg-subtle sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-fg-muted hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <Container className="py-3">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3 text-base text-fg-muted hover:text-fg"
                    >
                      {item.label}
                      {item.tier && (
                        <span className={cn("font-mono text-xs lowercase", tiers[item.tier].text)}>
                          {tiers[item.tier].label}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href={profile.links.resume} className="flex py-3 text-base text-fg-muted hover:text-fg">
                    Resume (PDF)
                  </a>
                </li>
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
