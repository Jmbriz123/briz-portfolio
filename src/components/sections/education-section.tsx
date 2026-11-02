import { GraduationCap } from "lucide-react";
import { certifications, education } from "@/content/education";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-border py-24 sm:py-28">
      <Container>
        <SectionHeader
          id="education-title"
          tier="bronze"
          title={certifications.length ? "Education & certifications" : "Education"}
        />
        <Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {education.map((e) => (
              <li key={e.school} className="flex gap-4 rounded-2xl border border-border bg-surface p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-bronze/30 bg-surface-2 text-bronze">
                  <GraduationCap aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-fg">{e.school}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{e.degree}</p>
                  <p className="mt-3 font-mono text-xs text-fg-subtle">
                    {e.location} · {e.period}
                  </p>
                </div>
              </li>
            ))}
            {certifications.map((c) => (
              <li key={c.name} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-base font-semibold text-fg">{c.name}</h3>
                <p className="mt-1 text-sm text-fg-muted">{c.issuer}</p>
                <p className="mt-3 font-mono text-xs text-fg-subtle">{c.date}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
