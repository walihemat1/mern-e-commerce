import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, allowedRoles, children }) {
  const location = useLocation();

  // Wait until auth is checked
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // could be spinner
  }

  // If NOT authenticated, allow access to auth routes
  if (!isAuthenticated) {
    if (
      location.pathname.startsWith("/auth/login") ||
      location.pathname.startsWith("/auth/register")
    ) {
      return <>{children}</>;
    }
    return <Navigate to="/auth/login" replace />;
  }
  // Role-based check
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Already logged in but trying to access login/register
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" replace />
    ) : (
      <Navigate to="/shop/listing" replace />
    );
  }

  return <>{children}</>;
}

export default CheckAuth;
