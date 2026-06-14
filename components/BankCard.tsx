import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
      >
        <div className="bank-card_content">
          {/* Chip */}
          <div className="flex items-start justify-between">
            <div className="w-8 h-6 rounded-md bg-brand-yellow opacity-90 flex items-center justify-center">
              <div className="w-6 h-4 rounded-sm border border-yellow-600/50 grid grid-cols-2 gap-px p-px">
                <div className="bg-yellow-500/50 rounded-sm"/>
                <div className="bg-yellow-500/50 rounded-sm"/>
                <div className="bg-yellow-500/50 rounded-sm"/>
                <div className="bg-yellow-500/50 rounded-sm"/>
              </div>
            </div>
            <span className="text-10 font-bold text-white/70 uppercase tracking-widest">
              ISTBANK
            </span>
          </div>

          <article className="flex flex-col gap-2">
            <p className="text-14 font-medium tracking-[2px] text-white/80">
              ●●●● ●●●● ●●●● <span className="text-16 text-white">{account?.mask}</span>
            </p>
            <p className="font-clash-display font-bold text-white text-20">
              {formatAmount(account.currentBalance)}
            </p>
            <div className="flex justify-between items-center">
              <h1 className="text-12 font-semibold text-white/80">{userName}</h1>
              <h2 className="text-12 font-semibold text-white/60">●● / ●●</h2>
            </div>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={18} height={22} alt="pay"
            className="opacity-80" />
          <Image
            src="/icons/mastercard.svg"
            width={40}
            height={28}
            alt="mastercard"
            className="opacity-90"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0 opacity-20 mix-blend-overlay"
        />
      </Link>

      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  );
};

export default BankCard;
