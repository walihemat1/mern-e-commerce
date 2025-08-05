import { useLocation, useNavigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  const navigate = useNavigate();

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return navigate("/auth/login");
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("login") ||
      location.pathname.includes("register"))
  ) {
    if (user?.role === "admin") return navigate("/admin/dashboard");
    if (user?.role === "user") return navigate("/shop/home");
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return navigate("/unauth-page");
  }

  if (isAuthenticated && user?.role === "admin") {
    return navigate("/admin/dashboard");
  }

  return <>{children}</>;
}

export default CheckAuth;
