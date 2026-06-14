"use server";

/**
 * ISTBANK - Bank Actions (Mock replacement for Plaid)
 */

import { MOCK_ACCOUNTS, getAllTransactions } from "../mock/db";
import { parseStringify } from "../utils";

export const getAccounts = async ({ userId }: { userId: string }) => {
  try {
    const accounts = MOCK_ACCOUNTS.filter((a) => a.userId === userId);

    const totalCurrentBalance = accounts.reduce(
      (sum, a) => sum + a.currentBalance,
      0
    );

    return parseStringify({
      data: accounts.map((a) => ({
        id: a.$id,
        availableBalance: a.availableBalance,
        currentBalance: a.currentBalance,
        officialName: a.officialName,
        mask: a.mask,
        institutionId: a.institutionId,
        name: a.name,
        type: a.type,
        subtype: a.subtype,
        appwriteItemId: a.appwriteItemId,
        shareableId: a.shareableId,
      })),
      totalBanks: accounts.length,
      totalCurrentBalance,
    });
  } catch (error) {
    console.error("getAccounts error:", error);
  }
};

export const getAccount = async ({
  appwriteItemId,
}: {
  appwriteItemId: string;
}) => {
  try {
    const account = MOCK_ACCOUNTS.find((a) => a.appwriteItemId === appwriteItemId);
    if (!account) return null;

    const allTxns = getAllTransactions();
    const transactions = allTxns.filter(
      (t) => t.accountId === appwriteItemId ||
             t.senderBankId === appwriteItemId ||
             t.receiverBankId === appwriteItemId
    );

    return parseStringify({
      data: {
        id: account.$id,
        availableBalance: account.availableBalance,
        currentBalance: account.currentBalance,
        officialName: account.officialName,
        mask: account.mask,
        institutionId: account.institutionId,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        appwriteItemId: account.appwriteItemId,
        shareableId: account.shareableId,
      },
      transactions,
    });
  } catch (error) {
    console.error("getAccount error:", error);
  }
};
