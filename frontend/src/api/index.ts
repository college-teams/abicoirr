/* eslint-disable @typescript-eslint/no-explicit-any */
import useToast from "../hooks/useToast";
import axios from "axios";
import {
  AbstractResponse,
  ApiError,
  GetAdminOrders,
  GetContactDetailList,
  GetContactDetailsById,
} from "../types/Api";
import { AdminOrderResponseData, ContactDetails } from "../types/Admin";

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

// ADMIN ORDERS
export const getAdminOrders: GetAdminOrders = async (api) => {
  try {
    const res = await api.get<AbstractResponse<AdminOrderResponseData[]>>(
      "/admin-orders/"
    );
    const response = res.data;

    if (response.statusType === "FAILURE") {
      return handleError(
        null,
        "getAdminOrders",
        response.statusMessage,
        response.statusCode
      );
    }

    return response.data;
  } catch (error) {
    let errorMessage;
    let statusCode;
    if (axios.isAxiosError(error)) {
      const responseStatusMessage = error.response?.data?.statusMessage;
      const responseStatusCode = error.response?.data?.statusCode;
      errorMessage = responseStatusMessage;
      statusCode = responseStatusCode;
    } else {
      errorMessage = "Error occurred while fetching admin orders";
      statusCode = 500;
    }

    return handleError(error, "getAdminOrders", errorMessage, statusCode);
  }
};

// CONTACT DETAILS
export const getContactDetailList: GetContactDetailList = async (api) => {
  try {
    const res = await api.get<AbstractResponse<ContactDetails[]>>(
      "/contact-details/"
    );
    const response = res.data;

    if (response.statusType === "FAILURE") {
      return handleError(
        null,
        "getContactDetailList",
        response.statusMessage,
        response.statusCode
      );
    }

    return response.data;
  } catch (error) {
    let errorMessage;
    let statusCode;
    if (axios.isAxiosError(error)) {
      const responseStatusMessage = error.response?.data?.statusMessage;
      const responseStatusCode = error.response?.data?.statusCode;
      errorMessage = responseStatusMessage;
      statusCode = responseStatusCode;
    } else {
      errorMessage = "Error occurred while fetching contact details";
      statusCode = 500;
    }

    return handleError(error, "getContactDetailList", errorMessage, statusCode);
  }
};

// CONTACT DETAILS
export const getContactDetailsById: GetContactDetailsById = async (api, id) => {
  try {
    const res = await api.get<AbstractResponse<ContactDetails>>(
      `/contact-details/${id}`
    );
    const response = res.data;

    if (response.statusType === "FAILURE") {
      return handleError(
        null,
        "getContactDetailsById",
        response.statusMessage,
        response.statusCode
      );
    }

    return response.data;
  } catch (error) {
    let errorMessage;
    let statusCode;
    if (axios.isAxiosError(error)) {
      const responseStatusMessage = error.response?.data?.statusMessage;
      const responseStatusCode = error.response?.data?.statusCode;
      errorMessage = responseStatusMessage;
      statusCode = responseStatusCode;
    } else {
      errorMessage = "Error occurred while fetching contact details by id";
      statusCode = 500;
    }

    return handleError(error, "getContactDetailsById", errorMessage, statusCode);
  }
};
