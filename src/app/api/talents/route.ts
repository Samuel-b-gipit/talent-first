import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

function parseExperienceMin(exp: string): number {
  if (!exp) return 0;
  const match = exp.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function buildOrderBy(
  sortBy?: string | null,
): Prisma.TalentProfileOrderByWithRelationInput {
  switch (sortBy) {
    case "rating":
      return { rating: "desc" };
    case "rate-low":
      return { rate: "asc" };
    case "rate-high":
      return { rate: "desc" };
    case "recent":
      return { updatedAt: "desc" };
    default:
      return { updatedAt: "desc" };
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.toLowerCase();
  const skills = searchParams.get("skills")?.split(",").filter(Boolean);
  const location = searchParams.get("location");
  const experience = searchParams.get("experience");
  const minRate = searchParams.get("minRate")
    ? Number(searchParams.get("minRate"))
    : undefined;
  const maxRate = searchParams.get("maxRate")
    ? Number(searchParams.get("maxRate"))
    : undefined;
  const availability = searchParams.get("availability");
  const remote = searchParams.get("remote") === "true" ? true : undefined;
  const contract = searchParams.get("contract") === "true" ? true : undefined;
  const minRating = searchParams.get("minRating")
    ? Number(searchParams.get("minRating"))
    : undefined;
  const experienceMin =
    searchParams.get("experienceMin") != null
      ? Number(searchParams.get("experienceMin"))
      : undefined;
  const experienceMax =
    searchParams.get("experienceMax") != null
      ? Number(searchParams.get("experienceMax"))
      : undefined;
  const sortBy = searchParams.get("sortBy");

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = Math.min(
    50,
    Math.max(1, Number(searchParams.get("pageSize") ?? 12)),
  );

  const where: Prisma.TalentProfileWhereInput = {};

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { bio: { contains: q, mode: "insensitive" } },
      { location: { contains: q, mode: "insensitive" } },
      { skills: { hasSome: [q] } },
    ];
  }
  if (skills && skills.length > 0) {
    where.skills = { hasSome: skills };
  }
  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }
  if (experience && experience !== "allExperience") {
    where.experience = experience;
  }
  if (minRate !== undefined || maxRate !== undefined) {
    where.rate = {};
    if (minRate !== undefined) (where.rate as Prisma.FloatFilter).gte = minRate;
    if (maxRate !== undefined) (where.rate as Prisma.FloatFilter).lte = maxRate;
  }
  if (availability && availability !== "all") {
    where.availability = availability;
  }
  if (remote === true) {
    where.openToRemote = true;
  }
  if (contract === true) {
    where.openToContract = true;
  }
  if (minRating !== undefined && minRating > 0) {
    where.rating = { gte: minRating };
  }

  const orderBy = buildOrderBy(sortBy);
  const hasExperienceRange =
    (experienceMin !== undefined && experienceMin > 0) ||
    (experienceMax !== undefined && experienceMax < 999);
  const needsExperienceSort = sortBy === "experience";

  try {
    if (hasExperienceRange || needsExperienceSort) {
      // Experience is stored as a string ("0-1", "6-8+", …) so numeric
      // range filtering and sorting must happen in application memory.
      const allMatching = await prisma.talentProfile.findMany({
        where,
        include: { user: true },
        orderBy: needsExperienceSort ? undefined : orderBy,
      });

      const expMin = experienceMin ?? 0;
      const expMax = experienceMax ?? 999;
      let filtered = allMatching.filter((p) => {
        const years = parseExperienceMin(p.experience);
        return years >= expMin && years <= expMax;
      });

      if (needsExperienceSort) {
        filtered = filtered.sort(
          (a, b) =>
            parseExperienceMin(b.experience) - parseExperienceMin(a.experience),
        );
      }

      const total = filtered.length;
      const items = filtered.slice((page - 1) * pageSize, page * pageSize);
      return NextResponse.json({ items, total });
    }

    const [total, items] = await Promise.all([
      prisma.talentProfile.count({ where }),
      prisma.talentProfile.findMany({
        where,
        include: { user: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy,
      }),
    ]);
    return NextResponse.json({ items, total });
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
      include: { user: true },
    });
    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create profile", details: error },
      { status: 500 },
    );
  }
}
