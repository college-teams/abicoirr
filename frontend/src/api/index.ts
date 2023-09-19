/* eslint-disable @typescript-eslint/no-explicit-any */
import useToast from "../hooks/useToast";
import axios, { AxiosResponse } from "axios";
import {
  AbstractResponse,
  ApiError,
  DeleteCategory,
  GetAdminOrders,
  GetCategoryById,
  GetCategoryList,
  GetContactDetailList,
  GetContactDetailsById,
  GetUnReadMessageCount,
  HttpMethod,
  SaveCategory,
  UpdateCategory,
  UploadFile,
} from "../types/Api";
import {
  AdminOrderResponseData,
  Category,
  ContactDetails,
  FileResponse,
  GetCategory,
  MessageCount,
} from "../types/Admin";

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

// CONTACT DETAILS
export const getContactDetailList: GetContactDetailList = async (api) => {
  return makeRequest<ContactDetails[]>(
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
  return makeRequest<GetCategory[]>(
    api,
    "/category/",
    "getCategoryList",
    "Error occurred while fetching category list",
    "GET"
  );
};

// Category
export const getCategoryById: GetCategoryById = async (api, id) => {
  return makeRequest<GetCategory>(
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
    "DELETE",
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
