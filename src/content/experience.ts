import type { Experience } from "./types";

/*
 * Sources: resume (2026) and GitHub profile README.
 * Glynac work is ongoing, so every contribution is marked in-progress.
 */
export const experience: Experience[] = [
  {
    slug: "glynac-ai",
    company: "Glynac AI",
    role: "Data Engineer Intern",
    location: "Remote · United States",
    start: "Oct 2026",
    end: "Present",
    current: true,
    context: "Salesforce CRM data ingestion infrastructure for downstream AI-powered intelligence applications.",
    highlights: [
      "Building Salesforce data ingestion pipelines on the Bulk API 2.0.",
      "Implementing incremental sync with SystemModstamp watermarks, deletion handling, and resumable ingestion.",
      "Working on PII masking and deduplication before any data is persisted.",
      "Landing ingested CRM data in a structured, MinIO-based Bronze storage layer.",
    ],
    tech: ["Python", "Salesforce Bulk API 2.0", "PostgreSQL", "MinIO", "Apache Airflow", "Docker"],
    caseStudy: {
      overview:
        "At Glynac AI, the internship focuses on Salesforce CRM ingestion infrastructure that feeds downstream AI-powered intelligence applications: getting data out reliably, incrementally, and with personal data protected before it lands in storage.",
      problem:
        "CRM data changes continuously and records are also deleted. Re-extracting full objects is slow and wasteful, interrupted jobs should not have to start over, and raw CRM records contain personal information that must not reach storage unmasked.",
      diagram: "glynac-ingestion",
      contributions: [
        {
          text: "Building ingestion pipelines against the Salesforce Bulk API 2.0.",
          scope: "personal",
          status: "in-progress",
        },
        {
          text: "Implementing incremental synchronization driven by SystemModstamp watermarks.",
          scope: "personal",
          status: "in-progress",
        },
        {
          text: "Handling deleted records and making ingestion resumable after interruption.",
          scope: "personal",
          status: "in-progress",
        },
        {
          text: "Applying PII masking and deduplication before persistence.",
          scope: "personal",
          status: "in-progress",
        },
        {
          text: "Writing ingested CRM data into a MinIO-based Bronze layer.",
          scope: "personal",
          status: "in-progress",
        },
      ],
      decisions: [
        {
          title: "Watermark-based incremental extraction",
          body: "SystemModstamp acts as the high-water mark, so each run only requests records modified since the last successful sync instead of re-extracting entire objects.",
        },
        {
          title: "Deletions are a first-class concern",
          body: "A modified-since query alone does not remove records deleted at the source, so deletions are handled explicitly to keep the Bronze layer consistent with Salesforce.",
        },
        {
          title: "Mask before persist",
          body: "PII masking and deduplication happen before data is written, so raw personal data never lands in storage.",
        },
      ],
      outcomes: ["Work in progress. Outcomes will be added once the pipeline ships."],
      lessons: [],
    },
  },
  {
    slug: "springer-capital",
    company: "Springer Capital",
    role: "Data Engineer Intern",
    location: "Remote · United States",
    start: "Jun 2026",
    end: "Sep 2026",
    context:
      "Data and AI infrastructure for an AI-powered compliance document review platform, built by a cross-functional team.",
    highlights: [
      "Architected the end-to-end RAG pipeline: extraction, PII masking, semantic chunking, embeddings, vector retrieval, and LLM-based compliance analysis.",
      "Led a cross-functional engineering team, owning data architecture and system integration.",
      "Built an asynchronous worker pipeline with Celery and Redis that decouples AI processing from the API layer.",
      "Evaluated retrieval quality against reviewer-labeled data using precision, recall, and F1.",
    ],
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Sentence Transformers",
      "Celery",
      "Redis",
      "MinIO",
      "Docker",
    ],
    caseStudy: {
      overview:
        "A cross-functional team at Springer Capital built an AI-powered platform that analyzes compliance documents: it retrieves relevant regulatory rules and precedent, then generates AI-assisted compliance analysis. I led the team and owned the data architecture and system integration.",
      problem:
        "Compliance review means reading long documents against a large body of rules and past decisions. An assistant for that has to find the right rules reliably, keep personal data inside the platform, stay responsive while heavy AI workloads run, and fail safely when the model's answer isn't supported by the evidence.",
      diagram: "springer-rag",
      contributions: [
        {
          text: "Designed and implemented the end-to-end document processing pipeline: ingestion, extraction, PII masking, semantic chunking, embedding generation, retrieval, and persistence.",
          scope: "personal",
        },
        {
          text: "Built the RAG retrieval layer with PostgreSQL, pgvector, and Sentence Transformers for compliance-rule retrieval and precedent search.",
          scope: "personal",
        },
        {
          text: "Implemented HNSW vector indexing and semantic similarity search.",
          scope: "personal",
        },
        {
          text: "Orchestrated asynchronous document processing with Celery and Redis.",
          scope: "personal",
        },
        {
          text: "Masked PII before embedding generation and before any external LLM call.",
          scope: "personal",
        },
        {
          text: "Evaluated retrieval with reviewer-labeled datasets using precision, recall, and F1.",
          scope: "personal",
        },
        {
          text: "Implemented grounding checks and safer failure handling for generated analysis.",
          scope: "personal",
        },
        {
          text: "Led the cross-functional team and owned data architecture and system integration.",
          scope: "personal",
        },
        {
          text: "The wider platform (product features and interfaces beyond the data and RAG layer) was delivered by the team.",
          scope: "team",
        },
      ],
      decisions: [
        {
          title: "Mask PII before it leaves the boundary",
          body: "Masking runs before chunking and embedding, so personal data is never stored in vectors and never sent to an external LLM.",
        },
        {
          title: "Retrieval inside PostgreSQL",
          body: "pgvector keeps embeddings next to the relational data, and an HNSW index provides efficient approximate nearest-neighbour search without operating a separate vector database.",
        },
        {
          title: "Workers instead of request-time processing",
          body: "Extraction, embedding, and LLM inference are slow, so they run as Celery tasks via Redis. The FastAPI layer stays responsive and hands work off.",
        },
        {
          title: "Measure retrieval, then trust it",
          body: "Retrieval was scored against reviewer-labeled data with precision, recall, and F1, rather than judged by eye.",
        },
        {
          title: "Grounding checks and safe failure",
          body: "Generated analysis is checked against the retrieved evidence. When it isn't supported, the system fails safely instead of returning a confident but unsupported answer.",
        },
      ],
      outcomes: [
        "Delivered the document processing and RAG retrieval infrastructure behind the platform's compliance analysis.",
        "Established a retrieval evaluation workflow based on reviewer-labeled data.",
      ],
      lessons: [],
    },
  },
  {
    slug: "komsai-org",
    company: "UPV Komsai.org",
    role: "Web Developer",
    location: "Miagao, Iloilo",
    start: "Feb 2026",
    end: "Apr 2026",
    context: "Production website for UPV Komsai.org.",
    highlights: [
      "Developed and iterated on a production website with HTML, CSS, and JavaScript within an Agile team.",
      "Worked through feature branches, pull requests, code reviews, and structured commits on Git/GitHub.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Git", "GitHub"],
  },
];

export function getExperience(slug: string) {
  return experience.find((e) => e.slug === slug);
}
