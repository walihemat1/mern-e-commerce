import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [currUpdatedProdId, setCurrUpdatedProdId] = useState(null);
  const [openUpdateProductDialog, setOpenUpdateProductDialog] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        currUpdatedProdId,
        setCurrUpdatedProdId,
        openUpdateProductDialog,
        setOpenUpdateProductDialog,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error(
      "ProductContext was called outside the ProductContext Provider"
    );

  return context;
}
