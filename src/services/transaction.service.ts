import type { ITransactionRequestDto } from "@/interfaces/transaction/transaction-request.dto";
import { api } from "../api/api";

const path = "/transactions";

const DEFAULT_PAGE_SIZE = 10;

export const TransactionService = {
  findAll: async (page: number = 0) => {
    const response = await api.get(`${path}?page=${page}&size=${DEFAULT_PAGE_SIZE}`);
    return response.data;
  },

  findById: async (id: number) => {
    const response = await api.get(`${path}/${id}`);
    return response.data;
  },

  create: async (data: ITransactionRequestDto) => {
    const response = await api.post(path, data);
    return response.data;
  },

  update: async (id: number, data: ITransactionRequestDto) => {
    const response = await api.put(`${path}/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  },

  getBalanceReport: async () => {
    const response = await api.get(`${path}/balance-report`);
    return response.data;
  },

  getMonthlyReport: async () => {
    const response = await api.get(`${path}/monthly-report`);
    return response.data;
  }

};