import { createContext, useContext, useState } from "react";

const CartModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  return useContext(CartModalContext);
}

export function CartModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartModalContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartModalContext.Provider>
  );
}
