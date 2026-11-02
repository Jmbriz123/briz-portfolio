"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-border-strong bg-surface px-4 font-mono text-sm text-fg transition-colors hover:border-fg-subtle"
    >
      {email}
      {copied ? <Check aria-hidden className="size-4 text-accent" /> : <Copy aria-hidden className="size-4 text-fg-subtle" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : "Copy email address"}
      </span>
    </button>
  );
}
