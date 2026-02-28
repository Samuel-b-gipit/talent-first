import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await verifySession();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Resolve avatarUrl from the relevant profile
    let avatarUrl: string | null = null;
    if (user.role === "TALENT") {
      const profile = await prisma.talentProfile.findUnique({
        where: { userId: user.id },
        select: { avatarUrl: true },
      });
      avatarUrl = profile?.avatarUrl ?? null;
    } else if (user.role === "EMPLOYER") {
      const profile = await prisma.employerProfile.findUnique({
        where: { userId: user.id },
        select: { logo: true },
      });
      avatarUrl = profile?.logo ?? null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: { ...userWithoutPassword, avatarUrl } });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
