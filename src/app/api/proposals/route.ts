export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const talentId = searchParams.get("talentId");
  const employerId = searchParams.get("employerId");
  const status = searchParams.get("status");

  if (!talentId && !employerId) {
    return NextResponse.json(
      { error: "Missing talentId or employerId" },
      { status: 400 },
    );
  }

  const where: {
    talentId?: string;
    employerId?: string;
    status?: "PENDING" | "VIEWED" | "ACCEPTED" | "DECLINED";
  } = {};
  if (talentId) where.talentId = talentId;
  if (employerId) where.employerId = employerId;
  if (status)
    where.status = status.toUpperCase() as
      | "PENDING"
      | "VIEWED"
      | "ACCEPTED"
      | "DECLINED";

  try {
    const proposals = await prisma.proposal.findMany({
      where,
      include: {
        employer: {
          include: { employerProfile: true },
        },
        talent: {
          include: { talentProfile: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(proposals);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch proposals", details: error },
      { status: 500 },
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Authenticate user
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "EMPLOYER") {
    return NextResponse.json(
      { error: "Forbidden: Only employers can send proposals" },
      { status: 403 },
    );
  }

  // Parse and validate input
  const data = await req.json();
  const {
    talentId,
    position,
    budgetType,
    message,
    remote,
    requirements,
    benefits,
    duration,
    startDate,
    location,
  } = data;
  let { budget } = data;
  // talentId must be a User ID (not TalentProfile)
  if (
    !talentId ||
    typeof talentId !== "string" ||
    !position ||
    typeof position !== "string" ||
    !budget ||
    !budgetType ||
    !message ||
    !remote ||
    !location
  ) {
    return NextResponse.json(
      { error: "Missing or invalid required fields" },
      { status: 400 },
    );
  }
  // Convert budget to string if needed
  if (typeof budget !== "string") {
    budget = String(budget);
  }

  try {
    const proposal = await prisma.proposal.create({
      data: {
        employerId: user.id,
        talentId,
        position,
        budget,
        budgetType,
        message,
        remote,
        requirements,
        benefits,
        duration,
        startDate,
        location,
        status: "PENDING", // must match enum value
      },
    });
    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create proposal", details: error },
      { status: 500 },
    );
  }
}
