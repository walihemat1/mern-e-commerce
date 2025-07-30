import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/auth/Layout";
import AdminLayout from "./components/admin/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";

function App() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/products" element={<AdminProducts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
