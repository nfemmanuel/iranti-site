"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Failed to submit — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen px-6 py-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10l4 4 8-8" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            Thanks for the feedback.
          </h1>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            It goes directly to me. I read everything.
          </p>
          <a
            href="/"
            className="inline-flex mt-8 items-center gap-2 px-5 py-2.5 bg-amber-500 hover:opacity-90 text-[#080808] text-[13px] font-medium rounded-full transition-opacity"
          >
            Back to home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Feedback
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3 leading-tight">
          Share your experience.
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-10">
          Completely anonymous by default. If you&apos;d like me to follow up with
          you, feel free to leave your contact info. I&apos;d genuinely love to hear
          what&apos;s working and what isn&apos;t.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="What's your experience been? Anything you'd like to see done differently?"
              rows={6}
              maxLength={5000}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-faint)] font-sans resize-none focus:outline-none focus:border-teal-500/50 transition-colors"
            />
            <div className="text-right mt-1">
              <span className="text-xs font-mono text-[var(--text-faint)]">
                {body.length}/5000
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name (optional)"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-faint)] font-sans focus:outline-none focus:border-teal-500/50 transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email (optional)"
              maxLength={254}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-faint)] font-sans focus:outline-none focus:border-teal-500/50 transition-colors"
            />
          </div>
          <p className="text-xs text-[var(--text-faint)]">
            Leave your email if you&apos;d like me to reach out. I only use it to follow up with you.
          </p>

          <div className="flex items-center justify-between pt-2">
            {error && <span className="text-xs text-red-400">{error}</span>}
            <div className="ml-auto">
              <button
                type="submit"
                disabled={submitting || body.trim().length === 0}
                className="inline-flex items-center px-5 py-2.5 bg-amber-500 hover:opacity-90 text-[#080808] text-[13px] font-medium rounded-full transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send feedback"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
