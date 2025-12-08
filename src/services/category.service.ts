import type { ICategoryRequestDto } from "@/interfaces/category/category-request.dto";
import { api } from "../api/api";

const path = "/categories";

const DEFAULT_PAGE_SIZE = 10;

export const CategoryService = {
  findAll: async (page: number = 0) => {
    const response = await api.get(`${path}?page=${page}&size=${DEFAULT_PAGE_SIZE}`);
    return response.data;
  },

  findById: async (id: number) => {
    const response = await api.get(`${path}/${id}`);
    return response.data;
  },

  create: async (data: ICategoryRequestDto) => {
    const response = await api.post(path, data);
    return response.data;
  },

  update: async (id: number, data: ICategoryRequestDto) => {
    const response = await api.put(`${path}/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  }

};