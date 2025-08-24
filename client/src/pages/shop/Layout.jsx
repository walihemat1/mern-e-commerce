import ShopHeader from "@/features/shop/ShopHeader";
import { Outlet } from "react-router-dom";

function ShoppingLayout({ children }) {
  return (
    <>
      <ShopHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default ShoppingLayout;
