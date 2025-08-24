import ProductFilter from "./ProductFilter";

function ShopListing() {
  return (
    <div className="grid grid-cols-1 md:grid-colms-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
    </div>
  );
}

export default ShopListing;
