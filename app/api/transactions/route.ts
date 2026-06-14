/**
 * VULNERABILITY #1 — IDOR (Insecure Direct Object Reference)
 *
 * DESCRIPTION:
 *   This endpoint returns transaction history for ANY userId passed in the
 *   query string. There is NO ownership check — an authenticated user can
 *   query another user's transactions simply by changing the userId parameter.
 *
 * EXPLOIT (demo with curl or Burp Suite):
 *   # Logged in as Alice (user_001), fetch Bob's transactions:
 *   curl "http://localhost:3000/api/transactions?userId=user_002"
 *
 * ROOT CAUSE:
 *   Missing server-side ownership validation. The API trusts the client-
 *   supplied userId without verifying it matches the session user.
 *
 * FIX:
 *   Extract userId from the session cookie, not from the query string.
 *   Reject requests where query userId !== session userId.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllTransactions, MOCK_ACCOUNTS } from "@/lib/mock/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  // ❌ VULNERABILITY: No session check. Any userId is accepted.
  // A secure implementation would do:
  //   const sessionUser = getUserFromSession();
  //   if (!sessionUser || sessionUser.$id !== userId) return 401;

  const userAccounts = MOCK_ACCOUNTS.filter((a) => a.userId === userId);
  const accountIds = userAccounts.map((a) => a.$id);

  const allTxns = getAllTransactions();
  const userTransactions = allTxns.filter(
    (t) =>
      accountIds.includes(t.accountId) ||
      accountIds.includes(t.senderBankId) ||
      accountIds.includes(t.receiverBankId)
  );

  return NextResponse.json({
    userId,
    totalTransactions: userTransactions.length,
    transactions: userTransactions,
  });
}
