/**
 * VULNERABILITY #3 — Missing Rate Limiting on Transfer Endpoint
 *
 * DESCRIPTION:
 *   This endpoint processes fund transfers with no rate limiting, no CSRF
 *   protection, and no per-user transfer cap. An attacker can script
 *   hundreds of transfer requests in seconds to drain an account.
 *
 * EXPLOIT (demo — run this bash script):
 *   for i in $(seq 1 20); do
 *     curl -s -X POST http://localhost:3000/api/transfer \
 *       -H "Content-Type: application/json" \
 *       -d '{"senderBankId":"bank_001","receiverBankId":"bank_003","amount":"10","note":"attack '$i'"}' \
 *       | python3 -m json.tool
 *   done
 *
 *   Watch Alice's balance drop by $10 with each request.
 *
 * ROOT CAUSE:
 *   1. No rate limiter (e.g. no IP-based or user-based request throttle).
 *   2. No session authentication on the endpoint.
 *   3. No daily transfer cap enforcement.
 *
 * FIX:
 *   1. Add rate limiting middleware (e.g. max 5 transfers/minute per user).
 *   2. Require valid session cookie.
 *   3. Enforce a max transfer amount and daily cap in business logic.
 */

import { NextRequest, NextResponse } from "next/server";
import { MOCK_ACCOUNTS, getAllTransactions, addRuntimeTransaction, MockTransaction } from "@/lib/mock/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderBankId, receiverBankId, amount, note } = body;

    if (!senderBankId || !receiverBankId || !amount) {
      return NextResponse.json(
        { error: "senderBankId, receiverBankId, and amount are required" },
        { status: 400 }
      );
    }

    const sender = MOCK_ACCOUNTS.find((a) => a.$id === senderBankId);
    const receiver = MOCK_ACCOUNTS.find((a) => a.$id === receiverBankId);

    if (!sender || !receiver) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // ❌ VULNERABILITY: No rate limiting. No authentication.
    // This block executes on every request, no throttle.
    if (sender.availableBalance < transferAmount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    // Process transfer
    sender.availableBalance -= transferAmount;
    sender.currentBalance -= transferAmount;
    receiver.availableBalance += transferAmount;
    receiver.currentBalance += transferAmount;

    const id = `txn_${Date.now()}`;
    const now = new Date().toISOString();

    const txn: MockTransaction = {
      $id: id, id,
      name: note || "API Transfer",
      amount: transferAmount,
      date: now.split("T")[0],
      $createdAt: now,
      paymentChannel: "online",
      channel: "online",
      category: "Transfer",
      type: "debit",
      accountId: senderBankId,
      senderBankId,
      receiverBankId,
      pending: false,
      image: "",
    };

    addRuntimeTransaction(txn);

    return NextResponse.json({
      success: true,
      transferId: id,
      senderNewBalance: sender.currentBalance,
      receiverNewBalance: receiver.currentBalance,
      message: `Transferred $${transferAmount} from ${senderBankId} to ${receiverBankId}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Transfer failed" }, { status: 500 });
  }
}
