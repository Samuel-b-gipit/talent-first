import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employerId = searchParams.get('employerId');
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'EMPLOYER') {
    return NextResponse.json({ error: 'Forbidden: Only employers can view analytics' }, { status: 403 });
  }
  const id = employerId || user.id;
  try {
    const proposals = await prisma.proposal.findMany({ where: { employerId: id } });
    const sent = proposals.length;
    const accepted = proposals.filter(p => p.status === 'ACCEPTED').length;
    const responseRate = sent ? accepted / sent : 0;
    // Average response time (from createdAt to updatedAt if status changed)
    const responseTimes = proposals
      .filter(p => p.status !== 'PENDING' && p.createdAt && p.updatedAt)
      .map(p => (new Date(p.updatedAt).getTime() - new Date(p.createdAt).getTime()) / 1000 / 60 / 60); // in hours
    const avgResponseTime = responseTimes.length ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length : null;
    return NextResponse.json({ sent, accepted, responseRate, avgResponseTime });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employer analytics', details: error }, { status: 500 });
  }
}
