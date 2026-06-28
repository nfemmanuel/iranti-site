"use client";

import { useState } from "react";
import { track } from "@/lib/track";

interface CopyCommandProps {
  command: string;
  label: string;
}

export function CopyCommand({ command, label }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {}
    setCopied(true);
    track("install_copied", { command: label });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-left transition hover:border-white/20"
      aria-label={`Copy command: ${command}`}
    >
      <span className="truncate">
        <span className="select-none text-white/40">$ </span>
        {command}
      </span>
      <span className="shrink-0 text-xs text-white/50 group-hover:text-white/80">
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
