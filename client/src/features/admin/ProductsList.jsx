import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";
import { useEffect } from "react";
import ProductListItem from "./ProductListItem";

function ProductsList({ setCurrUpdatedProdId }) {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(function () {
    dispatch(getProducts());
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      {products.map((product) => (
        <ProductListItem
          key={product.title}
          product={product}
          setCurrUpdatedProdId={setCurrUpdatedProdId}
        />
      ))}
    </>
  );
}

export default ProductsList;
