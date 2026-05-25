export default function SummaryCard({ label, value, tone }) {
  const styles = {
    income: "border-emerald-200 bg-emerald-50 text-emerald-700",
    expense: "border-rose-200 bg-rose-50 text-rose-700",
    balance: "border-sky-200 bg-sky-50 text-sky-700",
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tracking-normal text-slate-950">{value}</p>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone]}`}>
          {tone}
        </span>
      </div>
    </section>
  );
}
