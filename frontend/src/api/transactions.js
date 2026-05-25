import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export const getTransactions = () => api.get("/transactions/");
export const createTransaction = (payload) => api.post("/transactions/", payload);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}/`);
export const updateTransaction = (id, payload) => api.patch(`/transactions/${id}/`, payload);
export const getMonthlySummary = () => api.get("/summary/monthly/");
