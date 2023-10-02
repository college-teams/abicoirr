import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chat from "../components/chat";

type UserLayoutProps = {
  children: React.ReactNode;
};
const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
      <Chat />
    </React.Fragment>
  );
};

export default UserLayout;
