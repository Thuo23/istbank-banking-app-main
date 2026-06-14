/**
 * VULNERABILITY #2 — Sensitive Data Exposure
 *
 * DESCRIPTION:
 *   This endpoint returns the FULL user object for any userId, including
 *   plaintext password, SSN, role, and all PII. There is no field filtering
 *   and no authentication required.
 *
 * EXPLOIT (demo with curl or Burp Suite):
 *   # Fetch Alice's full profile including plaintext password and SSN:
 *   curl "http://localhost:3000/api/user?userId=user_001"
 *
 *   # Fetch Bob's profile — note role: "admin"
 *   curl "http://localhost:3000/api/user?userId=user_002"
 *
 * ROOT CAUSE:
 *   1. No authentication check on the endpoint.
 *   2. Entire database record returned with no field whitelist.
 *   3. Passwords stored and returned in plaintext.
 *
 * FIX:
 *   1. Require valid session cookie.
 *   2. Return only: { firstName, lastName, email, city } — nothing sensitive.
 *   3. Store passwords as bcrypt hashes, never return them.
 */

import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/mock/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // ❌ VULNERABILITY: No authentication. No field filtering.
  // Returns password, SSN, role — everything.
  const user = MOCK_USERS.find((u) => u.$id === userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Full object returned — password, ssn, role all exposed
  return NextResponse.json({ user });
}
