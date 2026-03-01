import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { verifySession } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  try {
    const profile = await prisma.talentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
      include: { user: true },
    });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile", details: error },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
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
  try {
    // Only allow update if the user owns the profile
    const profile = await prisma.talentProfile.findUnique({ where: { id } });
    if (!profile || profile.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const updated = await prisma.talentProfile.update({
      where: { id },
      data: {
        name,
        title,
        bio,
        skills,
        location,
        rate,
        experience,
        availability,
        ...(avatarUrl !== undefined && { avatarUrl }),
        portfolio,
        linkedin,
        github,
        website,
        openToRemote: openToRemote ?? true,
        openToContract: openToContract ?? true,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile", details: error },
      { status: 500 },
    );
  }
}
