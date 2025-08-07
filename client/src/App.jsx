import { Route, Routes } from "react-router-dom";

import AuthLayout from "./features/auth/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./features/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import ShoppingLayout from "./pages/shop/Layout";
import PageNotFound from "./pages/PageNotFound";
import ShoppingHome from "./pages/shop/ShoppingHome";
import ShoppingListing from "./pages/shop/ShoppingListing";
import ShoppingCheckout from "./pages/shop/ShoppingCheckout";
import ShoppingAccount from "./pages/shop/ShoppingAccount";
import CheckAuth from "./features/auth/CheckAuth";
import UnAuthPage from "./pages/UnAuthPage";

function App() {
  const isAuthenticated = false;
  const user = { role: "admin", name: "Hemat" };

  return (
    <div className="flex flex-col overflow-hidden">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
