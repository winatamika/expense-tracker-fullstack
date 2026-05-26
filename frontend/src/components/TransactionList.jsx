export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return (
    <section className="min-w-0 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No transactions yet.
      </section>
    );
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-950">Transactions</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {transactions.map((transaction) => (
          <article key={transaction.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-950">{transaction.title}</h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    transaction.type === "income"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {transaction.category} · {new Date(transaction.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <p
                className={`text-base font-semibold ${
                  transaction.type === "income" ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {Number(transaction.amount).toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <button
                type="button"
                onClick={() => onDelete(transaction.id)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
