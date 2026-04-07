import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// One-time migration endpoint — protected by ADMIN_SECRET
// Call once after deploy: curl -X POST https://iranti.dev/api/comments/migrate \
//   -H "Authorization: Bearer YOUR_ADMIN_SECRET"

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.ADMIN_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      post_slug   TEXT        NOT NULL,
      body        TEXT        NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS comments_post_slug_idx ON comments (post_slug)
  `;

  return NextResponse.json({ ok: true, message: "Migration complete" });
}
