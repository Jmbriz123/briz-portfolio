import Link from "next/link";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { education } from "@/content/education";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { tiers, type Tier } from "@/lib/tiers";
import { cn } from "@/lib/cn";

/** The three medallion layers, filled with real content from the data files. */
const layers: { tier: Tier; href: string; items: string[] }[] = [
  {
    tier: "gold",
    href: "#projects",
    items: projects.map((p) => p.name),
  },
  {
    tier: "silver",
    href: "#experience",
    items: experience.map((e) => `${e.role} · ${e.company}`),
  },
  {
    tier: "bronze",
    href: "#education",
    items: education.map((e) => `${e.degree} · UP Visayas`),
  },
];

function MedallionStack() {
  return (
    <ol className="relative flex flex-col gap-3" aria-label="Portfolio layers">
      {/* Flow line from Bronze up to Gold. */}
      <span aria-hidden className="absolute top-6 bottom-6 left-[19px] w-px bg-border-strong" />
      {layers.map(({ tier, href, items }, i) => {
        const t = tiers[tier];
        return (
          <li key={tier}>
            <Reveal delay={0.15 + (layers.length - i) * 0.08}>
              <Link
                href={href}
                className="group relative flex gap-4 rounded-xl border border-border bg-surface/80 p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
              >
                <span
                  aria-hidden
                  className={cn("relative z-10 mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full border bg-bg", t.border)}
                >
                  <span className={cn("size-2 rounded-full", t.dot)} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={cn("font-mono text-xs lowercase", t.text)}>
                      {t.label} / {t.theme}
                    </span>
                    <ArrowRight className="size-3.5 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="mt-2 flex flex-col gap-1">
                    {items.map((item) => (
                      <span key={item} className="truncate text-sm text-fg-muted">
                        {item}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <Container className="relative grid gap-14 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <p className="font-mono text-xs text-fg-subtle">
              {profile.focus.join(" · ")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {profile.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-fg-muted sm:text-lg">
              <span className="text-fg">I&apos;m {profile.name}.</span> {profile.intro}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="mt-8 flex flex-col gap-2 text-sm text-fg-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Currently</dt>
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <dd>
                  {profile.current.role} at{" "}
                  <Link href={profile.current.href} className="text-fg underline decoration-border-strong underline-offset-4 hover:decoration-fg">
                    {profile.current.company}
                  </Link>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Location</dt>
                <MapPin aria-hidden className="size-3.5 text-fg-subtle" />
                <dd>{profile.location}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#experience">
                View experience <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={profile.links.resume} variant="secondary" download>
                <Download className="size-4" /> Resume
              </ButtonLink>
              <div className="-ml-2 flex items-center gap-1 sm:ml-1">
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface hover:text-fg">
                  <GithubIcon className="size-[18px]" />
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface hover:text-fg">
                  <LinkedinIcon className="size-[18px]" />
                </a>
                <a href={`mailto:${profile.links.email}`} aria-label="Email" className="flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface hover:text-fg">
                  <Mail className="size-[18px]" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <MedallionStack />
      </Container>
    </section>
  );
}
