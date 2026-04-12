import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 });
}
