import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSideBar from "@/components/RightSideBar";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import Link from "next/link";

const StatCard = ({
  label,
  value,
  iconBg,
  iconColor,
  icon,
}: {
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
  icon: string;
}) => (
  <div className="stat-card">
    <div className={`stat-card-icon ${iconBg}`}>
      <span className={`text-24 ${iconColor}`}>{icon}</span>
    </div>
    <p className="stat-card-label">{label}</p>
    <p className="stat-card-value">{value}</p>
  </div>
);

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn?.$id });
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  const allTxns = account?.transactions || [];
  const totalIncome = allTxns
    .filter((t: any) => t.type === "credit")
    .reduce((sum: number, t: any) => sum + t.amount, 0);
  const totalExpense = allTxns
    .filter((t: any) => t.type === "debit")
    .reduce((sum: number, t: any) => sum + t.amount, 0);
  const totalSavings = accountsData
    .filter((a: any) => a.subtype === "savings")
    .reduce((sum: number, a: any) => sum + a.currentBalance, 0);

  return (
    <section className="home">
      <div className="home-content">

        {/* ── Card List Section ───────────────────────── */}
        <div className="card-list-section">
          <div className="card-list-header">
            <h2 className="card-list-title">
              Card List
              <span className="card-count-badge">{accountsData.length}</span>
            </h2>
            <Link href="/payment-transfer" className="add-card-btn">
              <span className="text-18 leading-none">+</span> Add Card
            </Link>
          </div>

          {/* Cards row */}
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {accountsData.map((acc: any, i: number) => (
              <Link
                key={acc.appwriteItemId}
                href={`/transaction-history/?id=${acc.appwriteItemId}`}
                className={`bank-card flex-shrink-0 ${i > 0 ? "bank-card-dark" : ""}`}
                style={i > 0 ? {
                  background: "linear-gradient(135deg, #2A2D3A 0%, #1C1E26 100%)",
                  border: "1px solid #2E3140",
                } : {}}
              >
                {/* Chip */}
                <div className="flex items-start justify-between">
                  <div className="w-8 h-5 rounded bg-brand-yellow/90 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-px w-6 h-3.5 p-px">
                      <div className="bg-yellow-600/60 rounded-sm" />
                      <div className="bg-yellow-600/60 rounded-sm" />
                      <div className="bg-yellow-600/60 rounded-sm" />
                      <div className="bg-yellow-600/60 rounded-sm" />
                    </div>
                  </div>
                  <span className="text-10 font-bold text-white/60 uppercase tracking-widest">
                    ISTBANK
                  </span>
                </div>

                {/* Card details */}
                <div className="flex flex-col gap-1">
                  <p className="text-12 tracking-[2px] text-white/70">
                    ●●●● ●●●● ●●●● {acc.mask}
                  </p>
                  <p className="text-20 font-bold text-white">
                    {formatAmount(acc.currentBalance)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-12 text-white/70">{loggedIn.firstName} {loggedIn.lastName}</span>
                    <span className="text-12 font-bold text-white/80 tracking-wider">VISA</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Stats + Money Flow ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Stat 2×2 grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Total Balance"
              value={formatAmount(accounts?.totalCurrentBalance)}
              iconBg="bg-blue-500/10"
              iconColor="text-brand-blue"
              icon="💳"
            />
            <StatCard
              label="Total Income"
              value={formatAmount(totalIncome)}
              iconBg="bg-green-500/10"
              iconColor="text-brand-green"
              icon="💰"
            />
            <StatCard
              label="Total Savings"
              value={formatAmount(totalSavings)}
              iconBg="bg-yellow-400/10"
              iconColor="text-brand-yellow"
              icon="🏦"
            />
            <StatCard
              label="Total Expense"
              value={formatAmount(totalExpense)}
              iconBg="bg-red-500/10"
              iconColor="text-red-400"
              icon="📤"
            />
          </div>

          {/* Money Flow chart placeholder */}
          <div className="money-flow-section flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-16 font-semibold text-ist-text">Money Flow</h3>
              <select
                className="text-12 rounded-lg border border-ist-border px-2 py-1 text-ist-subtext"
                style={{ backgroundColor: "var(--ist-bg)" }}
              >
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            <MoneyFlowChart transactions={allTxns} />
          </div>
        </div>

        {/* ── My Activity ─────────────────────────────── */}
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />

      </div>

      {/* ── Right Sidebar ───────────────────────────── */}
      <RightSideBar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

// Simple SVG money flow chart
function MoneyFlowChart({ transactions }: { transactions: any[] }) {
  // Build 6-month buckets
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const income  = [1200, 2100, 1800, 2500, 1900, 3100];
  const expense = [800,  1400, 1200, 1800, 1100, 2200];

  const maxVal = Math.max(...income, ...expense);
  const W = 400; const H = 140; const pad = 20;
  const step = (W - pad * 2) / (months.length - 1);

  const toY = (v: number) => H - pad - ((v / maxVal) * (H - pad * 2));

  const incomePoints = income.map((v, i) => `${pad + i * step},${toY(v)}`).join(" ");
  const expensePoints = expense.map((v, i) => `${pad + i * step},${toY(v)}`).join(" ");

  return (
    <div className="flex-1 min-h-0">
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 0.33, 0.66, 1].map((t, i) => (
          <line
            key={i}
            x1={pad} y1={toY(maxVal * t)}
            x2={W - pad} y2={toY(maxVal * t)}
            stroke="var(--ist-border)" strokeWidth="0.5"
          />
        ))}

        {/* Expense line */}
        <polyline
          points={expensePoints}
          fill="none"
          stroke="#ED8835"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Income line */}
        <polyline
          points={incomePoints}
          fill="none"
          stroke="#377DFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Dots on income */}
        {income.map((v, i) => (
          <circle key={i} cx={pad + i * step} cy={toY(v)} r="3" fill="#377DFF" />
        ))}

        {/* Month labels */}
        {months.map((m, i) => (
          <text
            key={i}
            x={pad + i * step}
            y={H + 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--ist-muted)"
          >{m}</text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-brand-blue rounded" />
          <span className="text-11 text-ist-subtext">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-brand-orange rounded" />
          <span className="text-11 text-ist-subtext">Expense</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
