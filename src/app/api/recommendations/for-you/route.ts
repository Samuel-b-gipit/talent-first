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
    return NextResponse.json({ error: 'Forbidden: Only employers can get recommendations' }, { status: 403 });
  }
  // Use current user if employerId not provided
  const id = employerId || user.id;
  // Fetch employer profile, saved talents, proposals, and recommend talents (simple version)
  try {
    // Get all talents not already saved or proposed to
    const saved = await prisma.savedTalent.findMany({ where: { employerId: id } });
    const proposals = await prisma.proposal.findMany({ where: { employerId: id } });
    const contactedTalentIds = [
      ...saved.map(s => s.talentId),
      ...proposals.map(p => p.talentId),
    ];
    const recommended = await prisma.talentProfile.findMany({
      where: {
        id: { notIn: contactedTalentIds },
      },
      take: 20,
      orderBy: { rating: 'desc' },
    });
    return NextResponse.json(recommended);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recommendations', details: error }, { status: 500 });
  }
}
