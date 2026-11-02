"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { Experience } from "@/content/types";
import { TagList } from "@/components/ui/tag";
import { ScopeBadge, StatusBadge } from "@/components/ui/badges";
import { CompanyMark } from "./company-mark";
import { cn } from "@/lib/cn";

export function ExperienceItem({ item, defaultOpen = false }: { item: Experience; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const cs = item.caseStudy;

  return (
    <article className="relative pl-8 sm:pl-12">
      {/* Timeline node */}
      <span aria-hidden className="absolute top-7 left-[3px] flex size-2.5 sm:left-[19px]">
        {item.current && <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40" />}
        <span className={cn("relative inline-flex size-2.5 rounded-full border", item.current ? "border-accent bg-accent" : "border-silver/60 bg-bg")} />
      </span>

      <div
        className={cn(
          "rounded-2xl border bg-surface transition-colors",
          open ? "border-border-strong" : "border-border hover:border-border-strong",
        )}
      >
        <div className="p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <CompanyMark name={item.company} logo={item.logo} monogram={item.monogram} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  {item.role} <span className="text-fg-muted">· {item.company}</span>
                </h3>
                <p className="shrink-0 font-mono text-xs text-fg-subtle">
                  {item.start} — {item.end}
                </p>
              </div>
              <p className="mt-1 font-mono text-xs text-fg-subtle">{item.location}</p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-fg-muted">{item.context}</p>

          <ul className="mt-4 space-y-2.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg">
                <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-silver/60" />
                {h}
              </li>
            ))}
          </ul>

          <TagList items={item.tech} className="mt-6" />
        </div>

        {cs && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between border-t border-border px-5 py-3.5 text-left font-mono text-xs text-fg-muted transition-colors hover:text-fg sm:px-7"
            >
              {open ? "Hide technical details" : "Explore technical details"}
              <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 border-t border-border px-5 py-6 sm:px-7 md:grid-cols-2">
                    <div>
                      <h4 className="font-mono text-xs text-fg-subtle">Contributions</h4>
                      <ul className="mt-3 space-y-3">
                        {cs.contributions.map((c) => (
                          <li key={c.text} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                            <ScopeBadge scope={c.scope} className="mt-0.5" />
                            <span>
                              {c.text}
                              {c.status && c.status !== "built" && <StatusBadge status={c.status} className="ml-2 align-middle" />}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs text-fg-subtle">Engineering decisions</h4>
                      <ul className="mt-3 space-y-3">
                        {cs.decisions.map((d) => (
                          <li key={d.title} className="text-sm leading-relaxed">
                            <span className="text-fg">{d.title}.</span> <span className="text-fg-muted">{d.body}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/experience/${item.slug}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline hover:underline-offset-4"
                      >
                        Read the full case study <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </article>
  );
}
