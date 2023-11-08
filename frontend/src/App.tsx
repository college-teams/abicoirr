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
import { useAppDispatch, useAppSelector } from "./store/configureStore";
import About from "./pages/About";
import { useEffect } from "react";
import { isLoggedIn } from "./utils";
import { useAPI } from "./hooks/useApi";
import { useLoadingIndicator } from "./hooks/useLoadingIndicator";
import { getCurrentUser } from "./api";
import { isApiError } from "./types/Api";
import { setCurrentUserDetails } from "./store/slices/user";
import PrivateRoute from "./utils/PrivateRoute";
import EmailVerification from "./pages/EmailVerification";

function App() {
  const api = useAPI();
  const [, startLoading, endLoading] = useLoadingIndicator();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.appState);

  const isAdminLayout = state.layout === "ADMIN";

  const fetchLoggedInUserDetails = async () => {
    startLoading("/getCurrentUser");
    try {
      const res = await getCurrentUser(api);
      if (!isApiError(res)) {
        dispatch(setCurrentUserDetails(res));
      }
    } finally {
      endLoading("/getCurrentUser");
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchLoggedInUserDetails();
    }
  }, []);

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={isAdminLayout && <Navigate to="/admin" replace={true} />}
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="shipping-policy" element={<Shippingpolicy />} />
        </Route>

        <Route path="/admin">
          <Route
            index
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/emailVerification" element={<EmailVerification />} />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
