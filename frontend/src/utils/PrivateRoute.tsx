import React from "react";
import { useAppSelector } from "../store/configureStore";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

 const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const state = useAppSelector((state) => state.appState);
  const isAdmin = state.user?.role === "ADMIN";
  const isAdminLayout = state.layout === "ADMIN";

  return isAdmin && isAdminLayout ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;