import { cookies } from "next/headers";
import { prisma } from "./prisma";
import crypto from "crypto";
import { cache } from "react";

const SESSION_COOKIE_NAME = "session_token";
const SESSION_EXPIRY_DAYS = 7;

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

// Non-httpOnly role cookie — readable by middleware (Edge runtime)
export async function setRoleCookie(role: string) {
  const cookieStore = await cookies();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  cookieStore.set("user_role", role, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

// Wrapped with React cache() so multiple calls within the same server render
// (e.g. layout + page both calling verifySession) hit the DB only once.
export const verifySession = cache(async () => {
  const token = await getSessionToken();
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;

  // Check if session is expired
  if (new Date() > session.expiresAt) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }

  return session.user;
}); 

export async function deleteSession() {
  const token = await getSessionToken();
  if (!token) return;

  await prisma.session.deleteMany({
    where: { token },
  });

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete("user_role");
}
