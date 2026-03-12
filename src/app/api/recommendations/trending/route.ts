import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const pageSize = Math.min(
    50,
    Math.max(1, Number(searchParams.get("pageSize") ?? 10)),
  );

  try {
    // Trending: high rating, recent proposals, in-demand skills (simple version)
    const orderBy: import("@prisma/client").Prisma.TalentProfileOrderByWithRelationInput[] =
      [{ rating: "desc" }, { reviewCount: "desc" }, { updatedAt: "desc" }];
    const [total, items] = await Promise.all([
      prisma.talentProfile.count(),
      prisma.talentProfile.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy,
        include: { user: true },
      }),
    ]);
    return NextResponse.json({ items, total });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trending talents", details: error },
      { status: 500 },
    );
  }
}
