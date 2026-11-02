"use client";

import { useState } from "react";
import { diagrams } from "@/content/architecture";
import { Diagram } from "./diagram";
import { cn } from "@/lib/cn";

export function ArchitectureShowcase() {
  const [activeId, setActiveId] = useState(diagrams[0].id);
  const active = diagrams.find((d) => d.id === activeId) ?? diagrams[0];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = diagrams[(index + delta + diagrams.length) % diagrams.length];
    setActiveId(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Architecture diagrams" className="flex gap-1 overflow-x-auto border-b border-border">
        {diagrams.map((d, i) => {
          const selected = d.id === activeId;
          return (
            <button
              key={d.id}
              id={`tab-${d.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${d.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(d.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "-mb-px shrink-0 border-b-2 px-4 py-3 text-left transition-colors",
                selected ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              <span className="block text-sm font-medium">{d.title}</span>
              <span className="block font-mono text-[11px] text-fg-subtle">{d.project}</span>
            </button>
          );
        })}
      </div>
      <div id={`panel-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`} className="pt-6">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-fg-muted">{active.summary}</p>
        {/* Keyed so the selected node resets when switching diagrams. */}
        <Diagram key={active.id} diagram={active} />
      </div>
    </div>
  );
}
