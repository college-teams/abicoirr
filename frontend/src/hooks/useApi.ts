import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

export const useAPI = () => {
  const controller = new AbortController();

  const api = useRef(
    axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: { "Content-Type": "application/json" },
    })
  );

  useEffect(() => {
    const currentAPI = api.current;

    const requestInterceptorId = currentAPI.interceptors.request.use(
      async (config) => {
        // ADD Token assign code.
        const token = "";
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    );

    const responseInterceptorId = currentAPI.interceptors.response.use(
      (response) => response,
      (error) => {
        // if (axios.isCancel(error)) {
        //   // Request was canceled
        //   return Promise.resolve(null);
        // }
        return Promise.reject(error);
      }
    );

    return () => {
      controller.abort();
      currentAPI.interceptors.request.eject(requestInterceptorId);
      currentAPI.interceptors.response.eject(responseInterceptorId);
    };
  });

  return api.current;
};
