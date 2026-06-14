"use server";

/**
 * ISTBANK - Transaction Actions (Mock replacement for Dwolla + Appwrite)
 */

import { addRuntimeTransaction, getAllTransactions, MockTransaction } from "../mock/db";
import { parseStringify } from "../utils";

export const createTransaction = async (transaction: {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}) => {
  try {
    const id = `txn_${Date.now()}`;
    const now = new Date().toISOString();

    const newTxn: MockTransaction = {
      $id: id,
      id,
      name: transaction.name,
      amount: parseFloat(transaction.amount),
      date: now.split("T")[0],
      $createdAt: now,
      paymentChannel: "online",
      channel: "online",
      category: "Transfer",
      type: "debit",
      accountId: transaction.senderBankId,
      senderBankId: transaction.senderBankId,
      receiverBankId: transaction.receiverBankId,
      pending: false,
      image: "",
    };

    addRuntimeTransaction(newTxn);
    return parseStringify(newTxn);
  } catch (error) {
    console.error("createTransaction error:", error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: {
  bankId: string;
}) => {
  try {
    const allTxns = getAllTransactions();
    const transactions = allTxns.filter(
      (t) => t.senderBankId === bankId || t.receiverBankId === bankId
    );
    return parseStringify({ data: transactions, total: transactions.length });
  } catch (error) {
    console.error("getTransactionsByBankId error:", error);
  }
};
