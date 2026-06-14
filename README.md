# ISTBANK — Deliberately Vulnerable Banking Application
### Penetration Testing Demonstration Project

A full-stack banking web application intentionally built with security
vulnerabilities for educational penetration testing demonstrations.

Built with **Next.js 14**, **TypeScript**, **TailwindCSS**, and **Docker**.
All external dependencies (Plaid, Dwolla, Appwrite) replaced with local mock data.

---

## ⚠️ Security Warning
This application contains **intentional vulnerabilities**. Do NOT deploy to
a public server or use with real financial data. For local/lab use only.

---

## Demo Credentials

| User  | Email                  | Password       | Role  |
|-------|------------------------|----------------|-------|
| Alice | alice@istbank.com      | password123    | user  |
| Bob   | bob@istbank.com        | securepass456  | admin |

**Alice's accounts:** IST Checking (bank_001), IST Savings (bank_002)
**Bob's account:** IST Checking (bank_003)

---

## Quick Start

### Option A — Docker (recommended for demo)
```bash
# Clone and navigate to project
cd foti-banking-app-main

# Build and run
docker-compose up --build

# App available at:
http://localhost:3000
```

### Option B — Local Development
```bash
npm install
npm run dev
```

---

## Vulnerability Index

| # | Vulnerability | OWASP | Endpoint |
|---|---------------|-------|----------|
| 1 | IDOR — Broken Access Control | A01:2021 | `GET /api/transactions?userId=` |
| 2 | Sensitive Data Exposure | A02:2021 | `GET /api/user?userId=` |
| 3 | Missing Rate Limiting | A04:2021 | `POST /api/transfer` |

---

## Exploit Playbooks

Detailed step-by-step attack and fix documentation:

- [`exploits/01-idor.md`](./exploits/01-idor.md)
- [`exploits/02-sensitive-data-exposure.md`](./exploits/02-sensitive-data-exposure.md)
- [`exploits/03-missing-rate-limit.md`](./exploits/03-missing-rate-limit.md)

---

## Architecture

```
ISTBANK/
├── app/
│   ├── (auth)/          # Sign-in, Sign-up pages
│   ├── (root)/          # Dashboard, transactions, transfers
│   └── api/
│       ├── transactions/ # ❌ Vuln #1 — IDOR
│       ├── user/         # ❌ Vuln #2 — Sensitive Data Exposure
│       └── transfer/     # ❌ Vuln #3 — Missing Rate Limiting
├── lib/
│   ├── mock/
│   │   ├── db.ts         # Local mock users, accounts, transactions
│   │   └── auth.ts       # Cookie-based session management
│   └── actions/          # Server actions (user, bank, transaction, transfer)
├── exploits/             # Attack playbooks
├── Dockerfile
└── docker-compose.yml
```

---

## Project Context
This project was built as a penetration testing classroom demonstration,
replacing all external API dependencies with local mock data to enable
fully offline, reproducible security exploits.
