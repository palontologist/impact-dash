import { NextResponse } from 'next/server';
import { client } from '@/lib/db';
import { z } from 'zod';

const EMISSION_FACTORS: Record<string, number> = {
  truck: 0.105,
  ship: 0.015,
  rail: 0.03,
  air: 0.50,
  default: 0.1,
};

const exportLogSchema = z.object({
  organizationId: z.number().default(1),
  commodityType: z.string(),
  weight: z.number(),
  weightUnit: z.enum(['kg', 'tons']),
  transportMode: z.enum(['truck', 'ship', 'rail', 'air']),
  distanceKm: z.number(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = exportLogSchema.parse(body);

    // Calculate Carbon Emission
    const weightInTons = validatedData.weightUnit === 'kg' ? validatedData.weight / 1000 : validatedData.weight;
    const factor = EMISSION_FACTORS[validatedData.transportMode] || EMISSION_FACTORS.default;
    const carbonEmitted = weightInTons * validatedData.distanceKm * factor;
    const now = Math.floor(Date.now() / 1000);

    // Insert using raw SQL with params
    const sql = `
      INSERT INTO export_logs 
      (organization_id, commodity_type, weight, weight_unit, transport_mode, distance_km, carbon_emitted, status, notes, timestamp, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?)
    `;

    const result = await client.execute({
      sql,
      args: [
        validatedData.organizationId,
        validatedData.commodityType,
        validatedData.weight,
        validatedData.weightUnit,
        validatedData.transportMode,
        validatedData.distanceKm,
        carbonEmitted,
        validatedData.notes || null,
        now,
        now,
        now
      ]
    });

    return NextResponse.json({ 
      success: true, 
      data: { id: result.lastInsertRowid },
      calculation: { carbonEmitted, factorUsed: factor }
    });

  } catch (error) {
    console.error('EXPORT_LOG_ERROR:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Validation failed', issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
