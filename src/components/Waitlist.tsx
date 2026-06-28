"use client";

import { useState } from "react";
import { track } from "@/lib/track";

type Status = "idle" | "submitting" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid || status === "submitting") return;
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setMessage("You're on the list. Setup guide is on its way.");
      track("waitlist_submitted");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
        {message}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="flex-1 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
          aria-label="Email address"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || status === "submitting"}
          className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "submitting" ? "..." : "Get the setup guide"}
        </button>
      </div>
      {status === "error" && <p className="text-xs text-red-400">{message}</p>}
      <p className="text-xs text-white/40">
        No spam. Setup tips and release notes for Iranti.{" "}
        <a href="/privacy" className="underline hover:text-white/60">Privacy</a>.
      </p>
    </div>
  );
}
