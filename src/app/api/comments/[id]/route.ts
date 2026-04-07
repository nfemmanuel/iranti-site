import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// DELETE /api/comments/:id
// Protected — requires Authorization: Bearer <ADMIN_SECRET>
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = req.headers.get("authorization");
  const secret = process.env.ADMIN_SECRET;

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const rows = await sql`
    DELETE FROM comments
    WHERE id = ${id}
    RETURNING id
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  return NextResponse.json({ deleted: id });
}
