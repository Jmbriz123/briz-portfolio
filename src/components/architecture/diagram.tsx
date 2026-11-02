"use client";

import { useId, useState } from "react";
import type { Diagram as DiagramData, DiagramEdge, DiagramNode } from "@/content/architecture";
import { StatusBadge } from "@/components/ui/badges";
import { TagList } from "@/components/ui/tag";
import { cn } from "@/lib/cn";

const COL_W = 196;
const ROW_H = 112;
const NODE_W = 160;
const NODE_H = 60;
const PAD = 16;

const layerColor: Record<NonNullable<DiagramNode["layer"]>, string> = {
  source: "var(--fg-subtle)",
  bronze: "var(--bronze)",
  silver: "var(--silver)",
  gold: "var(--gold)",
  serving: "var(--accent)",
  control: "var(--progress)",
};

const layerLabel: Record<NonNullable<DiagramNode["layer"]>, string> = {
  source: "Source",
  bronze: "Raw / ingest",
  silver: "Transform",
  gold: "Curated / retrieval",
  serving: "Serving",
  control: "Orchestration",
};

function box(n: DiagramNode) {
  const x = PAD + n.col * COL_W;
  const y = PAD + n.row * ROW_H;
  return { x, y, cx: x + NODE_W / 2, cy: y + NODE_H / 2, r: x + NODE_W, b: y + NODE_H };
}

/**
 * Orthogonal edge routing on the grid. Same row → straight horizontal,
 * same column → straight vertical, otherwise an elbow. Diagonals default to
 * vertical-first through the gap between rows; `route: "h"` goes sideways first.
 */
function edgePath(from: DiagramNode, to: DiagramNode, route: "v" | "h" = "v", offset: [number, number] = [0, 0]) {
  const a = box(from);
  const b = box(to);
  a.cx += offset[0];
  b.cx += offset[1];
  if (from.row === to.row) {
    const right = to.col > from.col;
    return `M ${right ? a.r : a.x} ${a.cy} H ${right ? b.x : b.r}`;
  }
  const down = to.row > from.row;
  if (from.col === to.col) {
    return `M ${a.cx} ${down ? a.b : a.y} V ${down ? b.y : b.b}`;
  }
  if (route === "h") {
    const right = to.col > from.col;
    return `M ${right ? a.r : a.x} ${a.cy} H ${b.cx} V ${down ? b.y : b.b}`;
  }
  const midY = down ? (a.b + b.y) / 2 : (a.y + b.b) / 2;
  return `M ${a.cx} ${down ? a.b : a.y} V ${midY} H ${b.cx} V ${down ? b.y : b.b}`;
}

function labelPoint(from: DiagramNode, to: DiagramNode) {
  const a = box(from);
  const b = box(to);
  if (from.row === to.row) return { x: (Math.min(a.r, b.r) + Math.max(a.x, b.x)) / 2, y: a.cy - 7 };
  if (from.col === to.col) return { x: a.cx + 8, y: (a.cy + b.cy) / 2, anchor: "start" as const };
  const down = to.row > from.row;
  return { x: (a.cx + b.cx) / 2, y: (down ? (a.b + b.y) / 2 : (a.y + b.b) / 2) - 5 };
}

type Props = {
  diagram: DiagramData;
  /** Preview mode: static, no labels or interaction (used on project cards). */
  preview?: boolean;
  className?: string;
};

export function Diagram({ diagram, preview = false, className }: Props) {
  const uid = useId();
  const [selectedId, setSelectedId] = useState(diagram.nodes[0]?.id);
  const selected = diagram.nodes.find((n) => n.id === selectedId);
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));

  const width = PAD * 2 + (diagram.cols - 1) * COL_W + NODE_W;
  const height = PAD * 2 + (diagram.rows - 1) * ROW_H + NODE_H;
  const arrowId = `${uid}-arrow`;
  const layers = [...new Set(diagram.nodes.map((n) => n.layer).filter(Boolean))] as NonNullable<DiagramNode["layer"]>[];

  const svg = (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("block h-auto w-full", !preview && "min-w-[720px]")}
      role={preview ? undefined : "group"}
      aria-hidden={preview || undefined}
      aria-label={preview ? undefined : `${diagram.title} diagram`}
    >
      <defs>
        <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--fg-subtle)" />
        </marker>
      </defs>

      {diagram.edges.map((e: DiagramEdge) => {
        const from = byId.get(e.from);
        const to = byId.get(e.to);
        if (!from || !to) return null;
        const d = edgePath(from, to, e.route, e.offset);
        const active = !preview && (selectedId === e.from || selectedId === e.to);
        const lp = labelPoint(from, to);
        return (
          <g key={`${e.from}-${e.to}`}>
            <path
              d={d}
              fill="none"
              stroke={active ? "var(--fg-muted)" : "var(--border-strong)"}
              strokeWidth={1.25}
              strokeDasharray={e.dashed ? "4 4" : undefined}
              markerEnd={`url(#${arrowId})`}
              className="transition-[stroke] duration-200"
            />
            {!preview && !e.dashed && (
              <path d={d} fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeOpacity={active ? 0.9 : 0.35} className="edge-flow" />
            )}
            {!preview && e.label && (
              <text
                x={lp.x}
                y={lp.y}
                textAnchor={lp.anchor ?? "middle"}
                className="fill-fg-subtle font-mono"
                fontSize={10}
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {diagram.nodes.map((n) => {
        const { x, y } = box(n);
        const color = layerColor[n.layer ?? "source"];
        const isSelected = !preview && n.id === selectedId;
        const planned = n.status === "planned";
        return (
          <g
            key={n.id}
            transform={`translate(${x} ${y})`}
            {...(preview
              ? {}
              : {
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": isSelected,
                  "aria-label": `${n.label}${n.sublabel ? `, ${n.sublabel}` : ""} (${n.status.replace("-", " ")})`,
                  onClick: () => setSelectedId(n.id),
                  onFocus: () => setSelectedId(n.id),
                  onMouseEnter: () => setSelectedId(n.id),
                  onKeyDown: (ev: React.KeyboardEvent) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      setSelectedId(n.id);
                    }
                  },
                  className: "cursor-pointer outline-none",
                })}
            opacity={planned ? 0.55 : 1}
          >
            <rect
              width={NODE_W}
              height={NODE_H}
              rx={10}
              fill={isSelected ? "var(--surface-2)" : "var(--surface)"}
              stroke={isSelected ? "var(--accent)" : "var(--border-strong)"}
              strokeWidth={isSelected ? 1.5 : 1}
              strokeDasharray={planned ? "4 3" : undefined}
              className="transition-[stroke,fill] duration-200"
            />
            <rect x={0} y={14} width={2.5} height={NODE_H - 28} rx={1.25} fill={color} />
            <text x={14} y={n.sublabel ? 26 : 35} fontSize={13} fontWeight={500} className="fill-fg">
              {n.label}
            </text>
            {n.sublabel && (
              <text x={14} y={44} fontSize={10.5} className="fill-fg-subtle font-mono">
                {n.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );

  if (preview) return <div className={className}>{svg}</div>;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-bg", className)}>
      <div className="bg-grid relative overflow-x-auto p-3 sm:p-5">{svg}</div>
      <p className="border-t border-border px-4 py-2 font-mono text-[11px] text-fg-subtle sm:hidden">
        Scroll sideways · tap a component for details
      </p>

      <div className="grid gap-6 border-t border-border bg-surface p-5 sm:p-6 md:grid-cols-[1fr_auto]">
        <div aria-live="polite" className="min-h-[7.5rem]">
          {selected && (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="text-base font-semibold text-fg">{selected.label}</h4>
                <StatusBadge status={selected.status} />
                {selected.layer && (
                  <span className="font-mono text-[11px] text-fg-subtle">{layerLabel[selected.layer]}</span>
                )}
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">{selected.description}</p>
              {selected.tech && <TagList items={selected.tech} className="mt-3" />}
            </>
          )}
        </div>
        <ul className="flex flex-wrap content-start gap-x-4 gap-y-2 md:max-w-[15rem] md:flex-col" aria-label="Legend">
          {layers.map((l) => (
            <li key={l} className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
              <span aria-hidden className="h-3 w-[3px] rounded-full" style={{ background: layerColor[l] }} />
              {layerLabel[l]}
            </li>
          ))}
          <li className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
            <span aria-hidden className="h-0 w-4 border-t border-dashed border-fg-subtle" />
            Planned / control flow
          </li>
        </ul>
      </div>
      {diagram.notes && (
        <p className="border-t border-border px-5 py-3 text-xs text-fg-subtle sm:px-6">{diagram.notes}</p>
      )}
    </div>
  );
}
