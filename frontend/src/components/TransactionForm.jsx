const emptyForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "",
};

export default function TransactionForm({ form, setForm, onSubmit, isSaving }) {
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-950">Add transaction</h2>
        <button
          type="button"
          onClick={() => setForm(emptyForm)}
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          Clear
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Title
          <input
            required
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Lunch, salary, rent"
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Amount
          <input
            required
            min="0.01"
            step="0.01"
            type="number"
            value={form.amount}
            onChange={(event) => updateField("amount", event.target.value)}
            placeholder="0.00"
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Type
          <select
            value={form.type}
            onChange={(event) => updateField("type", event.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Category
          <input
            required
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            placeholder="Food, work, bills"
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-5 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSaving ? "Saving..." : "Save transaction"}
      </button>
    </form>
  );
}
