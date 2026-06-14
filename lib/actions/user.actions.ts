"use server";

/**
 * ISTBANK - User Actions (Mock replacement for Appwrite + Dwolla)
 */

import { cookies } from "next/headers";
import { MOCK_USERS } from "../mock/db";
import {
  createSession,
  getUserIdFromToken,
  getSessionFromCookies,
} from "../mock/auth";
import { parseStringify } from "../utils";

export const getUserInfo = async ({ userId }: { userId: string }) => {
  try {
    const user = MOCK_USERS.find((u) => u.$id === userId);
    return user ? parseStringify(user) : null;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) return null;

    const token = createSession(user.$id);

    cookies().set("istbank-session", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return parseStringify(user);
  } catch (error) {
    console.error("Sign in error:", error);
    return null;
  }
};

export const signUp = async (userData: {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
}) => {
  try {
    const exists = MOCK_USERS.find((u) => u.email === userData.email);
    if (exists) return null;

    const newUser = {
      $id: `user_${Date.now()}`,
      userId: `user_${Date.now()}`,
      role: "user",
      ...userData,
    };

    MOCK_USERS.push(newUser);

    const token = createSession(newUser.$id);
    cookies().set("istbank-session", token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 24,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Sign up error:", error);
    return null;
  }
};

export async function getLoggedInUser() {
  try {
    const token = getSessionFromCookies();
    if (!token) return null;

    const userId = getUserIdFromToken(token);
    if (!userId) return null;

    const user = MOCK_USERS.find((u) => u.$id === userId);
    return user ? parseStringify(user) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    cookies().delete("istbank-session");
  } catch (error) {
    return null;
  }
};

export const getBanks = async ({ userId }: { userId: string }) => {
  const { MOCK_ACCOUNTS } = await import("../mock/db");
  const banks = MOCK_ACCOUNTS.filter((a) => a.userId === userId);
  return parseStringify(banks);
};

export const getBank = async ({ documentId }: { documentId: string }) => {
  const { MOCK_ACCOUNTS } = await import("../mock/db");
  const bank = MOCK_ACCOUNTS.find((a) => a.$id === documentId);
  return bank ? parseStringify(bank) : null;
};

export const getBankByAccountId = async ({
  accountId,
}: {
  accountId: string;
}) => {
  const { MOCK_ACCOUNTS } = await import("../mock/db");
  const bank = MOCK_ACCOUNTS.find((a) => a.$id === accountId);
  return bank ? parseStringify(bank) : null;
};
