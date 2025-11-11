import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };
  const RemoveFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };
  const DecreaseQuantity = (product) => {
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[productIndex].quantity === 1) {
        newCart.splice(productIndex, 1);
      } else {
        newCart[productIndex].quantity -= 1;
      }
      setCart(newCart);
    }
  };
  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        RemoveFromCart,
        addToCart,
        DecreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
