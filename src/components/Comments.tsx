"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  body: string;
  created_at: string;
}

interface CommentsProps {
  slug: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => {
        setComments(data.comments ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, body: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
      } else {
        setComments(prev => [...prev, data.comment]);
        setText("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch {
      setError("Failed to submit — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border-t border-[var(--border-subtle)] pt-10 space-y-8">
      <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-faint)]">
        Comments
      </div>

      {/* Existing comments */}
      {loading ? (
        <p className="text-xs text-[var(--text-faint)] font-mono">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-[var(--text-faint)]">
          No comments yet. Be the first.
        </p>
      ) : (
        <div className="space-y-5">
          {comments.map(c => (
            <div
              key={c.id}
              className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl"
            >
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                {c.body}
              </p>
              <time className="text-xs font-mono text-[var(--text-faint)] mt-2 block">
                {formatDate(c.created_at)}
              </time>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Leave a comment — no account needed"
          rows={4}
          maxLength={2000}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-secondary)] placeholder:text-[var(--text-faint)] font-sans resize-none focus:outline-none focus:border-teal-500/50 transition-colors"
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-mono text-[var(--text-faint)]">
            {text.length}/2000
          </span>
          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs text-red-400">{error}</span>
            )}
            {submitted && (
              <span className="text-xs text-teal-400">Comment posted.</span>
            )}
            <button
              type="submit"
              disabled={submitting || text.trim().length === 0}
              className="text-xs font-mono px-4 py-2 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Posting..." : "Post comment"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
