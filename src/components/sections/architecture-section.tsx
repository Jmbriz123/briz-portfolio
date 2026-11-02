import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ArchitectureShowcase } from "@/components/architecture/architecture-showcase";

export function ArchitectureSection() {
  return (
    <section id="architecture" aria-labelledby="architecture-title" className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="architecture-title"
          tier="gold"
          title="Architecture"
          description="How the systems I've worked on fit together. Select any component to see what it does and how it's built. Diagrams show components and data flow only; no proprietary details."
        />
        <Reveal>
          <ArchitectureShowcase />
        </Reveal>
      </Container>
    </section>
  );
}
