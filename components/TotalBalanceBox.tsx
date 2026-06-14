import React from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-center size-8 rounded-full bg-lime-neon/20 border border-lime-neon/40">
            <span className="text-12 font-bold text-lime-neon">{totalBanks}</span>
          </div>
          <h2 className="text-14 font-medium text-ist-subtext">
            Bank {totalBanks === 1 ? "Account" : "Accounts"}
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
