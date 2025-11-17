import { useState } from "react";
import { useCart } from "../hooks/useCart";

export function ResumenPage() {
      const { cart } = useCart();
    
      const [showAll, setShowAll] = useState(false);
    
      // Cantidad visible por defecto
      const VISIBLE_COUNT = 9;
    
      const productsToShow = showAll ? cart : cart.slice(0, VISIBLE_COUNT);
    
      const subtotal = cart.reduce(
        (acc, product) => acc + product.price * (product.quantity || 1),
        0
      );
      const taxRate = 0.19;
      const taxes = subtotal * taxRate;
      const total = subtotal + taxes;
    return(
        <div className="w-full lg:w-1/2 border-l-2 border-b-2 p-6  border-gray-600">
          <h2 className="text-2xl font-semibold pb-5 pt-2 border-b-2 w-full border-gray-300 mb-4">
            Resumen de la compra
          </h2>
          <ul className="space-y-4 border-b-2 border-gray-300 pb-4">
            {productsToShow.map((product) => {
              const quantity = product.quantity || 1;
              const totalProduct =
                (product.price -
                  product.price * (product.discountPercentage / 100)) *
                quantity;

              return (
                <li
                  key={product.id}
                  className="flex items-center border-b border-gray-200 pb-3 justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-16 h-16 rounded-md border-0 bg-gray-200"
                    />

                    <div>
                      <h4 className=" text-gray-900 font-medium">
                        {product.title}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        Cantidad: {quantity}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/2 text-end md:w-1/2">
                    <span className="fontMain text-medium text-gray-900 px-1">
                      ${totalProduct.toFixed(2)}
                    </span>
                    <span className="fontMain line-through text-medium text-gray-500">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {cart.length > VISIBLE_COUNT && (
            <div className="mt-3 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[rgb(10,173,10)] cursor-pointer font-medium  hover:underline"
              >
                {showAll ? "Mostrar menos" : `Mostrar ${cart.length - 9} más`}
              </button>
            </div>
          )}

          <div className="pt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Impuestos (19%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t-2 border-gray-300 pt-3 mt-2 items-center">
              <span className="text-lg font-semibold">Total a pagar</span>
              <span className="text-[rgb(10,173,10)] font-semibold text-xl">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
    )
}