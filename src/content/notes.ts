/*
 * Engineering notes. All entries are forthcoming: none are published yet.
 * When an article is written, add `href` and `published` (ISO date).
 */
export type Note = {
  title: string;
  summary: string;
  topic: string;
  href?: string;
  published?: string;
};

export const notes: Note[] = [
  {
    title: "Designing incremental ingestion pipelines",
    summary: "Watermarks, deletions, and resumability: what changes when a pipeline can't afford full reloads.",
    topic: "Ingestion",
  },
  {
    title: "Bronze and Silver, in practice",
    summary: "What belongs in a raw layer, what belongs in a cleaned one, and why keeping raw data raw pays off.",
    topic: "Architecture",
  },
  {
    title: "Identity resolution with a human in the loop",
    summary: "Linking communication participants to the right records without silently attaching data to the wrong lead.",
    topic: "Data quality",
  },
  {
    title: "PII protection inside data pipelines",
    summary: "Where masking belongs in a pipeline that feeds embeddings and external LLMs.",
    topic: "Privacy",
  },
  {
    title: "Building a RAG document processing system",
    summary: "Extraction, chunking, embeddings, pgvector, and measuring retrieval before trusting it.",
    topic: "AI infrastructure",
  },
];
