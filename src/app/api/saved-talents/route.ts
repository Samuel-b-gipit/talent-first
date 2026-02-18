import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'EMPLOYER') {
    return NextResponse.json({ error: 'Forbidden: Only employers can view saved talents' }, { status: 403 });
  }
  const employerId = searchParams.get('employerId') || user.id;
  try {
    const savedTalents = await prisma.savedTalent.findMany({
      where: { employerId },
      include: {
        talent: true,
      },
      orderBy: { savedDate: 'desc' },
    });
    return NextResponse.json(savedTalents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch saved talents', details: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'EMPLOYER') {
    return NextResponse.json({ error: 'Forbidden: Only employers can save talents' }, { status: 403 });
  }
  const data = await req.json();
  const { talentId, notes } = data;
  if (!talentId) {
    return NextResponse.json({ error: 'Missing talentId' }, { status: 400 });
  }
  // Check if already saved
  const existing = await prisma.savedTalent.findUnique({
    where: {
      employerId_talentId: {
        employerId: user.id,
        talentId,
      },
    },
  });
  if (existing) {
    return NextResponse.json({ error: 'Talent already saved' }, { status: 409 });
  }
  try {
    const saved = await prisma.savedTalent.create({
      data: {
        employerId: user.id,
        talentId,
        notes,
      },
    });
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save talent', details: error }, { status: 500 });
  }
}
