import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { exportLogs } from '@/lib/export-schema'; // We'll need to make sure this is exported correctly
import { z } from 'zod';

// Simple emission factors (kg CO2e per ton-km)
const EMISSION_FACTORS: Record<string, number> = {
  truck: 0.105, // Average heavy truck
  ship: 0.015,  // Ocean freight
  rail: 0.03,   // Freight train
  air: 0.50,    // Air cargo
  default: 0.1,
};

const exportLogSchema = z.object({
  organizationId: z.number(),
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

    // 1. Calculate Carbon Emission
    // Formula: (Weight in Tons) * (Distance in Km) * (Emission Factor)
    const weightInTons = validatedData.weightUnit === 'kg' ? validatedData.weight / 1000 : validatedData.weight;
    const factor = EMISSION_FACTORS[validatedData.transportMode] || EMISSION_FACTORS.default;
    const carbonEmitted = weightInTons * validatedData.distanceKm * factor;

    // 2. Insert into Database
    const newLog = await db.insert(exportLogs).values({
      ...validatedData,
      carbonEmitted,
      status: 'pending',
    }).returning();

    return NextResponse.json({ 
      success: true, 
      data: newLog[0],
      calculation: {
        carbonEmitted,
        factorUsed: factor
      }
    });

  } catch (error) {
    console.error('EXPORT_LOG_ERROR:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
