import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudyView } from "@/components/case-study/case-study-view";
import { ButtonLink } from "@/components/ui/button-link";
import { GithubIcon } from "@/components/icons";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy && !p.experienceSlug).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name}: ${project.tagline}`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const outcomes = project.planned?.length
    ? [...study.outcomes, `Planned next: ${project.planned.join(", ")}.`]
    : study.outcomes;

  return (
    <CaseStudyView
      tier={project.tier}
      title={project.name}
      subtitle={project.tagline}
      meta={[project.category, project.kind]}
      status={project.status}
      backHref="/#projects"
      tech={project.tech}
      study={{ ...study, outcomes }}
      links={
        <>
          {project.repo && (
            <ButtonLink href={project.repo} variant="secondary" external>
              <GithubIcon className="size-4" /> Repository
            </ButtonLink>
          )}
          {project.demo && (
            <ButtonLink href={project.demo} variant="secondary" external>
              Live demo
            </ButtonLink>
          )}
        </>
      }
    />
  );
}
