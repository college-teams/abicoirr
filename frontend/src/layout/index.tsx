import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
      <BrowserRouter>
        <Navbar />
        {children}
        <Footer />
      </BrowserRouter>
  );
};

export default Layout;
