import type { Status } from "./types";

/*
 * Architecture diagrams. Every node maps to a component named in the resume
 * or README; nothing is added for visual balance. Positions are grid cells
 * (col, row) that the renderer converts to coordinates.
 */
export type DiagramNode = {
  id: string;
  label: string;
  sublabel?: string;
  col: number;
  row: number;
  status: Status;
  description: string;
  tech?: string[];
  /** Visual group, used for the lane colour. */
  layer?: "source" | "bronze" | "silver" | "gold" | "serving" | "control";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  /** Elbow routing for diagonal edges: vertical-first (default) or horizontal-first. */
  route?: "v" | "h";
  /** Horizontal shift (px) of the [source, target] attachment points, to separate shared ports. */
  offset?: [number, number];
};

export type Diagram = {
  id: string;
  title: string;
  project: string;
  summary: string;
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** Stack items that are confirmed but not yet placed in the flow. */
  notes?: string;
};

export const diagrams: Diagram[] = [
  {
    id: "solnexus-medallion",
    title: "Bronze → Silver medallion pipeline",
    project: "SolNexus",
    summary:
      "Email and spreadsheet data land raw in a Bronze layer, dbt builds structured Silver models, and staff work with the result through an authenticated dashboard. Airflow schedules ingestion and transformation.",
    cols: 5,
    rows: 3,
    nodes: [
      {
        id: "airflow",
        label: "Apache Airflow",
        sublabel: "scheduling · retries",
        col: 1.5,
        row: 0,
        status: "built",
        layer: "control",
        description:
          "Schedules ingestion and transformation workflows, with retry mechanisms for failure handling.",
        tech: ["Apache Airflow"],
      },
      {
        id: "gmail",
        label: "Gmail API",
        sublabel: "automated ingestion",
        col: 0,
        row: 1,
        status: "built",
        layer: "source",
        description: "Automated ingestion of client communication from Gmail.",
        tech: ["Python", "Gmail API"],
      },
      {
        id: "sheets",
        label: "Spreadsheets",
        sublabel: "one-time migration",
        col: 0,
        row: 2,
        status: "built",
        layer: "source",
        description: "Migration of existing spreadsheet-based lead records into the platform.",
        tech: ["Python"],
      },
      {
        id: "messenger",
        label: "Messenger · Viber",
        sublabel: "phase 2",
        col: 0,
        row: 0,
        status: "planned",
        layer: "source",
        description: "Planned Phase 2 sources: Facebook Messenger and Viber ingestion.",
      },
      {
        id: "bronze",
        label: "Bronze",
        sublabel: "raw · PostgreSQL",
        col: 1,
        row: 1,
        status: "built",
        layer: "bronze",
        description:
          "Raw message storage in PostgreSQL that preserves source information, timestamps, and data provenance.",
        tech: ["PostgreSQL", "Alembic"],
      },
      {
        id: "silver",
        label: "Silver",
        sublabel: "dbt models",
        col: 2,
        row: 1,
        status: "built",
        layer: "silver",
        description:
          "dbt transformation models that normalize, deduplicate, and structure raw data into relational lead and interaction datasets, with validation and audit trails.",
        tech: ["dbt", "PostgreSQL"],
      },
      {
        id: "gold",
        label: "Gold",
        sublabel: "analytics · phase 2",
        col: 3,
        row: 0,
        status: "planned",
        layer: "gold",
        description: "Planned Phase 2 Gold-layer analytics built on the Silver models.",
      },
      {
        id: "identity",
        label: "Identity resolution",
        sublabel: "staff-confirmed",
        col: 2,
        row: 2,
        status: "built",
        layer: "silver",
        description:
          "Staff-confirmed mapping that associates external communication participants with the correct clinic records, preventing incorrect lead associations.",
      },
      {
        id: "api",
        label: "FastAPI",
        sublabel: "REST backend",
        col: 3,
        row: 1,
        status: "built",
        layer: "serving",
        description: "REST backend that exposes structured lead and interaction data.",
        tech: ["FastAPI", "Python"],
      },
      {
        id: "dashboard",
        label: "Dashboard",
        sublabel: "React · auth",
        col: 4,
        row: 1,
        status: "built",
        layer: "serving",
        description:
          "Authenticated React dashboard with prioritized follow-up views, searchable lead history, and editable lead records for SolTech staff.",
        tech: ["React"],
      },
    ],
    edges: [
      { from: "gmail", to: "bronze" },
      { from: "sheets", to: "bronze" },
      { from: "messenger", to: "bronze", dashed: true, offset: [0, -28] },
      { from: "bronze", to: "silver", label: "dbt" },
      { from: "silver", to: "gold", dashed: true, offset: [28, 0] },
      { from: "silver", to: "api" },
      { from: "identity", to: "silver" },
      { from: "api", to: "dashboard" },
      { from: "airflow", to: "bronze", dashed: true },
      { from: "airflow", to: "silver", dashed: true, offset: [0, -28] },
    ],
    notes: "Planned for Phase 2: LLM-based information extraction and pipeline failure alerting.",
  },
  {
    id: "springer-rag",
    title: "Document processing & RAG pipeline",
    project: "AI Compliance Review · Springer Capital",
    summary:
      "Documents are processed asynchronously by Celery workers: text is extracted, PII is masked, and masked text is chunked and embedded into pgvector. At analysis time, relevant rules and precedent are retrieved, passed to the LLM, and the output is grounding-checked before it is persisted.",
    cols: 5,
    rows: 3,
    nodes: [
      {
        id: "api",
        label: "FastAPI",
        sublabel: "API layer",
        col: 0,
        row: 0,
        status: "built",
        layer: "control",
        description:
          "The API layer accepts requests and hands heavy work to background workers, so AI processing never blocks a request.",
        tech: ["FastAPI"],
      },
      {
        id: "queue",
        label: "Redis",
        sublabel: "task broker",
        col: 1,
        row: 0,
        status: "built",
        layer: "control",
        description: "Redis brokers tasks between the API and the Celery workers.",
        tech: ["Redis"],
      },
      {
        id: "workers",
        label: "Celery workers",
        sublabel: "async processing",
        col: 2,
        row: 0,
        status: "built",
        layer: "control",
        description:
          "Asynchronous workers run the computationally intensive pipeline stages, decoupled from the API.",
        tech: ["Celery"],
      },
      {
        id: "extract",
        label: "Extraction",
        sublabel: "ingest · parse",
        col: 0,
        row: 1,
        status: "built",
        layer: "bronze",
        description: "Document ingestion and text extraction.",
        tech: ["Python"],
      },
      {
        id: "mask",
        label: "PII masking",
        sublabel: "before embed / LLM",
        col: 1,
        row: 1,
        status: "built",
        layer: "silver",
        description:
          "Personal data is masked before embedding generation and before any external LLM call, so it never reaches the vector store or a third party.",
      },
      {
        id: "chunk",
        label: "Semantic chunking",
        col: 2,
        row: 1,
        status: "built",
        layer: "silver",
        description: "Masked text is split into semantically coherent chunks for embedding.",
      },
      {
        id: "embed",
        label: "Embeddings",
        sublabel: "Sentence Transformers",
        col: 3,
        row: 1,
        status: "built",
        layer: "silver",
        description: "Chunks are embedded with Sentence Transformers.",
        tech: ["Sentence Transformers"],
      },
      {
        id: "vector",
        label: "pgvector",
        sublabel: "HNSW index",
        col: 4,
        row: 1,
        status: "built",
        layer: "gold",
        description:
          "Embeddings are stored in PostgreSQL with pgvector, using an HNSW index for efficient semantic similarity search over compliance rules and precedent.",
        tech: ["PostgreSQL", "pgvector"],
      },
      {
        id: "retrieve",
        label: "Retrieval",
        sublabel: "rules · precedent",
        col: 4,
        row: 2,
        status: "built",
        layer: "gold",
        description:
          "Semantic search retrieves relevant compliance rules and precedent. Retrieval quality was evaluated on reviewer-labeled data with precision, recall, and F1.",
      },
      {
        id: "llm",
        label: "LLM analysis",
        sublabel: "masked context",
        col: 3,
        row: 2,
        status: "built",
        layer: "serving",
        description: "An LLM generates compliance analysis from the masked document and the retrieved context.",
      },
      {
        id: "grounding",
        label: "Grounding checks",
        sublabel: "safe failure",
        col: 2,
        row: 2,
        status: "built",
        layer: "serving",
        description:
          "Generated analysis is checked for grounding, with safer failure handling when output isn't supported.",
      },
      {
        id: "persist",
        label: "Persistence",
        sublabel: "PostgreSQL",
        col: 1,
        row: 2,
        status: "built",
        layer: "serving",
        description: "Results are persisted for review.",
        tech: ["PostgreSQL"],
      },
    ],
    edges: [
      { from: "api", to: "queue", label: "enqueue" },
      { from: "queue", to: "workers" },
      { from: "workers", to: "extract", dashed: true, label: "runs" },
      { from: "extract", to: "mask" },
      { from: "mask", to: "chunk" },
      { from: "chunk", to: "embed" },
      { from: "embed", to: "vector" },
      { from: "vector", to: "retrieve" },
      { from: "retrieve", to: "llm" },
      { from: "llm", to: "grounding" },
      { from: "grounding", to: "persist" },
    ],
    notes: "MinIO and Docker are also part of the stack.",
  },
  {
    id: "glynac-ingestion",
    title: "Incremental CRM ingestion",
    project: "Glynac AI",
    summary:
      "Salesforce data is pulled through the Bulk API 2.0 using SystemModstamp watermarks, deletions are reconciled, PII is masked and records deduplicated, and the result lands in a MinIO-based Bronze layer. Work in progress.",
    cols: 5,
    rows: 2,
    nodes: [
      {
        id: "sf",
        label: "Salesforce",
        sublabel: "CRM source",
        col: 0,
        row: 0,
        status: "in-progress",
        layer: "source",
        description: "Salesforce CRM, the source system.",
      },
      {
        id: "bulk",
        label: "Bulk API 2.0",
        sublabel: "extract jobs",
        col: 1,
        row: 0,
        status: "in-progress",
        layer: "bronze",
        description: "Data is extracted through Salesforce Bulk API 2.0 jobs.",
        tech: ["Salesforce Bulk API 2.0", "Python"],
      },
      {
        id: "watermark",
        label: "Incremental sync",
        sublabel: "SystemModstamp",
        col: 2,
        row: 0,
        status: "in-progress",
        layer: "bronze",
        description: "Only records modified since the last SystemModstamp watermark are synchronized.",
      },
      {
        id: "resume",
        label: "Resumable state",
        sublabel: "restart safely",
        col: 1,
        row: 1,
        status: "in-progress",
        layer: "control",
        description: "Ingestion can resume after an interruption instead of starting over.",
      },
      {
        id: "deletes",
        label: "Deletion handling",
        col: 2,
        row: 1,
        status: "in-progress",
        layer: "bronze",
        description: "Records deleted in Salesforce are handled so the stored data stays consistent with the source.",
      },
      {
        id: "mask",
        label: "PII masking",
        sublabel: "+ deduplication",
        col: 3,
        row: 0,
        status: "in-progress",
        layer: "silver",
        description: "PII is masked and records are deduplicated before persistence.",
      },
      {
        id: "minio",
        label: "Bronze layer",
        sublabel: "MinIO",
        col: 4,
        row: 0,
        status: "in-progress",
        layer: "bronze",
        description: "Ingested CRM data lands in a structured MinIO-based Bronze storage layer.",
        tech: ["MinIO"],
      },
    ],
    edges: [
      { from: "sf", to: "bulk" },
      { from: "bulk", to: "watermark" },
      { from: "watermark", to: "mask" },
      { from: "mask", to: "minio" },
      { from: "resume", to: "bulk", dashed: true },
      { from: "watermark", to: "deletes", dashed: true },
      { from: "deletes", to: "mask", route: "h" },
    ],
    notes: "PostgreSQL, Apache Airflow, and Docker are also part of the stack.",
  },
];

export function getDiagram(id: string) {
  return diagrams.find((d) => d.id === id);
}
