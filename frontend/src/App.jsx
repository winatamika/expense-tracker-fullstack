import { useEffect, useMemo, useState } from "react";

import {
  createTransaction,
  deleteTransaction,
  getMonthlySummary,
  getTransactions,
} from "./api/transactions";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const initialForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "",
};

const currency = (value) =>
  Number(value || 0).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [form, setForm] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    const [transactionsResponse, summaryResponse] = await Promise.all([
      getTransactions(),
      getMonthlySummary(),
    ]);
    setTransactions(transactionsResponse.data);
    setSummary(summaryResponse.data);
  };

  useEffect(() => {
    loadDashboard().catch(() => setError("Unable to load dashboard data."));
  }, []);

  const totals = useMemo(
    () => [
      { label: "Total income", value: currency(summary.total_income), tone: "income" },
      { label: "Total expense", value: currency(summary.total_expense), tone: "expense" },
      { label: "Balance", value: currency(summary.balance), tone: "balance" },
    ],
    [summary],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await createTransaction(form);
      setForm(initialForm);
      await loadDashboard();
    } catch (apiError) {
      const response = apiError.response?.data;
      setError(response ? Object.values(response).flat().join(" ") : "Unable to save transaction.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteTransaction(id);
      await loadDashboard();
    } catch {
      setError("Unable to delete transaction.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-sky-600">Expense Tracker</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Monthly cashflow
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Track income, expenses, categories, and your current monthly balance.
          </p>
        </header>

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          {totals.map((item) => (
            <SummaryCard key={item.label} {...item} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
          <TransactionForm form={form} setForm={setForm} onSubmit={handleSubmit} isSaving={isSaving} />
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </section>
      </div>
    </main>
  );
}
