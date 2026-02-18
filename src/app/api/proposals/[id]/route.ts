
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySession } from '@/lib/auth';


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Only the talent (receiver) can update status
  const proposal = await prisma.proposal.findUnique({ where: { id } });
  if (!proposal) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
  }
  if (proposal.talentId !== user.id) {
    return NextResponse.json({ error: 'Forbidden: Only the talent can update status' }, { status: 403 });
  }
  const data = await req.json();
  const { status, responseMessage } = data;
  const allowedStatuses = ['VIEWED', 'ACCEPTED', 'DECLINED'];
  if (!status || !allowedStatuses.includes(status.toUpperCase())) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  try {
    const updated = await prisma.proposal.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
        ...(responseMessage && { responseMessage }),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update proposal', details: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        employer: true,
        talent: true,
      },
    });
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    if (proposal.employerId !== user.id && proposal.talentId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json(proposal);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch proposal', details: error }, { status: 500 });
  }
}
