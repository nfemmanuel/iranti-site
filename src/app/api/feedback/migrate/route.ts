import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      body text NOT NULL,
      name text,
      email text,
      created_at timestamptz DEFAULT now()
    )
  `;
  return NextResponse.json({ ok: true });
}
