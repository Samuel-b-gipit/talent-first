import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./auth";

export async function requireAuth(request: NextRequest) {
  const user = await verifySession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { user };
}

export async function requireRole(
  request: NextRequest,
  allowedRoles: string[]
) {
  const user = await verifySession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: "Forbidden: Insufficient permissions" },
      { status: 403 }
    );
  }

  return { user };
}
