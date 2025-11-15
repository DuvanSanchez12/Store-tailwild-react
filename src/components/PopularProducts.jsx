import "./PopularProducts.css";
import { useStars } from "../hooks/Start.jsx";
import { HeartMinusIcon, MinusIcon, PlusIcon, ShowIcon } from "./icons.jsx";
import { useCart } from "../hooks/useCart.js";
import { useProductModal } from "../context/modal.jsx";
import { useOutletContext } from "react-router-dom";

export function PopularProducts() {
  const { products } = useOutletContext()
  const { addToCart, RemoveFromCart, cart } = useCart();
  const {openModal} = useProductModal();
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };
  const topDiscountProducts = [...products]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 10);
  return (
    <section className="container mx-auto pt-7">
      <div className="flex items-center justify-between mb-3">
        <h2 className="fontMain font-bold text-2xl text-gray-800 pb-2">
          Top productos del momento
        </h2>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:gap-4 xl:grid-cols-5">
        {topDiscountProducts.map((product) => {
          const isProductInCart = checkProductInCart(product);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const stars = useStars(Number(product.rating));
          return (
            <div key={product.id} className="cursor-pointer">
              <div className="mt-1 flex-auto p-4 rounded-lg border border-gray-300 hover:-translate-y-1 transition duration-75 hover:transition hover:duration-500 ease-in-out hover:shadow-md hover:border-green-600">
                <div className="text-center relative flex justify-center group">
                  <div className="absolute top-0 left-0">
                    <span className="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-[rgb(10,173,10)] text-white">
                      {Number(product.discountPercentage).toFixed(0)}%
                    </span>
                  </div>
                  <img
                    src={product.thumbnail}
                    onClick={() => openModal(product)}
                    className="w-auto mx-auto h-60 pb-8"
                    alt={product.title}
                  />
                  <div className="absolute w-full bottom-[15%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex justify-center gap-2">
                    <button onClick={() => openModal(product)}
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
                <small className=" small text-gray-500 text-xs font-medium capitalize">
                  {product.category.name}
                </small>
                <p className=" pt-2 text-gray-800 text-base font-semibold">
                  {product.title}
                </p>
                <div className=" pb-3 flex items-center gap-1 text-yellow-500">
                  {stars}
                  <span className="text-sm font-medium text-gray-500 me-1">
                    {Number(product.rating).toFixed(1)} (
                    {product.reviews?.length})
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <div>
                    <span class="text-gray-900 font-semibold">
                      ${product.price}
                    </span>
                  </div>
                  <div>
                    <button
                    disabled={product.stock === 0}
                    className={`inline-flex cursor-pointer items-center px-2 p-1 gap-x-1 border small rounded-md font-bold fontMain focus:outline-none focus:ring-4 transition  disabled:opacity-50 disabled:pointer-events-none 
                    ${
                      product.stock === 0
                        ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                        : isProductInCart
                        ? "bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-300"
                        : "bg-[rgb(10,173,10)] text-white border-green-600 focus:ring-green-300 hover:text-white hover:bg-[rgb(0,140,0)] hover:border-[rgb(0,140,0)]"
                    }`}
                    onClick={(e) => {
                      if (product.stock === 0) return; // evita agregar agostado

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
            </div>
          );
        })}
      </div>
    </section>
  );
}
