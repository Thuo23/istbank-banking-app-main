/**
 * ISTBANK - Mock Auth
 * Cookie-based session — userId is encoded directly in the cookie so it
 * survives Next.js hot reloads (no in-memory store).
 */

import { cookies } from "next/headers";
import { MOCK_USERS, MockUser } from "./db";

export function createSession(userId: string): string {
  // Simple encoding: base64(userId:istbank-secret)
  // Not cryptographically secure — intentional for demo simplicity
  return Buffer.from(`${userId}:istbank-secret`).toString("base64");
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId, secret] = decoded.split(":");
    if (secret !== "istbank-secret") return null;
    return userId;
  } catch {
    return null;
  }
}

export function deleteSession(): void {
  // Cookie deletion handled in user.actions.ts
}

export function getSessionFromCookies(): string | null {
  const cookieStore = cookies();
  const session = cookieStore.get("istbank-session");
  return session?.value ?? null;
}

export function getUserFromSession(): MockUser | null {
  const token = getSessionFromCookies();
  if (!token) return null;
  const userId = getUserIdFromToken(token);
  if (!userId) return null;
  return MOCK_USERS.find((u) => u.$id === userId) ?? null;
}
