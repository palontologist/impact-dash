import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { students } from "@/lib/schema"
import { createStudentSchema } from "@/lib/validators"
import { desc } from "drizzle-orm"

export async function GET() {
  try {
    const results = await db.query.students.findMany({ orderBy: [desc(students.createdAt)] })
    return NextResponse.json({ data: results })
  } catch {
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = createStudentSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { enrollmentDate, ...rest } = parsed.data
    const enrollmentAt = enrollmentDate ? new Date(enrollmentDate) : undefined
    const [created] = await db
      .insert(students)
      .values({ ...rest, enrollmentDate: enrollmentAt })
      .returning()
    return NextResponse.json({ data: created }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}

