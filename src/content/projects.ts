import type { Project } from "./types";

/*
 * SolNexus is a work in progress: its README describes components as being
 * built, so nothing here claims completion. Phase 2 items are `planned`.
 */
export const projects: Project[] = [
  {
    slug: "solnexus",
    name: "SolNexus",
    tagline: "Unified lead and client communication pipeline for SolTech EMR",
    category: "Data Engineering",
    tier: "gold",
    status: "in-progress",
    kind: "Team project",
    description:
      "Centralizes SolTech's fragmented clinic lead and client communication data into one structured, searchable system, replacing spreadsheet-based lead tracking with an orchestrated Bronze → Silver pipeline and an authenticated staff dashboard. I implemented the data engineering work; teammates built the frontend.",
    tech: ["Python", "PostgreSQL", "Apache Airflow", "dbt", "FastAPI", "React", "Alembic", "Docker", "Gmail API"],
    diagram: "solnexus-medallion",
    repo: "https://github.com/CMSC128-NexusWorks/SolNexus",
    caseStudy: {
      overview:
        "SolTech EMR tracked clinic leads and client conversations in spreadsheets and inboxes. SolNexus is a team-built data integration platform that consolidates those sources into a unified, structured, and searchable system, with a dashboard for managing clinic relationships, follow-ups, and communication history. I implemented the data engineering side: ingestion, the Bronze and Silver layers, orchestration, and identity resolution. The frontend was built by teammates.",
      problem:
        "Lead records lived in manual spreadsheets while the actual conversations lived in email. Nothing linked an email participant to the right clinic, follow-ups were hard to prioritize, and there was no reliable history of who said what and when.",
      diagram: "solnexus-medallion",
      contributions: [
        {
          text: "Multi-source ingestion: automated Gmail API ingestion and spreadsheet migration that consolidate existing lead records and communication data.",
          scope: "personal",
          status: "built",
        },
        {
          text: "Bronze layer: raw message storage in PostgreSQL that preserves source, timestamps, and provenance.",
          scope: "personal",
          status: "built",
        },
        {
          text: "Silver layer: dbt models that normalize, deduplicate, and structure raw data into relational lead and interaction datasets.",
          scope: "personal",
          status: "built",
        },
        {
          text: "Orchestration: Apache Airflow DAGs that schedule ingestion and transformation, with retries for failure handling.",
          scope: "personal",
          status: "built",
        },
        {
          text: "Identity resolution: staff-confirmed mapping between external communication participants and clinic records, to prevent incorrect lead associations.",
          scope: "personal",
          status: "built",
        },
        {
          text: "Data integrity: validation, deduplication, audit trails, and safeguards that preserve operational data across pipeline rebuilds.",
          scope: "personal",
        },
        {
          text: "Serving layer: FastAPI REST backend, authentication, and a React dashboard with prioritized follow-ups, searchable lead history, and editable lead records.",
          scope: "team",
          status: "built",
        },
      ],
      decisions: [
        {
          title: "Keep raw data raw",
          body: "The Bronze layer stores messages as received, with source and timestamps, so Silver models can be rebuilt from history at any time.",
        },
        {
          title: "Transformations as dbt models",
          body: "Normalization and deduplication live in dbt models rather than ad-hoc scripts, so the Silver layer can be rebuilt from Bronze reproducibly.",
        },
        {
          title: "Humans confirm identities",
          body: "Automatically linking an email sender to a clinic can attach a conversation to the wrong lead. Identity mappings are confirmed by SolTech staff instead.",
        },
        {
          title: "Operational edits survive rebuilds",
          body: "Staff edit lead records in the dashboard, so the pipeline is designed so that rebuilding derived tables does not discard that operational data.",
        },
      ],
      outcomes: [
        "Phase 1 is built: Gmail and spreadsheet ingestion, Bronze and Silver layers, Airflow orchestration, identity resolution, the FastAPI backend, authentication, and the React dashboard.",
        "The project is still in progress, with Phase 2 extensions planned.",
      ],
      lessons: [],
    },
    planned: [
      "Facebook Messenger and Viber ingestion",
      "LLM-based information extraction",
      "Gold-layer analytics",
      "Pipeline failure alerting",
    ],
  },
  {
    slug: "ai-compliance-review",
    name: "AI Compliance Document Review Platform",
    tagline: "Document processing and RAG infrastructure for compliance analysis",
    category: "AI Infrastructure",
    tier: "silver",
    status: "built",
    kind: "Internship project · Springer Capital",
    description:
      "An AI-powered platform that analyzes compliance documents, retrieves relevant regulatory rules and precedent, and generates AI-assisted analysis. I built its document processing and RAG pipeline: extraction, PII masking, chunking, embeddings, pgvector retrieval, and asynchronous workers.",
    tech: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Sentence Transformers", "Celery", "Redis", "MinIO", "Docker"],
    diagram: "springer-rag",
    experienceSlug: "springer-capital",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
