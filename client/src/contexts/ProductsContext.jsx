const { createContext, useContext, useState } = require("react");

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [currUpdatedProdId, setCurrUpdatedProdId] = useState(null);
  return (
    <ProductContext.Provider
      value={{ currUpdatedProdId, setCurrUpdatedProdId }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error(
      "ProductContext was called outside the ProductContext Provider"
    );

  return context;
}
