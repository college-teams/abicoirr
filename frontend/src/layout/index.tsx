import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import React from "react";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAdmin } = useAppSelector((state) => state.user);

  return (
    <BrowserRouter>
      {isAdmin ? (
        <AdminLayout children={children} />
      ) : (
        <UserLayout children={children} />
      )}
    </BrowserRouter>
  );
};

export default Layout;
