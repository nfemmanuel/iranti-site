import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_LENGTH = 2000;

// GET /api/comments?slug=post-slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const rows = await sql`
    SELECT id, body, created_at
    FROM comments
    WHERE post_slug = ${slug}
    ORDER BY created_at ASC
  `;

  return NextResponse.json({ comments: rows });
}

// POST /api/comments  { slug, body }
export async function POST(req: NextRequest) {
  let body: { slug?: string; body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, body: text } = body;

  if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Comment is empty" }, { status: 400 });
  }
  if (text.trim().length > MAX_BODY_LENGTH) {
    return NextResponse.json(
      { error: `Comment too long (max ${MAX_BODY_LENGTH} characters)` },
      { status: 400 }
    );
  }

  const rows = await sql`
    INSERT INTO comments (post_slug, body)
    VALUES (${slug.trim()}, ${text.trim()})
    RETURNING id, body, created_at
  `;

  return NextResponse.json({ comment: rows[0] }, { status: 201 });
}
