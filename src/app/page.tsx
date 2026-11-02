import { Hero } from "@/components/sections/hero";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ArchitectureSection } from "@/components/sections/architecture-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { NotesSection } from "@/components/sections/notes-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <ArchitectureSection />
      <SkillsSection />
      <NotesSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
