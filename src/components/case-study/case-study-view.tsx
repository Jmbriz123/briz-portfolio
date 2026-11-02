import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CaseStudy, Scope, Status } from "@/content/types";
import { getDiagram } from "@/content/architecture";
import { Container } from "@/components/ui/container";
import { TierLabel } from "@/components/ui/tier-label";
import { TagList } from "@/components/ui/tag";
import { ScopeBadge, StatusBadge } from "@/components/ui/badges";
import { Diagram } from "@/components/architecture/diagram";
import type { Tier } from "@/lib/tiers";

type Props = {
  tier: Tier;
  title: string;
  subtitle: string;
  /** Monospace metadata rows, e.g. dates, location. */
  meta: string[];
  status?: Status;
  tech: string[];
  links?: React.ReactNode;
  study: CaseStudy;
  backHref: string;
};

const scopeOrder: Scope[] = ["personal", "participated", "team"];
const scopeHeading: Record<Scope, string> = {
  personal: "What I implemented",
  participated: "What I contributed to",
  team: "What the team delivered",
};

function Section({ id, index, title, children }: { id: string; index: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-border py-12 first:border-t-0 first:pt-0">
      <p className="font-mono text-xs text-fg-subtle">{String(index).padStart(2, "0")}</p>
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function CaseStudyView({ tier, title, subtitle, meta, status, tech, links, study, backHref }: Props) {
  const diagram = study.diagram ? getDiagram(study.diagram) : undefined;
  const groups = scopeOrder
    .map((scope) => ({ scope, items: study.contributions.filter((c) => c.scope === scope) }))
    .filter((g) => g.items.length);

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "problem", title: "Problem" },
    ...(diagram ? [{ id: "architecture", title: "System architecture" }] : []),
    { id: "contributions", title: "Responsibilities & contributions" },
    { id: "stack", title: "Technologies" },
    { id: "decisions", title: "Challenges & decisions" },
    { id: "outcomes", title: study.lessons.length ? "Outcomes & lessons" : "Outcomes" },
  ];
  const n = (id: string) => sections.findIndex((s) => s.id === id) + 1;

  return (
    <main>
      <header className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]" />
        <Container className="relative py-14 sm:py-20">
          <Link href={backHref} className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-subtle hover:text-fg">
            <ArrowLeft className="size-3.5" /> Back to portfolio
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <TierLabel tier={tier} />
            {status && <StatusBadge status={status} />}
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted">{subtitle}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-fg-subtle">
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          {links && <div className="mt-8 flex flex-wrap gap-3">{links}</div>}
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[200px_1fr] lg:gap-16 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-24 space-y-2 border-l border-border">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm text-fg-subtle hover:border-fg-muted hover:text-fg">
                  <span className="mr-2 font-mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-3xl">
          <Section id="overview" index={n("overview")} title="Overview">
            <p className="text-base leading-relaxed text-fg-muted">{study.overview}</p>
          </Section>

          <Section id="problem" index={n("problem")} title="Problem">
            <p className="text-base leading-relaxed text-fg-muted">{study.problem}</p>
          </Section>

          {diagram && (
            <Section id="architecture" index={n("architecture")} title="System architecture">
              <p className="mb-6 text-base leading-relaxed text-fg-muted">{diagram.summary}</p>
              <div className="lg:-mr-24 xl:-mr-48">
                <Diagram diagram={diagram} />
              </div>
            </Section>
          )}

          <Section id="contributions" index={n("contributions")} title="Responsibilities & contributions">
            <div className="space-y-8">
              {groups.map((g) => (
                <div key={g.scope}>
                  <h3 className="flex items-center gap-2 text-sm font-medium text-fg">
                    <ScopeBadge scope={g.scope} />
                    {scopeHeading[g.scope]}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {g.items.map((c) => (
                      <li key={c.text} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-fg-subtle" />
                        <span>
                          {c.text}
                          {c.status && <StatusBadge status={c.status} className="ml-2 align-middle" />}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section id="stack" index={n("stack")} title="Technologies">
            <TagList items={tech} />
          </Section>

          <Section id="decisions" index={n("decisions")} title="Challenges & decisions">
            <dl className="grid gap-4 sm:grid-cols-2">
              {study.decisions.map((d) => (
                <div key={d.title} className="rounded-xl border border-border bg-surface p-5">
                  <dt className="text-sm font-semibold text-fg">{d.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{d.body}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="outcomes" index={n("outcomes")} title={study.lessons.length ? "Outcomes & lessons" : "Outcomes"}>
            <ul className="space-y-3">
              {study.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {o}
                </li>
              ))}
            </ul>
            {study.lessons.length > 0 && (
              <>
                <h3 className="mt-8 text-sm font-medium text-fg">Lessons learned</h3>
                <ul className="mt-3 space-y-3">
                  {study.lessons.map((l) => (
                    <li key={l} className="text-[15px] leading-relaxed text-fg-muted">
                      {l}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Section>
        </article>
      </Container>
    </main>
  );
}
