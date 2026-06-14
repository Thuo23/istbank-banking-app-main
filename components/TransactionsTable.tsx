import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const ICON_COLORS = [
  "#377DFF", "#71D163", "#ED8835", "#FFCC00",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return ICON_COLORS[Math.abs(hash) % ICON_COLORS.length];
}

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    Success:   "bg-green-500/10 text-brand-green border-green-500/20",
    Processing:"bg-yellow-400/10 text-brand-yellow border-yellow-400/20",
    Failed:    "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-11 font-medium",
      colors[status] || "bg-ist-card text-ist-subtext border-ist-border"
    )}>
      <span className="size-1.5 rounded-full bg-current inline-block" />
      {status}
    </span>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="rounded-xl border border-ist-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow
            className="border-b border-ist-border hover:bg-transparent"
            style={{ backgroundColor: "var(--ist-card)" }}
          >
            {["Transaction", "Amount", "Status", "Date", "Channel", "Category"].map((h) => (
              <TableHead key={h} className="px-4 py-3 text-12 font-semibold text-ist-subtext uppercase tracking-wide">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((t: Transaction) => {
            const status = getTransactionStatus(new Date(t.date));
            const amount = formatAmount(t.amount);
            const isDebit = t.type === "debit";
            const color = getColor(t.name);

            return (
              <TableRow
                key={t.id}
                className="border-b border-ist-border transition-colors hover:bg-ist-card"
                style={{ backgroundColor: "var(--ist-surface)" }}
              >
                {/* Name */}
                <TableCell className="px-4 py-3 max-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-center size-8 rounded-full text-white text-12 font-bold shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {removeSpecialCharacters(t.name)[0]}
                    </div>
                    <span className="text-14 font-medium text-ist-text truncate">
                      {removeSpecialCharacters(t.name)}
                    </span>
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell className="px-4 py-3">
                  <span className={cn(
                    "text-14 font-bold",
                    isDebit ? "text-red-400" : "text-brand-green"
                  )}>
                    {isDebit ? `-${amount}` : `+${amount}`}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell className="px-4 py-3">
                  <StatusBadge status={status} />
                </TableCell>

                {/* Date */}
                <TableCell className="px-4 py-3 text-13 text-ist-subtext whitespace-nowrap">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>

                {/* Channel */}
                <TableCell className="px-4 py-3 text-13 text-ist-subtext capitalize">
                  {t.paymentChannel}
                </TableCell>

                {/* Category */}
                <TableCell className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ist-border px-2.5 py-0.5 text-11 font-medium text-ist-subtext"
                    style={{ backgroundColor: "var(--ist-card)" }}>
                    {t.category}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
