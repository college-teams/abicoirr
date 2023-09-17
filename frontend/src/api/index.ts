/* eslint-disable @typescript-eslint/no-explicit-any */
import useToast from "../hooks/useToast";
import axios, { AxiosResponse } from "axios";
import {
  AbstractResponse,
  ApiError,
  GetAdminOrders,
  GetContactDetailList,
  GetContactDetailsById,
  GetUnReadMessageCount,
  HttpMethod,
} from "../types/Api";
import {
  AdminOrderResponseData,
  ContactDetails,
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
  data?: any
): Promise<T> => {
  try {
    const options = {
      method,
      data,
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
      const responseStatusMessage = error.response?.data?.statusMessage;
      const responseStatusCode = error.response?.data?.statusCode;
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
