import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateCompanySchema = z.object({
  companyName: z.string().min(1).optional(),
  industry: z.string().min(1).optional(),
  size: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  culture: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  techStack: z.array(z.string()).optional(),
  remotePolicy: z.string().optional(),
  isHiring: z.boolean().optional(),
  foundedYear: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  logo: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

// GET /api/companies/[id]
// Accepts either the profile id OR the userId (both resolve correctly)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Try matching by userId first, then by profile id
    const profile = await prisma.employerProfile.findFirst({
      where: { OR: [{ userId: id }, { id }] },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Company profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Get company error:", error);
    return NextResponse.json(
      { error: "Failed to fetch company profile" },
      { status: 500 }
    );
  }
}

// PUT /api/companies/[id]  — id is the profile id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Verify ownership
  const profile = await prisma.employerProfile.findUnique({ where: { id } });
  if (!profile) {
    return NextResponse.json(
      { error: "Company profile not found" },
      { status: 404 }
    );
  }
  if (profile.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const validation = updateCompanySchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const data = validation.data;

  try {
    const updated = await prisma.employerProfile.update({
      where: { id },
      data: {
        ...(data.companyName !== undefined && { companyName: data.companyName }),
        ...(data.industry !== undefined && { industry: data.industry }),
        ...(data.size !== undefined && { size: data.size }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.culture !== undefined && { culture: data.culture }),
        ...(data.benefits !== undefined && { benefits: data.benefits }),
        ...(data.techStack !== undefined && { techStack: data.techStack }),
        ...(data.remotePolicy !== undefined && { remotePolicy: data.remotePolicy }),
        ...(data.isHiring !== undefined && { isHiring: data.isHiring }),
        ...(data.foundedYear !== undefined && { foundedYear: data.foundedYear }),
        ...(data.website !== undefined && { website: data.website || null }),
        ...(data.logo !== undefined && { logo: data.logo }),
        ...(data.linkedin !== undefined && { linkedin: data.linkedin || null }),
        ...(data.twitter !== undefined && { twitter: data.twitter || null }),
      },
    });

    return NextResponse.json({ message: "Company profile updated", profile: updated });
  } catch (error) {
    console.error("Update company error:", error);
    return NextResponse.json(
      { error: "Failed to update company profile" },
      { status: 500 }
    );
  }
}
