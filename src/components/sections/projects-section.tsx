import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { getDiagram } from "@/content/architecture";
import type { Project } from "@/content/types";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { TagList } from "@/components/ui/tag";
import { StatusBadge } from "@/components/ui/badges";
import { Diagram } from "@/components/architecture/diagram";
import { GithubIcon } from "@/components/icons";

export function projectHref(p: Project) {
  return p.experienceSlug ? `/experience/${p.experienceSlug}` : `/projects/${p.slug}`;
}

function ProjectCard({ project }: { project: Project }) {
  const diagram = project.diagram ? getDiagram(project.diagram) : undefined;
  const href = projectHref(project);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong">
      {diagram && (
        <div className="bg-grid relative border-b border-border bg-bg px-5 py-6">
          <Diagram diagram={diagram} preview className="opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-2 left-3 font-mono text-[10px] text-fg-subtle">{diagram.title}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-gold">{project.category}</span>
            <span className="font-mono text-xs text-fg-subtle">{project.kind}</span>
          </div>
          <StatusBadge status={project.status} className="shrink-0" />
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-fg-muted">{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">{project.description}</p>
        <TagList items={project.tech} className="mt-5" />
        <div className="relative z-10 mt-auto flex items-center gap-4 pt-6 text-sm">
          <Link href={href} className="inline-flex items-center gap-1 font-medium text-fg hover:text-accent">
            Case study <ArrowUpRight className="size-4" />
          </Link>
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
            >
              <GithubIcon className="size-4" /> Repository
            </a>
          ) : (
            <span className="font-mono text-xs text-fg-subtle">Private repository</span>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">
              Live demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="projects-title"
          tier="gold"
          title="Engineering projects"
          description="End-to-end systems, from raw sources to the applications that serve them."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
