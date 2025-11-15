import { ArrowIcon, CartIcon, TrashIcon, XIcon } from "./icons.jsx";
import "./Cart.css";
import { useCart } from "../hooks/useCart.js";
import { QuantitySelector } from "./Quantity.jsx";
import { useCartContext } from "../context/cartModal.jsx";
import { useEffect } from "react";

function CartItem({
  thumbnail,
  price,
  discountPercentage,
  title,
  tags,
  product,
  RemoveFromCart,
}) {
  const quantity = product.quantity || 1;
  const totalProduct = (price - price * (discountPercentage / 100)) * quantity;

  return (
    <li className="py-3 border-t">
      <div className="flex items-center">
        <div className="w-1/2 md:w-1/2 lg:w-3/5">
          <div className="flex">
            <img
              src={thumbnail}
              alt={title}
              className="bg-gray-200 w-16 h-16 border rounded-md"
            />
            <div className="ml-3">
              <h6 className="text-gray-900 font-medium">{title}</h6>

              <small className="text-gray-500 block">
                {Array.isArray(tags)
                  ? tags.map((tag, index) => (
                      <span key={index} className="mr-1 capitalize">
                        {tag}
                        {index < tags.length - 1 && ","}
                      </span>
                    ))
                  : tags}
              </small>
              <div className="mt-2 small rounded-lg border-gray-300 border-2 leading-none inline-flex hover:bg-gray-200">
                <a
                  onClick={() => RemoveFromCart(product)}
                  className="text-green-600 cursor-pointer flex items-center"
                >
                  <span className="mr-1 ms-2 align-text-bottom">
                    <TrashIcon className="mr-1" />
                  </span>
                  <span className="text-gray-500 mr-2 text-sm">Remove</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-1/2 lg:w-1/3">
          <QuantitySelector product={product} className="text-gray-600" />
        </div>
        <div className="w-1/2 text-start md:w-1/2">
          <span className="fontMain text-base text-gray-900 px-1">
            ${totalProduct.toFixed(2)}
          </span>
          <span className="fontMain line-through text-base text-gray-500">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
}
export function Cart() {
  const { cart, clearCart, addToCart, RemoveFromCart } = useCart();
  const { isOpen, openCart, closeCart } = useCartContext();
  const subtotal = cart.reduce(
    (acc, product) => acc + product.price * (product.quantity || 1),
    0
  );
  const taxRate = 0.19;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div>
      <button
        onClick={openCart}
        className="relative cursor-pointer text-gray-500 hover:text-green-600"
      >
        <CartIcon />
        <span className="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-2 bg-[rgb(10,173,10)] text-white text-center font-semibold text-sm">
          {cart?.length || 0}
        </span>
      </button>
      {isOpen && (
        <div
          className={`cart-backdrop ${isOpen ? "show" : ""}`}
          onClick={closeCart}
        ></div>
      )}

      <div className={`cart offcanvas ${isOpen ? "open" : ""}`}>
        <div className="offcanvas-header border-b">
          <div>
            <h5 className="text-gray-900 text-xl fontMain">
              Carrito de compras
            </h5>
            <span className="text-gray-600 font-normal">
              Localizado en Colombia
            </span>
          </div>
          <button onClick={closeCart} className="cursor-pointer">
            <XIcon />
          </button>
        </div>
        <div className="offcanvas-body p-4">
          <ul className="border-b">
            {cart.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                RemoveFromCart={() => RemoveFromCart(product)}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))}
          </ul>
          <div className="mt-6 space-y-2 pt-3 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Impuestos (19%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-gray-300 border-t pt-2 mt-2">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-green-700 font-medium text-xl">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={clearCart}
              className="inline-flex cursor-pointer items-center px-4 gap-x-2 py-1.5 border-gray-300 text-gray-600 
               font-medium border-2 rounded-lg hover:text-white hover:bg-gray-600 
               hover:border-gray-600 active:bg-gray-600 active:border-gray-600 
               focus:outline-none focus:ring-4 focus:ring-gray-300 
               disabled:opacity-50 disabled:pointer-events-none transition"
            >
              <TrashIcon width={18} height={18} /> Vaciar carrito
            </button>
            <button className="inline-flex cursor-pointer items-center px-4 gap-x-2 py-1.5 btn-color text-white font-medium border rounded-lg border-green-600 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition">
              Ir a pagar <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
