import { z } from "zod"

export const createStudentSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  county: z.string().min(1),
  location: z.string().optional().nullable(),
  cohort: z.string().optional().nullable(),
  status: z.enum(["Active", "Completed", "At Risk"]).optional().default("Active"),
  avatarUrl: z.string().url().optional().nullable(),
  enrollmentDate: z.union([z.string(), z.number()]).optional(),
})

export const updateProgressSchema = z.object({
  studentId: z.number().int().positive(),
  completionRate: z.number().int().min(0).max(100),
  aiLiteracyLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  notes: z.string().optional().nullable(),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>

