import axios, { AxiosError, AxiosInstance } from 'axios';

import { ENV } from '@/config/env';

export const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Unknown network error';

    return Promise.reject({
      status: error.response?.status,
      message,
      original: error,
    });
  },
);

export interface ApiError {
  status?: number;
  message: string;
  original?: unknown;
}
