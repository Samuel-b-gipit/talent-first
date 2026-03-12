import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employerId = searchParams.get("employerId");
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "EMPLOYER") {
    return NextResponse.json(
      { error: "Forbidden: Only employers can get similar recommendations" },
      { status: 403 },
    );
  }
  const id = employerId || user.id;
  // Get saved and contacted talents
  const saved = await prisma.savedTalent.findMany({
    where: { employerId: id },
  });
  const proposals = await prisma.proposal.findMany({
    where: { employerId: id },
  });
  const contactedTalentIds = [
    ...saved.map((s) => s.talentId),
    ...proposals.map((p) => p.talentId),
  ];
  // Get skills from saved talents
  const savedProfiles = await prisma.talentProfile.findMany({
    where: { id: { in: saved.map((s) => s.talentId) } },
  });
  const allSkills = Array.from(new Set(savedProfiles.flatMap((p) => p.skills)));
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = Math.min(
    50,
    Math.max(1, Number(searchParams.get("pageSize") ?? 10)),
  );

  // Find similar talents by skills, exclude already contacted
  const where = {
    id: { notIn: contactedTalentIds },
    skills: { hasSome: allSkills.length > 0 ? allSkills : [""] },
  };
  const [total, items] = await Promise.all([
    prisma.talentProfile.count({ where }),
    prisma.talentProfile.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { user: true },
    }),
  ]);
  return NextResponse.json({ items, total });
}
