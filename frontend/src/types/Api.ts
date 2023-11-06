import { AxiosInstance } from "axios";
import {
  AdminOrderResponseData,
  Category,
  CategoryList,
  ContactDetails,
  ContactDetailsList,
  CreateAdminOrderRequest,
  CreateProductRequest,
  FileResponse,
  MessageCount,
  Product,
  UpdateAdminOrderRequest,
  UpdateProductRequest,
} from "./Admin";
import { DashboardEntityItemsCount } from "./Dashboard";
import { LoginRequest, LoginResponse, SignupRequest, UserDetails } from "./User";

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

export type GetAdminOrderById = (
  api: AxiosInstance,
  id: number
) => Promise<AdminOrderResponseData | ApiError>;

export type SaveAdminOrder = (
  api: AxiosInstance,
  data: CreateAdminOrderRequest
) => Promise<AdminOrderResponseData | ApiError>;

export type UpdateAdminOrder = (
  api: AxiosInstance,
  adminOrderId: number,
  data: UpdateAdminOrderRequest
) => Promise<AdminOrderResponseData | ApiError>;

export type GetContactDetailList = (
  api: AxiosInstance
) => Promise<ContactDetailsList[] | ApiError>;

export type GetContactDetailsById = (
  api: AxiosInstance,
  id: number
) => Promise<ContactDetails | ApiError>;

export type SaveContactDetails = (
  api: AxiosInstance,
  data: ContactDetails
) => Promise<ContactDetails | ApiError>;

export type GetUnReadMessageCount = (
  api: AxiosInstance
) => Promise<MessageCount | ApiError>;

export type GetCategoryList = (
  api: AxiosInstance
) => Promise<CategoryList[] | ApiError>;

export type GetCategoryById = (
  api: AxiosInstance,
  id: number
) => Promise<CategoryList | ApiError>;

export type UploadFile = (
  api: AxiosInstance,
  file: File,
  entityKey: string
) => Promise<FileResponse | ApiError>;

export type UploadFiles = (
  api: AxiosInstance,
  file: File[],
  entityKey: string
) => Promise<FileResponse[] | ApiError>;

export type DeleteFile = (
  api: AxiosInstance,
  imageKey: string
) => Promise<void | ApiError>;

export type SaveCategory = (
  api: AxiosInstance,
  data: Category
) => Promise<Category | ApiError>;

export type UpdateCategory = (
  api: AxiosInstance,
  id: number,
  data: Category
) => Promise<Category | ApiError>;

export type DeleteCategory = (
  api: AxiosInstance,
  id: number
) => Promise<void | ApiError>;

export type DeleteCategoryImage = (
  api: AxiosInstance,
  id: number,
  imageKey: string
) => Promise<void | ApiError>;

export type GetProductList = (
  api: AxiosInstance
) => Promise<Product[] | ApiError>;

export type GetLatestProductList = (
  api: AxiosInstance,
  limit?: number
) => Promise<Product[] | ApiError>;

export type GetPopularProductList = (
  api: AxiosInstance,
  limit?: number
) => Promise<Product[] | ApiError>;

export type GetProductById = (
  api: AxiosInstance,
  id: number
) => Promise<Product | ApiError>;

export type DeleteProduct = (
  api: AxiosInstance,
  id: number
) => Promise<void | ApiError>;

export type SaveProduct = (
  api: AxiosInstance,
  data: CreateProductRequest
) => Promise<Product | ApiError>;

export type UpdateProduct = (
  api: AxiosInstance,
  id: number,
  data: UpdateProductRequest
) => Promise<Product | ApiError>;

export type DeleteProductImage = (
  api: AxiosInstance,
  productId: number,
  imageKey: string
) => Promise<void | ApiError>;

export type GetCategoryProducts = (
  api: AxiosInstance,
  categoryId: number,
  limit?: number,
  excludedProductIds?: number[]
) => Promise<Product[] | ApiError>;

export type GetDashboardEntityItemsCount = (
  api: AxiosInstance
) => Promise<DashboardEntityItemsCount | ApiError>;

export type GetCurrentUser = (
  api: AxiosInstance
) => Promise<UserDetails | ApiError>;

export type UserLogin = (
  api: AxiosInstance,
  data: LoginRequest
) => Promise<LoginResponse | ApiError>;

export type UserSignup = (
  api: AxiosInstance,
  data: SignupRequest
) => Promise<void | ApiError>;
