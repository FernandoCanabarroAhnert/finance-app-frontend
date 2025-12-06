import type { ICreateWalletDto } from "@/interfaces/wallet/create-wallet.dto";
import { api } from "../api/api";
import type { IUpdateWalletDto } from "@/interfaces/wallet/update-wallet.dto";

const path = "/wallets";

const DEFAULT_PAGE_SIZE = 8;

export const WalletService = {
  findAll: async (page: number = 0) => {
    const response = await api.get(`${path}?page=${page}&size=${DEFAULT_PAGE_SIZE}`);
    return response.data;
  },

  findById: async (id: number) => {
    const response = await api.get(`${path}/${id}`);
    return response.data;
  },

  create: async (data: ICreateWalletDto) => {
    const response = await api.post(path, data);
    return response.data;
  },

  update: async (id: number, data: IUpdateWalletDto) => {
    const response = await api.put(`${path}/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  }

};