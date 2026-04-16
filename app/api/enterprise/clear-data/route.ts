import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { exportLogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      );
    }

    const orgId = parseInt(organizationId);

    const deleted = await db
      .delete(exportLogs)
      .where(eq(exportLogs.organizationId, orgId))
      .returning();

    return NextResponse.json({
      success: true,
      message: `Cleared ${deleted.length} shipment records`,
      deletedCount: deleted.length
    });
  } catch (error) {
    console.error('Error clearing enterprise data:', error);
    return NextResponse.json(
      { error: 'Failed to clear data' },
      { status: 500 }
    );
  }
}
