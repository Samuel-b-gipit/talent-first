import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Aggregate all skills and their counts
    const talents = await prisma.talentProfile.findMany({ select: { skills: true, rate: true } });
    const skillStats: Record<string, { count: number; totalRate: number; talentCount: number }> = {};
    for (const t of talents) {
      for (const skill of t.skills) {
        if (!skillStats[skill]) skillStats[skill] = { count: 0, totalRate: 0, talentCount: 0 };
        skillStats[skill].count++;
        if (typeof t.rate === 'number') {
          skillStats[skill].totalRate += t.rate;
          skillStats[skill].talentCount++;
        }
      }
    }
    const result = Object.entries(skillStats).map(([skill, stats]) => ({
      skill,
      count: stats.count,
      avgRate: stats.talentCount ? stats.totalRate / stats.talentCount : 0,
    }));
    result.sort((a, b) => b.count - a.count);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch market insights', details: error }, { status: 500 });
  }
}
