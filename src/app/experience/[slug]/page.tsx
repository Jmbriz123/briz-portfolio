import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experience, getExperience } from "@/content/experience";
import { CaseStudyView } from "@/components/case-study/case-study-view";

export function generateStaticParams() {
  return experience.filter((e) => e.caseStudy).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experience/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item) return {};
  return {
    title: `${item.role} at ${item.company}`,
    description: item.context,
    alternates: { canonical: `/experience/${item.slug}` },
  };
}

export default async function ExperiencePage({ params }: PageProps<"/experience/[slug]">) {
  const { slug } = await params;
  const item = getExperience(slug);
  if (!item?.caseStudy) notFound();

  return (
    <CaseStudyView
      tier="silver"
      title={item.company}
      subtitle={item.context}
      meta={[item.role, `${item.start} — ${item.end}`, item.location]}
      status={item.current ? "in-progress" : undefined}
      backHref="/#experience"
      tech={item.tech}
      study={item.caseStudy}
    />
  );
}
