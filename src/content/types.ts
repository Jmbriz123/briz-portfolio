import type { Tier } from "@/lib/tiers";

/** Delivery state, used everywhere so unfinished work is never shown as done. */
export type Status = "built" | "in-progress" | "planned";

/**
 * Who did the work. Keep this honest: `personal` = implemented by Jemarco,
 * `team` = delivered by the wider team, `participated` = contributed to.
 */
export type Scope = "personal" | "team" | "participated";

export type Contribution = {
  text: string;
  scope: Scope;
  status?: Status;
};

export type Decision = {
  title: string;
  body: string;
};

export type CaseStudy = {
  overview: string;
  problem: string;
  /** Id of a diagram in `architecture.ts`. */
  diagram?: string;
  contributions: Contribution[];
  decisions: Decision[];
  outcomes: string[];
  /** Personal reflections. Left empty until written by Jemarco. */
  lessons: string[];
};

export type Experience = {
  slug: string;
  company: string;
  /** Path under /public, e.g. "/logos/glynac.svg". Falls back to a monogram. */
  logo?: string;
  /** Monogram override when initials of the name would mislead. */
  monogram?: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  /** One-line company / project context shown on the card. */
  context: string;
  highlights: string[];
  tech: string[];
  caseStudy?: CaseStudy;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  tier: Tier;
  status: Status;
  /** e.g. "Team project", "Internship project". */
  kind: string;
  description: string;
  tech: string[];
  diagram?: string;
  repo?: string;
  demo?: string;
  /** Points to an experience case study instead of a project page. */
  experienceSlug?: string;
  caseStudy?: CaseStudy;
  planned?: string[];
};
