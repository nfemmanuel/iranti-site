import { NextRequest, NextResponse } from "next/server";

// Required env vars (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY=re_...
//   RESEND_AUDIENCE_ID=...                    (optional, durable contact list)
//   WAITLIST_NOTIFY_TO=you@example.com        (optional, inbox ping per signup)
//   WAITLIST_FROM="Iranti <hello@iranti.dev>" (verified sender domain)

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      const { error: contactErr } = await resend.contacts.create({ email: normalized, audienceId, unsubscribed: false });
      if (contactErr) {
        console.error("Resend contacts.create error:", contactErr);
        return NextResponse.json({ error: "Could not save contact: " + contactErr.message }, { status: 502 });
      }
    }

    const notifyTo = process.env.WAITLIST_NOTIFY_TO;
    const from = process.env.WAITLIST_FROM || "Iranti <onboarding@resend.dev>";
    if (notifyTo) {
      const { error: emailErr } = await resend.emails.send({
        from,
        to: notifyTo,
        subject: `New Iranti signup: ${normalized}`,
        text: `${normalized} joined the list at ${new Date().toISOString()}.`,
      });
      if (emailErr) console.error("Resend emails.send error:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not subscribe right now.";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
