import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';
  if (!q) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
  }
  try {
    const profiles = await prisma.talentProfile.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { bio: { contains: q, mode: 'insensitive' } },
          { skills: { hasSome: [q] } },
          { location: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: { user: true },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search profiles', details: error }, { status: 500 });
  }
}
