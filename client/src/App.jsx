import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { checkAuth } from "./features/auth/authSlice";
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
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="h-[600px] w-[600px] rounded-full" />; // block routes until auth check finishes
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Routes>
        {/* Public auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["admin"]}
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        {/* User protected routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRoles={["user"]}
            >
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
