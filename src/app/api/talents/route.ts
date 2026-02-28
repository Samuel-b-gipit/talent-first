import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // Optional filters: skills, location, minRate, maxRate
  const skills = searchParams.get("skills")?.split(",");
  const location = searchParams.get("location");
  const minRate = searchParams.get("minRate")
    ? Number(searchParams.get("minRate"))
    : undefined;
  const maxRate = searchParams.get("maxRate")
    ? Number(searchParams.get("maxRate"))
    : undefined;

  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined;

  const where: Prisma.TalentProfileWhereInput = {};
  if (skills && skills.length > 0) {
    where.skills = { hasSome: skills };
  }
  if (location) {
    where.location = location;
  }
  if (minRate || maxRate) {
    where.rate = {};
    if (minRate) where.rate.gte = minRate;
    if (maxRate) where.rate.lte = maxRate;
  }

  try {
    const profiles = await prisma.talentProfile.findMany({
      where,
      include: { user: true },
      ...(limit ? { take: limit } : {}),
    });
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profiles", details: error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  // Authenticate user
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse and validate input
  const data = await req.json();
  const {
    name,
    title,
    bio,
    skills,
    location,
    rate,
    experience,
    availability,
    avatarUrl,
    portfolio,
    linkedin,
    github,
    website,
    openToRemote,
    openToContract,
  } = data;
  if (
    !name ||
    !title ||
    !bio ||
    !skills ||
    !Array.isArray(skills) ||
    !location ||
    typeof rate !== "number" ||
    !experience ||
    !availability
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  // Create talent profile
  try {
    const profile = await prisma.talentProfile.create({
      data: {
        userId: user.id,
        name,
        title,
        bio,
        skills,
        location,
        rate,
        experience,
        availability,
        avatarUrl: avatarUrl ?? null,
        portfolio,
        linkedin,
        github,
        website,
        openToRemote: openToRemote ?? true,
        openToContract: openToContract ?? true,
      },
    });
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create profile", details: error },
      { status: 500 },
    );
  }
}
