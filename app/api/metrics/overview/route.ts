import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { students, progressUpdates } from "@/lib/schema"
import { eq, sql } from "drizzle-orm"

export async function GET() {
  try {
    const totalRows = await db.select({ count: sql<number>`cast(count(*) as int)` }).from(students)
    const totalStudents = totalRows[0]?.count ?? 0

    const completedRows = await db
      .select({ completedCount: sql<number>`cast(count(distinct ${students.id}) as int)` })
      .from(students)
      .innerJoin(progressUpdates, eq(progressUpdates.studentId, students.id))
      .where(eq(progressUpdates.completionRate, 100))
    const completedCount = completedRows[0]?.completedCount ?? 0

    const completionRate = totalStudents ? Math.round((Number(completedCount ?? 0) / Number(totalStudents ?? 0)) * 1000) / 10 : 0

    return NextResponse.json({
      data: {
        totalStudents: Number(totalStudents ?? 0),
        completionRate,
      },
    })
  } catch {
    return NextResponse.json({ error: "Failed to compute metrics" }, { status: 500 })
  }
}

