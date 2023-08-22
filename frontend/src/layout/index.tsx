import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { BrowserRouter } from 'react-router-dom'

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
