import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import React from "react";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const state = useAppSelector((state) => state.appState);

  const isAdminLayout = state.layout === "ADMIN";

  return (
    <BrowserRouter>
      {isAdminLayout ? (
        <AdminLayout children={children} />
      ) : (
        <UserLayout children={children} />
      )}
    </BrowserRouter>
  );
};

export default Layout;
