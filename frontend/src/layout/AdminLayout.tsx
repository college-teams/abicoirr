import React from "react";
import Navbar from "../components/Admin/Navbar";

type AdminLayoutProps = {
  children: React.ReactNode;
};
const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

export default AdminLayout;
