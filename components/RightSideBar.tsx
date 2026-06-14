import Link from "next/link";
import React from "react";
import BankCard from "./BankCard";
import { countTransactionCategories, formatAmount, formatDateTime } from "@/lib/utils";

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
  const recentTxns = transactions?.slice(0, 5) || [];
  const totalBalance = banks?.reduce(
    (sum: number, b: any) => sum + (b.currentBalance || 0), 0
  ) || 0;

  // Daily limit mock data for demo
  const dailyLimit = 6500;
  const dailyUsed = 4225;
  const limitPct = Math.round((dailyUsed / dailyLimit) * 100);

  // Quick transfer contacts (mock)
  const contacts = [
    { name: "Thuo",   initial: "TH", color: "bg-brand-blue" },
    { name: "Sumi",   initial: "SU", color: "bg-brand-green" },
    { name: "Kevin",  initial: "KE", color: "bg-brand-orange" },
    { name: "Fatma",  initial: "FA", color: "bg-purple-500" },
    { name: "Hassan", initial: "HA", color: "bg-brand-yellow" },
  ];

  // Savings goals mock
  const savings = [
    { name: "Emergency Fund", amount: 7240, color: "bg-brand-green",  pct: 72 },
    { name: "Education",      amount: 8000, color: "bg-brand-blue",   pct: 55 },
    { name: "New Laptop",     amount: 4500, color: "bg-brand-orange", pct: 40 },
  ];

  return (
    <aside className="right-sidebar">

      {/* ── My Wallet Header ─────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-ist-border">
        <h2 className="text-16 font-semibold text-ist-text">My Wallet</h2>
        <button className="flex items-center gap-0.5 text-ist-muted hover:text-ist-subtext transition-all">
          <span className="w-1 h-1 rounded-full bg-current inline-block" />
          <span className="w-1 h-1 rounded-full bg-current inline-block" />
          <span className="w-1 h-1 rounded-full bg-current inline-block" />
        </button>
      </div>

      {/* ── Your Balance ─────────────────────────────── */}
      <div className="wallet-panel">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-12 text-ist-subtext">Your Balance</p>
            <p className="wallet-balance">{formatAmount(totalBalance)}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-11 text-ist-muted">
                {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </p>
              <span className="text-11 font-semibold text-brand-green">↑ +2.5%</span>
            </div>
          </div>
          <button className="flex items-center gap-0.5 text-ist-muted mt-1">
            <span className="w-1 h-1 rounded-full bg-current inline-block" />
            <span className="w-1 h-1 rounded-full bg-current inline-block" />
            <span className="w-1 h-1 rounded-full bg-current inline-block" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {[
            { label: "Top Up",   icon: "↑", color: "bg-brand-blue/10 text-brand-blue" },
            { label: "Transfer", icon: "⇄", color: "bg-brand-green/10 text-brand-green" },
            { label: "Request",  icon: "↓", color: "bg-brand-orange/10 text-brand-orange" },
            { label: "History",  icon: "◷", color: "bg-purple-500/10 text-purple-500" },
          ].map((a) => (
            <div key={a.label} className="wallet-action-btn">
              <div className={`wallet-action-icon text-16 font-bold ${a.color}`}>{a.icon}</div>
              <span className="text-10 text-ist-subtext font-medium text-center leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Daily Limit ──────────────────────────────── */}
      <div className="flex flex-col gap-2 px-5 py-4 border-b border-ist-border">
        <div className="flex items-center justify-between">
          <p className="text-14 font-semibold text-ist-text">Daily Limit</p>
          <p className="text-12 font-semibold text-ist-subtext">{limitPct}%</p>
        </div>
        <div className="limit-bar-track">
          <div className="limit-bar-fill" style={{ width: `${limitPct}%` }} />
        </div>
        <p className="text-11 text-ist-muted">
          {formatAmount(dailyUsed)} used from {formatAmount(dailyLimit)} limit
        </p>
      </div>

      {/* ── Quick Transfer ────────────────────────────── */}
      <div className="flex flex-col gap-3 px-5 py-4 border-b border-ist-border">
        <h3 className="text-14 font-semibold text-ist-text">Quick Transfer</h3>
        <div className="flex items-center gap-2">
          {contacts.map((c) => (
            <button
              key={c.name}
              title={c.name}
              className={`flex-center size-9 rounded-full text-white text-11 font-bold transition-transform hover:scale-110 ${c.color}`}
            >
              {c.initial}
            </button>
          ))}
          <button className="flex-center size-9 rounded-full border border-ist-border text-ist-muted hover:border-brand-blue transition-all text-16">
            ›
          </button>
        </div>

        {/* Account input */}
        <div
          className="flex items-center rounded-xl border border-ist-border px-3 py-2.5"
          style={{ backgroundColor: "var(--ist-bg)" }}
        >
          <input
            type="text"
            placeholder="Enter account number"
            className="flex-1 bg-transparent text-13 text-ist-text placeholder:text-ist-muted outline-none"
          />
        </div>

        {/* Send + Draft buttons */}
        <div className="flex gap-2">
          <Link
            href="/payment-transfer"
            className="flex-1 flex-center rounded-xl py-2.5 text-13 font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#377DFF" }}
          >
            Send money
          </Link>
          <button
            className="flex-1 flex-center rounded-xl py-2.5 text-13 font-medium text-ist-subtext border border-ist-border hover:border-brand-blue transition-all"
            style={{ backgroundColor: "var(--ist-bg)" }}
          >
            Save as draft
          </button>
        </div>
      </div>

      {/* ── My Savings ───────────────────────────────── */}
      <div className="flex flex-col gap-3 px-5 py-4 border-b border-ist-border">
        <div className="flex items-center justify-between">
          <h3 className="text-14 font-semibold text-ist-text">My Savings</h3>
          <button className="flex items-center gap-0.5 text-ist-muted">
            <span className="w-1 h-1 rounded-full bg-current inline-block" />
            <span className="w-1 h-1 rounded-full bg-current inline-block" />
            <span className="w-1 h-1 rounded-full bg-current inline-block" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {savings.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-3">
              <div className={`flex-center size-8 rounded-full ${s.color}/20`}>
                <div className={`size-3 rounded-full ${s.color}`} />
              </div>
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-13 font-medium text-ist-text truncate">{s.name}</p>
                  <p className="text-13 font-semibold text-ist-text ml-2">{formatAmount(s.amount)}</p>
                </div>
                <div className="limit-bar-track h-1.5">
                  <div className={`h-1.5 rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Transactions ───────────────────────── */}
      <div className="flex flex-col gap-3 px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-14 font-semibold text-ist-text">Recent Activity</h3>
          <Link href="/transaction-history" className="text-12 font-semibold text-brand-blue hover:opacity-80">
            View All
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {recentTxns.length > 0 ? recentTxns.map((txn: any) => (
            <div key={txn.id} className="flex items-center gap-3">
              <div
                className="flex-center size-9 rounded-full text-13 font-bold text-white shrink-0"
                style={{ backgroundColor: txn.type === "credit" ? "#71D163" : "#377DFF" }}
              >
                {txn.name?.[0] || "T"}
              </div>
              <div className="flex flex-1 flex-col min-w-0">
                <p className="text-13 font-semibold text-ist-text truncate">{txn.name}</p>
                <p className="text-11 text-ist-muted">
                  {txn.$createdAt
                    ? formatDateTime(new Date(txn.$createdAt)).dateTime
                    : ""}
                </p>
              </div>
              <span
                className={`text-13 font-bold shrink-0 ${
                  txn.type === "credit" ? "text-brand-green" : "text-red-400"
                }`}
              >
                {txn.type === "credit" ? "+" : "-"}{formatAmount(txn.amount)}
              </span>
            </div>
          )) : (
            <p className="text-13 text-ist-muted text-center py-3">No transactions yet</p>
          )}
        </div>
      </div>

    </aside>
  );
};

export default RightSideBar;
