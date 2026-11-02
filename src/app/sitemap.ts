import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  return [
    { url: base, priority: 1 },
    ...experience.filter((e) => e.caseStudy).map((e) => ({ url: `${base}/experience/${e.slug}`, priority: 0.8 })),
    ...projects
      .filter((p) => p.caseStudy && !p.experienceSlug)
      .map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.8 })),
  ];
}
