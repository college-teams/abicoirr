import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type UserLayoutProps = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default UserLayout;
