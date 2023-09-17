/* eslint-disable @typescript-eslint/no-explicit-any */
import useToast from "../hooks/useToast";
import axios from "axios";
import { AbstractResponse, ApiError, GetAdminOrders } from "../types/Api";
import { AdminOrderResponseData } from "../types/Admin";

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

    showToast(errorMessage, "error");
  }

  return {
    status: false,
    statusCode: statusCode,
    message: errorMessage || "Unknown error",
  };
};

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
    console.log(error);
    
    return handleError(
      error,
      "getAdminOrders",
      "Error occurred while fetching admin orders",
      500
    );
  }
};
