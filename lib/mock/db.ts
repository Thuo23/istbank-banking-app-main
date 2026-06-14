/**
 * ISTBANK - Mock Local Database
 * 5 users, 8 accounts total:
 * - Thuo: checking + savings
 * - Sumi: checking + savings
 * - Kevin: checking + savings
 * - Fatma: checking only
 * - Hassan: checking only
 */

export type MockUser = {
  $id: string;
  userId: string;
  email: string;
  password: string; // stored in plaintext intentionally for Vuln #2 demo
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  role: string; // intentionally exposed for privilege escalation demo
};

export type MockAccount = {
  $id: string;
  userId: string;
  appwriteItemId: string;
  shareableId: string;
  name: string;
  officialName: string;
  mask: string;
  type: string;
  subtype: string;
  availableBalance: number;
  currentBalance: number;
  institutionId: string;
  fundingSourceUrl: string;
};

export type MockTransaction = {
  $id: string;
  id: string;
  name: string;
  amount: number;
  date: string;
  $createdAt: string;
  paymentChannel: string;
  channel: string;
  category: string;
  type: string;
  accountId: string;
  senderBankId: string;
  receiverBankId: string;
  pending: boolean;
  image: string;
};

// ── Seed Users ──────────────────────────────────────────────
export const MOCK_USERS: MockUser[] = [
  {
    $id: "user_001",
    userId: "user_001",
    email: "thuo@istbank.com",
    password: "thuo1234",
    firstName: "Thuo",
    lastName: "Hum",
    address1: "14 Westlands Road",
    city: "Nairobi",
    state: "NB",
    postalCode: "00100",
    dateOfBirth: "1993-03-15",
    ssn: "1001",
    role: "admin", // intentional — for privilege escalation demo
  },
  {
    $id: "user_002",
    userId: "user_002",
    email: "hassan@istbank.com",
    password: "hassan1234",
    firstName: "Hassan",
    lastName: "Moh",
    address1: "22 Moi Avenue",
    city: "Mombasa",
    state: "MS",
    postalCode: "80100",
    dateOfBirth: "1990-07-20",
    ssn: "1002",
    role: "user",
  },
  {
    $id: "user_003",
    userId: "user_003",
    email: "sumi@istbank.com",
    password: "sumi1234",
    firstName: "Sumi",
    lastName: "Sha",
    address1: "5 Parklands Avenue",
    city: "Nairobi",
    state: "NB",
    postalCode: "00600",
    dateOfBirth: "1995-11-08",
    ssn: "1003",
    role: "user",
  },
  {
    $id: "user_004",
    userId: "user_004",
    email: "kevin@istbank.com",
    password: "kevin1234",
    firstName: "Kevin",
    lastName: "Leh",
    address1: "9 Tom Mboya Street",
    city: "Nairobi",
    state: "KS",
    postalCode: "40100",
    dateOfBirth: "1997-01-25",
    ssn: "1004",
    role: "user",
  },
  {
    $id: "user_005",
    userId: "user_005",
    email: "fatma@istbank.com",
    password: "fatma1234",
    firstName: "Fatma",
    lastName: "Ahm",
    address1: "3 Nyali Road",
    city: "Mombasa",
    state: "MS",
    postalCode: "80200",
    dateOfBirth: "1992-05-30",
    ssn: "1005",
    role: "user",
  },
];

// ── Seed Bank Accounts ───────────────────────────────────────
export const MOCK_ACCOUNTS: MockAccount[] = [
  // Thuo — checking + savings
  {
    $id: "bank_001",
    userId: "user_001",
    appwriteItemId: "bank_001",
    shareableId: btoa("share_001"),
    name: "IST Checking",
    officialName: "ISTBANK Personal Checking Account",
    mask: "4001",
    type: "depository",
    subtype: "checking",
    availableBalance: 5200.0,
    currentBalance: 5200.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_001",
  },
  {
    $id: "bank_002",
    userId: "user_001",
    appwriteItemId: "bank_002",
    shareableId: btoa("share_002"),
    name: "IST Savings",
    officialName: "ISTBANK Personal Savings Account",
    mask: "4002",
    type: "depository",
    subtype: "savings",
    availableBalance: 18500.0,
    currentBalance: 18500.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_002",
  },

  // Hassan — checking only
  {
    $id: "bank_003",
    userId: "user_002",
    appwriteItemId: "bank_003",
    shareableId: btoa("share_003"),
    name: "IST Checking",
    officialName: "ISTBANK Personal Checking Account",
    mask: "4003",
    type: "depository",
    subtype: "checking",
    availableBalance: 3400.0,
    currentBalance: 3400.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_003",
  },

  // Sumi — checking + savings
  {
    $id: "bank_004",
    userId: "user_003",
    appwriteItemId: "bank_004",
    shareableId: btoa("share_004"),
    name: "IST Checking",
    officialName: "ISTBANK Personal Checking Account",
    mask: "4004",
    type: "depository",
    subtype: "checking",
    availableBalance: 7100.0,
    currentBalance: 7100.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_004",
  },
  {
    $id: "bank_005",
    userId: "user_003",
    appwriteItemId: "bank_005",
    shareableId: btoa("share_005"),
    name: "IST Savings",
    officialName: "ISTBANK Personal Savings Account",
    mask: "4005",
    type: "depository",
    subtype: "savings",
    availableBalance: 22000.0,
    currentBalance: 22000.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_005",
  },

  // Kevin — checking + savings
  {
    $id: "bank_006",
    userId: "user_004",
    appwriteItemId: "bank_006",
    shareableId: btoa("share_006"),
    name: "IST Checking",
    officialName: "ISTBANK Personal Checking Account",
    mask: "4006",
    type: "depository",
    subtype: "checking",
    availableBalance: 4800.0,
    currentBalance: 4800.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_006",
  },
  {
    $id: "bank_007",
    userId: "user_004",
    appwriteItemId: "bank_007",
    shareableId: btoa("share_007"),
    name: "IST Savings",
    officialName: "ISTBANK Personal Savings Account",
    mask: "4007",
    type: "depository",
    subtype: "savings",
    availableBalance: 9300.0,
    currentBalance: 9300.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_007",
  },

  // Fatma — checking only
  {
    $id: "bank_008",
    userId: "user_005",
    appwriteItemId: "bank_008",
    shareableId: btoa("share_008"),
    name: "IST Checking",
    officialName: "ISTBANK Personal Checking Account",
    mask: "4008",
    type: "depository",
    subtype: "checking",
    availableBalance: 6600.0,
    currentBalance: 6600.0,
    institutionId: "ist_001",
    fundingSourceUrl: "https://api.istbank.local/funding/bank_008",
  },
];

// ── Seed Transactions ────────────────────────────────────────
export const MOCK_TRANSACTIONS: MockTransaction[] = [
  // Thuo transactions
  {
    $id: "txn_001", id: "txn_001",
    name: "Naivas Supermarket", amount: 62.5,
    date: "2025-06-01", $createdAt: "2025-06-01T09:00:00Z",
    paymentChannel: "in store", channel: "in store",
    category: "Food and Drink", type: "debit",
    accountId: "bank_001", senderBankId: "bank_001", receiverBankId: "",
    pending: false, image: "",
  },
  {
    $id: "txn_002", id: "txn_002",
    name: "Salary Deposit", amount: 4500.0,
    date: "2025-06-03", $createdAt: "2025-06-03T08:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "credit",
    accountId: "bank_001", senderBankId: "", receiverBankId: "bank_001",
    pending: false, image: "",
  },
  {
    $id: "txn_003", id: "txn_003",
    name: "Transfer to Hassan", amount: 300.0,
    date: "2025-06-05", $createdAt: "2025-06-05T11:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "debit",
    accountId: "bank_001", senderBankId: "bank_001", receiverBankId: "bank_003",
    pending: false, image: "",
  },
  {
    $id: "txn_004", id: "txn_004",
    name: "Uber Kenya", amount: 14.0,
    date: "2025-06-06", $createdAt: "2025-06-06T07:30:00Z",
    paymentChannel: "online", channel: "online",
    category: "Travel", type: "debit",
    accountId: "bank_001", senderBankId: "bank_001", receiverBankId: "",
    pending: false, image: "",
  },
  {
    $id: "txn_005", id: "txn_005",
    name: "Savings Top-up", amount: 1000.0,
    date: "2025-06-07", $createdAt: "2025-06-07T10:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "credit",
    accountId: "bank_002", senderBankId: "bank_001", receiverBankId: "bank_002",
    pending: false, image: "",
  },

  // Hassan transactions
  {
    $id: "txn_006", id: "txn_006",
    name: "Received from Thuo", amount: 300.0,
    date: "2025-06-05", $createdAt: "2025-06-05T11:01:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "credit",
    accountId: "bank_003", senderBankId: "bank_001", receiverBankId: "bank_003",
    pending: false, image: "",
  },
  {
    $id: "txn_007", id: "txn_007",
    name: "Fort Jesus Entry", amount: 20.0,
    date: "2025-06-08", $createdAt: "2025-06-08T14:00:00Z",
    paymentChannel: "in store", channel: "in store",
    category: "Travel", type: "debit",
    accountId: "bank_003", senderBankId: "bank_003", receiverBankId: "",
    pending: false, image: "",
  },

  // Sumi transactions
  {
    $id: "txn_008", id: "txn_008",
    name: "Java House", amount: 11.5,
    date: "2025-06-02", $createdAt: "2025-06-02T08:00:00Z",
    paymentChannel: "in store", channel: "in store",
    category: "Food and Drink", type: "debit",
    accountId: "bank_004", senderBankId: "bank_004", receiverBankId: "",
    pending: false, image: "",
  },
  {
    $id: "txn_009", id: "txn_009",
    name: "Freelance Payment", amount: 2500.0,
    date: "2025-06-04", $createdAt: "2025-06-04T09:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "credit",
    accountId: "bank_004", senderBankId: "", receiverBankId: "bank_004",
    pending: false, image: "",
  },
  {
    $id: "txn_010", id: "txn_010",
    name: "Netflix", amount: 15.0,
    date: "2025-06-06", $createdAt: "2025-06-06T12:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Entertainment", type: "debit",
    accountId: "bank_004", senderBankId: "bank_004", receiverBankId: "",
    pending: false, image: "",
  },

  // Kevin transactions
  {
    $id: "txn_011", id: "txn_011",
    name: "Zuku Internet", amount: 35.0,
    date: "2025-06-01", $createdAt: "2025-06-01T10:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Utilities", type: "debit",
    accountId: "bank_006", senderBankId: "bank_006", receiverBankId: "",
    pending: false, image: "",
  },
  {
    $id: "txn_012", id: "txn_012",
    name: "Transfer to Fatma", amount: 500.0,
    date: "2025-06-05", $createdAt: "2025-06-05T13:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "debit",
    accountId: "bank_006", senderBankId: "bank_006", receiverBankId: "bank_008",
    pending: false, image: "",
  },
  {
    $id: "txn_013", id: "txn_013",
    name: "Salary Deposit", amount: 3800.0,
    date: "2025-06-03", $createdAt: "2025-06-03T08:30:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "credit",
    accountId: "bank_006", senderBankId: "", receiverBankId: "bank_006",
    pending: false, image: "",
  },

  // Fatma transactions
  {
    $id: "txn_014", id: "txn_014",
    name: "Received from Kevin", amount: 500.0,
    date: "2025-06-05", $createdAt: "2025-06-05T13:01:00Z",
    paymentChannel: "online", channel: "online",
    category: "Transfer", type: "credit",
    accountId: "bank_008", senderBankId: "bank_006", receiverBankId: "bank_008",
    pending: false, image: "",
  },
  {
    $id: "txn_015", id: "txn_015",
    name: "Carrefour", amount: 88.0,
    date: "2025-06-07", $createdAt: "2025-06-07T15:00:00Z",
    paymentChannel: "in store", channel: "in store",
    category: "Food and Drink", type: "debit",
    accountId: "bank_008", senderBankId: "bank_008", receiverBankId: "",
    pending: false, image: "",
  },
  {
    $id: "txn_016", id: "txn_016",
    name: "Airtime Purchase", amount: 10.0,
    date: "2025-06-09", $createdAt: "2025-06-09T09:00:00Z",
    paymentChannel: "online", channel: "online",
    category: "Utilities", type: "debit",
    accountId: "bank_008", senderBankId: "bank_008", receiverBankId: "",
    pending: true, image: "",
  },
];

// ── Runtime transaction store (append new transfers here) ────
export let runtimeTransactions: MockTransaction[] = [];

export function addRuntimeTransaction(txn: MockTransaction) {
  runtimeTransactions.push(txn);
}

export function getAllTransactions(): MockTransaction[] {
  return [...MOCK_TRANSACTIONS, ...runtimeTransactions];
}
