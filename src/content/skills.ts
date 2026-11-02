/*
 * Skills are grouped by engineering domain. `usedIn` records where each skill
 * was actually applied, which is how the page separates professional
 * experience from project work. Only skills found in the resume or README.
 */
export type Evidence = "Glynac AI" | "Springer Capital" | "Komsai.org" | "SolNexus";

export const professional: Evidence[] = ["Glynac AI", "Springer Capital", "Komsai.org"];

export type Skill = { name: string; usedIn: Evidence[] };

export type SkillGroup = { domain: string; summary: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    domain: "Languages",
    summary: "Primary languages for pipelines, transformations, and services.",
    skills: [
      { name: "Python", usedIn: ["Glynac AI", "Springer Capital", "SolNexus"] },
      { name: "SQL", usedIn: ["Springer Capital", "SolNexus"] },
      { name: "HTML / CSS / JavaScript", usedIn: ["Komsai.org"] },
    ],
  },
  {
    domain: "Data Engineering",
    summary: "Moving data reliably, modeling it, and keeping it trustworthy.",
    skills: [
      { name: "ETL / ELT pipelines", usedIn: ["Glynac AI", "Springer Capital", "SolNexus"] },
      { name: "Incremental ingestion", usedIn: ["Glynac AI"] },
      { name: "Apache Airflow", usedIn: ["Glynac AI", "SolNexus"] },
      { name: "dbt", usedIn: ["SolNexus"] },
      { name: "Data modeling", usedIn: ["SolNexus"] },
      { name: "Data validation", usedIn: ["SolNexus"] },
      { name: "Pandas", usedIn: [] },
      { name: "Data warehousing", usedIn: [] },
    ],
  },
  {
    domain: "Databases & Storage",
    summary: "Relational, vector, cache, and object storage.",
    skills: [
      { name: "PostgreSQL", usedIn: ["Glynac AI", "Springer Capital", "SolNexus"] },
      { name: "pgvector", usedIn: ["Springer Capital"] },
      { name: "MinIO", usedIn: ["Glynac AI", "Springer Capital"] },
      { name: "Redis", usedIn: ["Springer Capital"] },
      { name: "Alembic", usedIn: ["SolNexus"] },
    ],
  },
  {
    domain: "AI Infrastructure",
    summary: "The data layer underneath retrieval-augmented applications.",
    skills: [
      { name: "RAG pipelines", usedIn: ["Springer Capital"] },
      { name: "Embeddings · Sentence Transformers", usedIn: ["Springer Capital"] },
      { name: "Semantic search · HNSW", usedIn: ["Springer Capital"] },
      { name: "PII masking", usedIn: ["Glynac AI", "Springer Capital"] },
      { name: "Retrieval evaluation", usedIn: ["Springer Capital"] },
      { name: "LLM integration", usedIn: ["Springer Capital"] },
    ],
  },
  {
    domain: "Backend & APIs",
    summary: "Services and workers that serve and process data.",
    skills: [
      { name: "FastAPI", usedIn: ["Springer Capital", "SolNexus"] },
      { name: "Celery", usedIn: ["Springer Capital"] },
      { name: "Salesforce Bulk API 2.0", usedIn: ["Glynac AI"] },
      { name: "Gmail API", usedIn: ["SolNexus"] },
    ],
  },
  {
    domain: "Infrastructure & Workflow",
    summary: "Containers, version control, and team workflow.",
    skills: [
      { name: "Docker", usedIn: ["Glynac AI", "Springer Capital", "SolNexus"] },
      { name: "Docker Compose", usedIn: [] },
      { name: "Git / GitHub", usedIn: ["Komsai.org"] },
      { name: "Jira", usedIn: [] },
      { name: "Linux", usedIn: [] },
    ],
  },
];

/** Technologies being actively learned. Empty until confirmed. */
export const learning: string[] = [];
