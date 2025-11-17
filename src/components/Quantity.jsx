import { useCart } from "../hooks/useCart.js";

export function QuantitySelector({ product }) {
  const { cart, addToCart, DecreaseQuantity } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden h-9 w-[110px]">
      <button
        onClick={() => DecreaseQuantity(product)}
        className="w-40 py-1 font-bold text-black border-r cursor-pointer border-gray-300"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="
          text-center text-black bg-white outline-none font-semibold text-lg
          w-auto min-w-9 max-w-[70px]
          overflow-hidden text-ellipsis select-none
        "
      />

      <button
        disabled={product.stock === 0 || quantity >= product.stock}
        onClick={() => addToCart(product)}
        className="w-40 flex items-center justify-center py-1 
                   text-black border-l border-gray-300 cursor-pointer
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}
