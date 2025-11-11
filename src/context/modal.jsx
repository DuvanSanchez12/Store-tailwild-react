import { createContext, useContext, useState } from "react";

const ProductModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useProductModal() {
  return useContext(ProductModalContext);
}

export function ProductModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const openModal = (productData) => {
    setProduct(productData);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);


  return (
    <ProductModalContext.Provider
      value={{
        isOpen,
        product,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}
