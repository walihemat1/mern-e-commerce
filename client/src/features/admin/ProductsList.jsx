import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import ProductListItem from "./ProductListItem";

function ProductsList() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(
    function () {
      dispatch(getProducts());
    },
    [products]
  );

  return (
    <>
      {products.map((product) => (
        <ProductListItem key={product.title} product={product} />
      ))}
    </>
  );
}

export default ProductsList;
