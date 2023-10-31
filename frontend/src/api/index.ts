/* eslint-disable @typescript-eslint/no-explicit-any */
import useToast from "../hooks/useToast";
import axios, { AxiosResponse } from "axios";
import {
  AbstractResponse,
  ApiError,
  DeleteCategory,
  DeleteCategoryImage,
  DeleteFile,
  DeleteProduct,
  DeleteProductImage,
  GetAdminOrderById,
  GetAdminOrders,
  GetCategoryById,
  GetCategoryList,
  GetCategoryProducts,
  GetContactDetailList,
  GetContactDetailsById,
  GetDashboardEntityItemsCount,
  GetLatestProductList,
  GetPopularProductList,
  GetProductById,
  GetProductList,
  GetUnReadMessageCount,
  HttpMethod,
  SaveAdminOrder,
  SaveCategory,
  SaveContactDetails,
  SaveProduct,
  UpdateAdminOrder,
  UpdateCategory,
  UpdateProduct,
  UploadFile,
  UploadFiles,
} from "../types/Api";
import {
  AdminOrderResponseData,
  Category,
  CategoryList,
  ContactDetails,
  ContactDetailsList,
  FileResponse,
  MessageCount,
  Product,
} from "../types/Admin";
import { DashboardEntityItemsCount } from "../types/Dashboard";

// eslint-disable-next-line react-hooks/rules-of-hooks
const showToast = useToast();

const handleError = (
  e: any,
  methodName: string,
  errorMessage: string,
  statusCode: number
): ApiError => {
  if (axios.isCancel(e)) {
    console.log("Request is cancelled by abort controller!!");
  } else {
    if (import.meta.env.VITE_DEBUG) {
      console.error(
        "MethodName: ",
        methodName,
        "Message :",
        errorMessage,
        "StatusCode :",
        statusCode,
        "Error stack : ",
        JSON.stringify(e)
      );
    }

    showToast(errorMessage || "Something went wrong", "error");
  }

  return {
    status: false,
    statusCode: statusCode,
    message: errorMessage || "Something went wrong",
  };
};

const makeRequest = async <T>(
  api: any,
  url: string,
  methodName: string,
  errorMessage: string,
  method: HttpMethod,
  data?: any,
  params?: any,
  headers?: HeadersInit
): Promise<T> => {
  try {
    const options = {
      method,
      data,
      headers,
      params,
    };

    const res: AxiosResponse<AbstractResponse<T>> = await api.request({
      url,
      ...options,
    });
    const response = res.data;

    if (response.statusType === "FAILURE") {
      return handleError(
        null,
        methodName,
        response.statusMessage,
        response.statusCode
      ) as unknown as T;
    }

    return response.data;
  } catch (error) {
    let statusCode;
    if (axios.isAxiosError(error)) {
      const responseStatusMessage = error?.response?.data?.statusMessage;
      const responseStatusCode = error?.response?.data?.statusCode;
      errorMessage = responseStatusMessage;
      statusCode = responseStatusCode;
    } else {
      errorMessage =
        errorMessage || "Error occurred while making the HTTP request";
      statusCode = 500;
    }

    return handleError(
      error,
      methodName,
      errorMessage,
      statusCode
    ) as ApiError as T;
  }
};

// ADMIN ORDERS
export const getAdminOrders: GetAdminOrders = async (api) => {
  return makeRequest<AdminOrderResponseData[]>(
    api,
    "/admin-orders/",
    "getAdminOrders",
    "Error occurred while fetching admin orders",
    "GET"
  );
};

export const getAdminOrderById: GetAdminOrderById = async (
  api,
  adminOrderId
) => {
  return makeRequest<AdminOrderResponseData>(
    api,
    `/admin-orders/${adminOrderId}`,
    "getAdminOrderById",
    "Error occurred while fetching admin order",
    "GET"
  );
};

export const saveAdminOrder: SaveAdminOrder = async (api, data) => {
  return makeRequest<AdminOrderResponseData>(
    api,
    `/admin-orders/`,
    "saveAdminOrder",
    "Error occurred while saving admin details",
    "POST",
    data
  );
};

export const updateAdminOrder: UpdateAdminOrder = async (
  api,
  adminOrderId,
  data
) => {
  return makeRequest<AdminOrderResponseData>(
    api,
    `/admin-orders/${adminOrderId}`,
    "saveAdminOrder",
    "Error occurred while updating admin details",
    "PUT",
    data
  );
};

// CONTACT DETAILS
export const getContactDetailList: GetContactDetailList = async (api) => {
  return makeRequest<ContactDetailsList[]>(
    api,
    "/contact-details/",
    "getContactDetailList",
    "Error occurred while fetching contact details",
    "GET"
  );
};

export const getContactDetailsById: GetContactDetailsById = async (api, id) => {
  return makeRequest<ContactDetails>(
    api,
    `/contact-details/${id}`,
    "getContactDetailsById",
    "Error occurred while fetching contact details by id",
    "GET"
  );
};

export const saveContactDetails: SaveContactDetails = async (api, data) => {
  return makeRequest<ContactDetails>(
    api,
    `/contact-details/`,
    "saveContactDetails",
    "Error occurred while saving contact details",
    "POST",
    data
  );
};

export const getUnReadMessageCount: GetUnReadMessageCount = async (api) => {
  return makeRequest<MessageCount>(
    api,
    `/contact-details/message-count`,
    "getUnReadMessageCount",
    "Error occurred while fetching un-read message count",
    "GET"
  );
};

// Category
export const getCategoryList: GetCategoryList = async (api) => {
  return makeRequest<CategoryList[]>(
    api,
    "/category/",
    "getCategoryList",
    "Error occurred while fetching category list",
    "GET"
  );
};

export const getCategoryById: GetCategoryById = async (api, id) => {
  return makeRequest<CategoryList>(
    api,
    `/category/${id}`,
    "getCategoryById",
    "Error occurred while fetching category details",
    "GET"
  );
};

export const saveCategory: SaveCategory = async (api, data) => {
  return makeRequest<Category>(
    api,
    `/category/`,
    "saveCategory",
    "Error occurred while adding category details",
    "POST",
    data
  );
};

export const updateCategory: UpdateCategory = async (api, id, data) => {
  return makeRequest<Category>(
    api,
    `/category/${id}`,
    "updateCategory",
    "Error occurred while updating category details",
    "PUT",
    data
  );
};

export const deleteCategory: DeleteCategory = async (api, id) => {
  return makeRequest<void>(
    api,
    `/category/${id}`,
    "deleteCategory",
    "Error occurred while deleting category details",
    "DELETE"
  );
};

export const deleteCategoryImage: DeleteCategoryImage = async (
  api,
  categoryId,
  imageKey
) => {
  const params = {
    imageKey,
  };
  return makeRequest<void>(
    api,
    `/category/${categoryId}/image`,
    "deleteCategoryImage",
    "Error occurred while deleting category image",
    "DELETE",
    null,
    params
  );
};

export const getCategoryProducts: GetCategoryProducts = async (
  api,
  categoryId,
  limit,
  excludedProductIds = []
) => {
  const params = {
    limit,
    excludedProductIds: excludedProductIds.join(","),
  };
  return makeRequest<Product[]>(
    api,
    `/category/${categoryId}/products`,
    "getCategoryList",
    "Error occurred while fetching category list",
    "GET",
    null,
    params
  );
};

// File
export const uploadFile: UploadFile = async (api, file, entityKey) => {
  const formData = new FormData();
  formData.append("file", file);

  const headers: HeadersInit = {
    "content-type": "multipart/form-data",
  };

  const params = {
    entityKey: entityKey,
  };

  return makeRequest<FileResponse>(
    api,
    `/file`,
    "uploadFile",
    "Error occurred while uploading file to the server",
    "POST",
    formData,
    params,
    headers
  );
};

export const uploadFiles: UploadFiles = async (api, files, entityKey) => {
  const formData = new FormData();

  // Append each file to the FormData object
  files.forEach((file) => {
    formData.append(`files`, file);
  });

  const headers: HeadersInit = {
    "content-type": "multipart/form-data",
  };

  const params = {
    entityKey: entityKey,
  };

  return makeRequest<FileResponse[]>(
    api,
    `/file/bulk-upload`,
    "uploadFiles",
    "Error occurred while uploading files to the server",
    "POST",
    formData,
    params,
    headers
  );
};

export const deleteFile: DeleteFile = async (api, imageKey) => {
  const params = {
    imageKey,
  };
  return makeRequest<void>(
    api,
    `/file`,
    "deleteFile",
    "Error occurred while deleting file",
    "DELETE",
    null,
    params
  );
};

// Products
export const getProductList: GetProductList = async (api) => {
  return makeRequest<Product[]>(
    api,
    "/products/",
    "getProductList",
    "Error occurred while fetching product list",
    "GET"
  );
};

export const getProductById: GetProductById = async (api, id) => {
  return makeRequest<Product>(
    api,
    `/products/${id}`,
    "getProductById",
    "Error occurred while fetching product details",
    "GET"
  );
};

export const saveProduct: SaveProduct = async (api, data) => {
  return makeRequest<Product>(
    api,
    `/products/`,
    "saveProduct",
    "Error occurred while adding product details",
    "POST",
    data
  );
};

export const updateProduct: UpdateProduct = async (api, id, data) => {
  return makeRequest<Product>(
    api,
    `/products/${id}`,
    "updateProduct",
    "Error occurred while updating product details",
    "PUT",
    data
  );
};

export const deleteProduct: DeleteProduct = async (api, id) => {
  return makeRequest<void>(
    api,
    `/products/${id}`,
    "deleteProduct",
    "Error occurred while deleting product details",
    "DELETE"
  );
};

export const deleteProductImage: DeleteProductImage = async (
  api,
  productId,
  imageKey
) => {
  const params = {
    imageKey,
  };
  return makeRequest<void>(
    api,
    `/products/${productId}}/image`,
    "deleteProductImage",
    "Error occurred while deleting product image",
    "DELETE",
    null,
    params
  );
};

export const getLatestProductList: GetLatestProductList = async (
  api,
  limit = 4
) => {
  const params = {
    limit,
  };
  return makeRequest<Product[]>(
    api,
    "/products/latest-products",
    "getLatestProductList",
    "Error occurred while fetching latest product list",
    "GET",
    null,
    params
  );
};

export const getPopularProductList: GetPopularProductList = async (
  api,
  limit = 4
) => {
  const params = {
    limit,
  };
  return makeRequest<Product[]>(
    api,
    "/products/popular-products",
    "getPopularProductList",
    "Error occurred while fetching most popular product list",
    "GET",
    null,
    params
  );
};

// Dashboard
export const getDashboardEntityItemsCount: GetDashboardEntityItemsCount =
  async (api) => {
    return makeRequest<DashboardEntityItemsCount>(
      api,
      "dashboard/entityItemsCount",
      "getDashboardEntityItemsCount",
      "Error occurred while fetching entity items count",
      "GET",
      null
    );
  };
