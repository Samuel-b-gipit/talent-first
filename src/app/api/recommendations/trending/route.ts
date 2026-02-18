import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Trending: high rating, recent proposals, in-demand skills (simple version)
    const trending = await prisma.talentProfile.findMany({
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
        { updatedAt: 'desc' },
      ],
      take: 20,
    });
    return NextResponse.json(trending);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trending talents', details: error }, { status: 500 });
  }
}
