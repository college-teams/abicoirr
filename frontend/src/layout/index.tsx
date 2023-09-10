import { Provider } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/configureStore";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        {children}
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default Layout;
