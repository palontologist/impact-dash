import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { students } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  try {
    const pathParts = new URL(req.url).pathname.split("/")
    const id = Number(pathParts[pathParts.length - 1])
    const result = await db.query.students.findFirst({ where: eq(students.id, id) })
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const pathParts = new URL(req.url).pathname.split("/")
    const id = Number(pathParts[pathParts.length - 1])
    await db.delete(students).where(eq(students.id, id))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

