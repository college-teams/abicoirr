import { AxiosInstance } from "axios";
import { AdminOrderResponseData } from "./Admin";

export type AbstractResponse<T> = {
  statusCode: number;
  statusType: string;
  statusMessage: string;
  httpStatusCode: string;
  timestamp: string;
  data: T;
};

export type ApiError = {
  status: boolean;
  message: string;
  statusCode: number;
};

export const isApiError = (data: unknown): data is ApiError => {
  return (data as ApiError).status != null;
};

export type GetAdminOrders = (
  api: AxiosInstance
) => Promise<AdminOrderResponseData[] | ApiError>;
