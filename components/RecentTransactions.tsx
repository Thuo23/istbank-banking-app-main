import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions,
  appwriteItemId,
  page,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil((transactions?.length || 0) / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = transactions?.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <section className="activity-section">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-16 font-semibold text-ist-text">My Activity</h2>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 rounded-lg border border-ist-border px-3 py-1.5 text-12 font-medium text-ist-subtext hover:border-brand-blue transition-all"
            style={{ backgroundColor: "var(--ist-bg)" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </button>
          <Link
            href={`/transaction-history/?id=${appwriteItemId}`}
            className="text-12 font-semibold hover:opacity-80 transition-all"
            style={{ color: "#377DFF" }}
          >
            View all
          </Link>
        </div>
      </div>

      {/* Account tabs */}
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList
          className="recent-transactions-tablist gap-1 rounded-xl p-1 mb-4 w-fit"
          style={{ backgroundColor: "var(--ist-bg)" }}
        >
          {accounts.map((account: Account) => (
            <TabsTrigger
              key={account.id}
              value={account.appwriteItemId}
              className="rounded-lg px-3 py-1.5 text-13 font-medium text-ist-subtext data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
            >
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />
            <TransactionsTable transactions={currentTransactions} />
            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
