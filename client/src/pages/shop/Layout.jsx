import { Outlet } from "react-router-dom";

function ShoppingLayout({ children }) {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ShoppingLayout;
