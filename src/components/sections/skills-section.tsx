import { learning, professional, skillGroups, type Skill } from "@/content/skills";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/cn";

function level(skill: Skill) {
  if (skill.usedIn.some((e) => professional.includes(e))) return "professional";
  if (skill.usedIn.length) return "project";
  return "familiar";
}

const markers = {
  professional: { label: "Used professionally", className: "bg-accent border-accent" },
  project: { label: "Used in projects", className: "bg-transparent border-accent" },
  familiar: { label: "Familiar", className: "bg-transparent border-fg-subtle border-dashed" },
} as const;

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="skills-title"
          eyebrow="skills / by domain"
          title="Technical skills"
          description="Grouped by engineering domain, with where each one was actually used."
        />

        <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Legend">
          {Object.values(markers).map((m) => (
            <li key={m.label} className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
              <span aria-hidden className={cn("size-2 rounded-full border", m.className)} />
              {m.label}
            </li>
          ))}
        </ul>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.domain} delay={(i % 3) * 0.05} className="bg-surface">
              <div className="h-full p-6">
                <h3 className="text-base font-semibold text-fg">{group.domain}</h3>
                <p className="mt-1 text-sm text-fg-subtle">{group.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {group.skills.map((skill) => {
                    const l = level(skill);
                    return (
                      <li key={skill.name} className="flex items-start justify-between gap-3">
                        <span className="flex items-center gap-2.5 text-sm text-fg">
                          <span aria-hidden className={cn("size-2 shrink-0 rounded-full border", markers[l].className)} />
                          {skill.name}
                          <span className="sr-only"> ({markers[l].label})</span>
                        </span>
                        {skill.usedIn.length > 0 && (
                          <span className="shrink-0 text-right font-mono text-[10.5px] leading-5 text-fg-subtle">
                            {skill.usedIn.map((e) => e.split(" ")[0]).join(" · ")}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {learning.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-xs text-fg-subtle">Currently learning</span>
            {learning.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
