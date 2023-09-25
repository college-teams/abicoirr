import Home from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Contacts from "./pages/Contacts";
import Layout from "./layout";
import NotFound from "./pages/NotFound";
import Shippingpolicy from "./pages/Shippingpolicy";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./hooks/ScrollToTop";
import { Toaster } from "react-hot-toast";
import AdminHome from "./pages/AdminHome";
import { useAppSelector } from "./store/configureStore";

function App() {
  const { isAdmin } = useAppSelector((state) => state.user);

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={isAdmin && <Navigate to="/admin" replace={true} />}
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="shipping-policy" element={<Shippingpolicy />} />
        </Route>

        <Route
          path="/admin"
          element={!isAdmin && <Navigate to="/" replace={true} />}
        >
          <Route index element={<AdminHome />} />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
