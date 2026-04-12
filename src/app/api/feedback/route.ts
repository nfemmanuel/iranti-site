import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_BODY_LENGTH = 5000;

export async function POST(req: NextRequest) {
  let body: { body?: string; name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { body: text, name, email } = body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Feedback is empty" }, { status: 400 });
  }
  if (text.trim().length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { error: `Feedback too long (max ${MAX_BODY_LENGTH} characters)` },
      { status: 400 }
    );
  }

  const cleanName =
    name && typeof name === "string" && name.trim().length > 0
      ? name.trim().slice(0, 100)
      : null;
  const cleanEmail =
    email && typeof email === "string" && email.trim().length > 0
      ? email.trim().slice(0, 254)
      : null;

  if (cleanEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
  }

  const rows = await sql`
    INSERT INTO feedback (body, name, email)
    VALUES (${text.trim()}, ${cleanName}, ${cleanEmail})
    RETURNING id, created_at
  `;

  // Fire-and-forget email notification — never block the response on this
  if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
      from: "feedback@iranti.dev",
      to: process.env.NOTIFICATION_EMAIL,
      subject: "New Iranti feedback",
      text: [
        cleanName ? `From: ${cleanName}` : "From: anonymous",
        cleanEmail ? `Email: ${cleanEmail}` : null,
        "",
        text.trim(),
      ]
        .filter((line) => line !== null)
        .join("\n"),
    }).catch(() => {
      // Silently ignore email failures — feedback is already saved to DB
    });
  }

  return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 });
}
