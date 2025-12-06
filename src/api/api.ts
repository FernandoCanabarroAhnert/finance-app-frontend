import axios from "axios";

let getToken: (() => Promise<string | undefined>) | null = null;

export const setTokenGetter = (
  getter: () => Promise<string | undefined>
) => {
  getToken = getter;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para adicionar o token
api.interceptors.request.use(async (config) => {
  if (getToken) {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});