import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role");

  if (role !== "TALENT" && role !== "EMPLOYER") {
    return NextResponse.json(
      { error: "role must be TALENT or EMPLOYER" },
      { status: 400 },
    );
  }

  const count = await prisma.user.count({ where: { role } });

  if (count === 0) {
    return NextResponse.json(
      { error: "No demo accounts available" },
      { status: 404 },
    );
  }

  const skip = Math.floor(Math.random() * count);
  const user = await prisma.user.findFirst({
    where: { role },
    skip,
    select: { email: true },
  });

  if (!user) {
    return NextResponse.json(
      { error: "No demo accounts available" },
      { status: 404 },
    );
  }

  // All seeded demo accounts share this password
  return NextResponse.json({ email: user.email, password: "password1234" });
}
