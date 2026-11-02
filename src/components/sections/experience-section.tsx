import { experience } from "@/content/experience";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ExperienceItem } from "@/components/experience/experience-item";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="experience-title"
          tier="silver"
          title="Professional experience"
          description="Internships building production-oriented data and AI infrastructure. Expand an entry for contributions and engineering decisions, or open the case study."
        />
        <div className="relative">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-silver/50 via-border-strong to-transparent sm:left-[23px]" />
          <div className="flex flex-col gap-6">
            {experience.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05}>
                <ExperienceItem item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
