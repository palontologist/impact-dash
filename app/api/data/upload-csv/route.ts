import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { dataUploads, customMetricData, userProfiles } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { createHash } from "crypto"

interface CSVRow {
  [key: string]: string
}

function parseCSV(content: string): CSVRow[] {
  const lines = content.split('\n').filter(line => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim())
  const rows: CSVRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim())
    const row: CSVRow = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    rows.push(row)
  }

  return rows
}

export async function POST(req: NextRequest) {
  try {
    // Development mode: use test user if no auth
    let userId = 'test_user_123'
    try {
      const authResult = await auth()
      if (authResult?.userId) {
        userId = authResult.userId
      }
    } catch {
      // Continue with test user in dev mode
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const profileId = userProfile[0].id

    const formData = await req.formData()
    const file = formData.get('file') as File
    const metricMapping = formData.get('metricMapping') as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read file content
    const content = await file.text()
    const fileHash = createHash('md5').update(content).digest('hex')

    // Check for duplicate uploads
    const existingUpload = await db
      .select()
      .from(dataUploads)
      .where(eq(dataUploads.fileHash, fileHash))
      .limit(1)

    if (existingUpload.length > 0) {
      return NextResponse.json({ 
        error: "This file has already been uploaded",
        uploadId: existingUpload[0].id 
      }, { status: 409 })
    }

    // Parse CSV
    const rows = parseCSV(content)
    
    if (rows.length === 0) {
      return NextResponse.json({ error: "CSV file is empty or invalid" }, { status: 400 })
    }

    // Create upload record
    const uploadResult = await db.insert(dataUploads).values({
      userId: profileId,
      fileName: file.name,
      fileSize: file.size,
      fileHash,
      uploadStatus: 'processing',
      metricsMapped: metricMapping || '{}',
      uploadedAt: new Date(),
    }).returning()

    const uploadId = uploadResult[0].id

    // Parse metric mapping
    const mapping = metricMapping ? JSON.parse(metricMapping) : {}
    
    let rowsProcessed = 0
    let rowsFailed = 0
    const errors: string[] = []

    // Process each row
    for (const [index, row] of rows.entries()) {
      try {
        const dateStr = row['date'] || row['Date'] || row['DATE']
        if (!dateStr) {
          throw new Error("Date column not found")
        }

        const date = new Date(dateStr)
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date format: ${dateStr}`)
        }

        // Insert metrics based on mapping
        for (const [csvColumn, metricId] of Object.entries(mapping)) {
          const value = row[csvColumn]
          if (value && value !== '') {
            await db.insert(customMetricData).values({
              userId: profileId,
              metricId: metricId as string,
              value,
              date,
              source: 'csv',
              uploadId,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }
        }

        rowsProcessed++
      } catch (error) {
        rowsFailed++
        errors.push(`Row ${index + 2}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    // Update upload status
    await db
      .update(dataUploads)
      .set({
        uploadStatus: rowsFailed === 0 ? 'completed' : 'completed',
        rowsProcessed,
        rowsFailed,
        errorLog: JSON.stringify(errors),
      })
      .where(eq(dataUploads.id, uploadId))

    return NextResponse.json({
      success: true,
      uploadId,
      rowsProcessed,
      rowsFailed,
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined, // Return first 10 errors
    })
  } catch (error) {
    console.error("CSV upload error:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const profileId = userProfile[0].id

    // Get all uploads for this user
    const uploads = await db
      .select()
      .from(dataUploads)
      .where(eq(dataUploads.userId, profileId))
      .orderBy(dataUploads.uploadedAt)

    return NextResponse.json({ uploads })
  } catch (error) {
    console.error("Error fetching uploads:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}
