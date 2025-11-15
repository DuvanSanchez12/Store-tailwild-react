/* eslint-disable react-hooks/rules-of-hooks */
import "./Products.css";
import {
  HeartMinusIcon,
  MinusIcon,
  PlusIcon,
  ShowIcon,
} from "../components/icons.jsx";
import { useCart } from "../hooks/useCart.js";
import { useOutletContext } from "react-router-dom";
import { useFilters } from "../hooks/useFilters.js";
import { useStars } from "../hooks/Start.jsx";
import { useProductModal } from "../context/modal.jsx";

export default function Products() {
  const { products } = useOutletContext();
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);
  const { addToCart, RemoveFromCart, cart } = useCart();
  const { openModal } = useProductModal();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <section className="container mx-auto pt-7 pb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="products-title font-bold text-2xl text-gray-800">
          Productos disponibles
        </h2>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:gap-4 xl:grid-cols-5">
        {filteredProducts.map((product) => {
          const isProductInCart = checkProductInCart(product);
          const stars = useStars(Number(product.rating));

          return (
            <div key={product.id} className="cursor-pointer">
              <div className="mt-1 flex-auto p-4 rounded-lg border border-gray-300 hover:-translate-y-1 transition duration-75 hover:transition hover:duration-500 ease-in-out hover:shadow-md hover:border-green-600">
                <div className="text-center relative flex justify-center group">
                  {/* 🔹 Etiqueta de descuento */}
                  <div className="absolute top-0 left-0">
                    <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-600 text-white">
                      {Number(product.discountPercentage || 0).toFixed(0)}%
                    </span>
                  </div>
                  <img
                    src={product.thumbnail}
                    onClick={() => openModal(product)}
                    className="w-auto mx-auto h-60 pb-8"
                    alt={product.title}
                  />
                  <div className="absolute w-full bottom-[15%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex justify-center gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="h-[34px] w-[34px] cursor-pointer bg-white shadow inline-flex items-center justify-center rounded-lg hover:bg-green-600 hover:text-white transition"
                      title="Vista rápida"
                    >
                      <ShowIcon />
                    </button>

                    <button
                      className="h-[34px] w-[34px] cursor-pointer bg-white shadow inline-flex items-center justify-center rounded-lg hover:bg-green-600 hover:text-white transition"
                      title="Agregar a favoritos"
                    >
                      <HeartMinusIcon />
                    </button>
                  </div>
                </div>
                <small className="text-gray-500 text-xs font-medium capitalize">
                  {product.category}
                </small>
                <p className="pt-2 text-gray-800 text-base font-semibold truncate">
                  {product.title}
                </p>
                <div className="pb-3 flex items-center gap-1 text-yellow-500">
                  {stars}
                  <span className="text-sm font-medium text-gray-500 me-1">
                    {Number(product.rating).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">
                    ${product.price}
                  </span>

                  <button
                    disabled={product.stock === 0}
                    className={`inline-flex cursor-pointer items-center px-2 p-1 gap-x-1 border small rounded-md font-bold fontMain focus:outline-none focus:ring-4 transition 
                    ${
                      product.stock === 0
                        ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                        : isProductInCart
                        ? "bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-300"
                        : "btn-color text-white border-green-600 focus:ring-green-300"
                    }`}
                    onClick={(e) => {
                      if (product.stock === 0) return;

                      e.stopPropagation();
                      e.preventDefault();

                      isProductInCart
                        ? RemoveFromCart(product)
                        : addToCart(product);
                    }}
                  >
                    {product.stock === 0 ? (
                      <span>Agotado</span>
                    ) : isProductInCart ? (
                      <>
                        <MinusIcon />
                        <span>Quitar</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon />
                        <span>Agregar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
