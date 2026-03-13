import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Module-level cache: populated on first request, reused while the server
// instance is warm. Demo accounts never change so staleness isn't a concern.
const emailCache: Record<string, string[]> = {};

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");

  if (role !== "TALENT" && role !== "EMPLOYER") {
    return NextResponse.json(
      { error: "role must be TALENT or EMPLOYER" },
      { status: 400 },
    );
  }

  if (!emailCache[role] || emailCache[role].length === 0) {
    // Single query instead of count + findFirst
    const users = await prisma.user.findMany({
      where: { role },
      select: { email: true },
      take: 20,
    });

    if (users.length === 0) {
      return NextResponse.json(
        { error: "No demo accounts available" },
        { status: 404 },
      );
    }

    emailCache[role] = users.map((u) => u.email);
  }

  const emails = emailCache[role];
  const email = emails[Math.floor(Math.random() * emails.length)];

  // All seeded demo accounts share this password
  return NextResponse.json({ email, password: "password1234" });
}
