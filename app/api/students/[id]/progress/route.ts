import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { progressUpdates } from "@/lib/schema"
import { updateProgressSchema } from "@/lib/validators"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    const pathParts = new URL(req.url).pathname.split("/")
    const idPart = pathParts[pathParts.length - 2]
    const studentId = Number(idPart)
    const updates = await db.query.progressUpdates.findMany({
      where: eq(progressUpdates.studentId, studentId),
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    })
    return NextResponse.json({ data: updates })
  } catch {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const pathParts = new URL(req.url).pathname.split("/")
    const idPart = pathParts[pathParts.length - 2]
    const parsed = updateProgressSchema.safeParse({ ...json, studentId: Number(idPart) })
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    const [created] = await db.insert(progressUpdates).values(parsed.data).returning()
    return NextResponse.json({ data: created }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to add progress" }, { status: 500 })
  }
}

