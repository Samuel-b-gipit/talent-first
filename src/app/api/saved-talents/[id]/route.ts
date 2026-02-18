import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'EMPLOYER') {
    return NextResponse.json({ error: 'Forbidden: Only employers can unsave talents' }, { status: 403 });
  }
  // Verify user owns this saved record
  const saved = await prisma.savedTalent.findUnique({ where: { id } });
  if (!saved) {
    return NextResponse.json({ error: 'Saved talent not found' }, { status: 404 });
  }
  if (saved.employerId !== user.id) {
    return NextResponse.json({ error: 'Forbidden: You do not own this saved record' }, { status: 403 });
  }
  try {
    await prisma.savedTalent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to unsave talent', details: error }, { status: 500 });
  }
}
