import { useCart } from "../hooks/useCart.js";
import './Quantity.css'

export function QuantitySelector({ product }) {
  const { cart, addToCart, DecreaseQuantity } = useCart();

  // Buscar si el producto ya está en el carrito
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden h-9 w-[110px]">
      <button
        onClick={() => DecreaseQuantity(product)}
        className="w-10 py-1 font-bold text-black border-r cursor-pointer border-gray-300"
      >
        -
      </button>
      <input
      type="number"
      value={quantity}
      readOnly
      className="w-9 text-center text-black outline-none bg-white select-none font-semibold text-lg"
      />
      <button
        disabled={ product.stock === 0 || quantity >= product.stock }
        onClick={() => addToCart(product)}
        className="w-10 py-1 text-black border-l cursor-pointer border-gray-300"
      >
        +
      </button>
    </div>
  );
}
