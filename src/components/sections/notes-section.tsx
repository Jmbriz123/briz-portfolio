import { ArrowUpRight } from "lucide-react";
import { notes } from "@/content/notes";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export function NotesSection() {
  return (
    <section id="notes" aria-labelledby="notes-title" className="border-t border-border py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="notes-title"
          eyebrow="notes / writing"
          title="Engineering notes"
          description="Write-ups on the problems I've worked through. These are in progress and will be published here as they're finished."
        />
        <Reveal>
          <ol className="divide-y divide-border border-y border-border">
            {notes.map((note) => {
              const content = (
                <>
                  <span className="font-mono text-xs text-fg-subtle sm:w-36 sm:shrink-0">{note.topic}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-medium text-fg">{note.title}</span>
                    <span className="mt-1 block text-sm text-fg-muted">{note.summary}</span>
                  </span>
                  {note.href ? (
                    <span className="flex items-center gap-1 font-mono text-xs text-accent">
                      {note.published} <ArrowUpRight className="size-3.5" />
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-dashed border-border-strong px-2 py-0.5 font-mono text-[10.5px] text-fg-subtle">
                      Forthcoming
                    </span>
                  )}
                </>
              );
              const row = "flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-6";
              return (
                <li key={note.title}>
                  {note.href ? (
                    <a href={note.href} className={`${row} transition-colors hover:bg-surface`}>
                      {content}
                    </a>
                  ) : (
                    <div className={row}>{content}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
