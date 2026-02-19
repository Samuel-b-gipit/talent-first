import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCompanySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  culture: z.string().optional(),
  benefits: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  remotePolicy: z.string().default("hybrid"),
  isHiring: z.boolean().default(true),
  foundedYear: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  logo: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  const user = await verifySession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.role !== "EMPLOYER") {
    return NextResponse.json(
      { error: "Only employers can create a company profile" },
      { status: 403 }
    );
  }

  // Check if profile already exists
  const existing = await prisma.employerProfile.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Company profile already exists. Use PUT to update." },
      { status: 409 }
    );
  }

  const body = await req.json();
  const validation = createCompanySchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0].message },
      { status: 400 }
    );
  }

  const data = validation.data;

  try {
    const profile = await prisma.employerProfile.create({
      data: {
        userId: user.id,
        companyName: data.companyName,
        industry: data.industry,
        size: data.size,
        location: data.location,
        description: data.description,
        culture: data.culture ?? null,
        benefits: data.benefits,
        techStack: data.techStack,
        remotePolicy: data.remotePolicy,
        isHiring: data.isHiring,
        foundedYear: data.foundedYear ?? null,
        website: data.website || null,
        logo: data.logo ?? null,
        linkedin: data.linkedin || null,
        twitter: data.twitter || null,
      },
    });

    return NextResponse.json(
      { message: "Company profile created", profile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create company error:", error);
    return NextResponse.json(
      { error: "Failed to create company profile" },
      { status: 500 }
    );
  }
}
