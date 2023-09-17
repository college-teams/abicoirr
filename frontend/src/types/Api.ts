import { AxiosInstance } from "axios";
import { AdminOrderResponseData, ContactDetails, MessageCount } from "./Admin";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

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

export type GetContactDetailList = (
  api: AxiosInstance
) => Promise<ContactDetails[] | ApiError>;

export type GetContactDetailsById = (
  api: AxiosInstance,
  id: number
) => Promise<ContactDetails | ApiError>;

export type GetUnReadMessageCount = (
  api: AxiosInstance
) => Promise<MessageCount | ApiError>;
