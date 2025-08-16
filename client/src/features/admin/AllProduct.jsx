import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";
import { Button } from "@/components/ui/button";

function AllProduct() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  const getProductsHandler = () => {
    dispatch(getProducts());
  };

  return (
    <div>
      <Button onClick={getProductsHandler}>Get Products</Button>
    </div>
  );
}

export default AllProduct;
