"use server";

/**
 * ISTBANK - Transfer Actions (Mock replacement for Dwolla)
 * Simulates fund transfers between local mock accounts.
 */

import { MOCK_ACCOUNTS } from "../mock/db";
import { parseStringify } from "../utils";

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}) => {
  try {
    // Extract bank IDs from mock funding URLs
    const sourceId = sourceFundingSourceUrl.split("/").pop();
    const destId = destinationFundingSourceUrl.split("/").pop();

    const source = MOCK_ACCOUNTS.find((a) => a.$id === sourceId);
    const dest = MOCK_ACCOUNTS.find((a) => a.$id === destId);

    if (!source || !dest) throw new Error("Account not found");

    const transferAmount = parseFloat(amount);
    if (source.availableBalance < transferAmount)
      throw new Error("Insufficient funds");

    // Deduct from source
    source.availableBalance -= transferAmount;
    source.currentBalance -= transferAmount;

    // Credit to destination
    dest.availableBalance += transferAmount;
    dest.currentBalance += transferAmount;

    const transferId = `transfer_${Date.now()}`;
    return parseStringify({ transferId, status: "processed" });
  } catch (error) {
    console.error("createTransfer error:", error);
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}) => {
  // Mock: always succeeds, returns a fake funding source URL
  return `https://api.istbank.local/funding/${dwollaCustomerId}`;
};

export const createDwollaCustomer = async (newCustomer: any) => {
  return `https://api.istbank.local/customers/${Date.now()}`;
};

export const createFundingSource = async (options: any) => {
  return `https://api.istbank.local/funding/${Date.now()}`;
};

export const createOnDemandAuthorization = async () => {
  return { "on-demand-authorization": { href: "https://api.istbank.local/auth" } };
};
