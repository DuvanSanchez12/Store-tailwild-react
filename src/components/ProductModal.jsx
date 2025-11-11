import { useProductModal } from "../context/modal.jsx";
import { useState } from "react";
import {
  XIcon,
  CartIcon,
  SearchIcon,
  LocateIcon,
  AllIcons,
  HeartIcon,
} from "./icons.jsx";
import { useStars } from "../hooks/Start.jsx";
import { QuantitySelector } from "./Quantity.jsx";
import { useCart } from "../hooks/useCart.js";
import ProductImageZoom from "../hooks/zoom.jsx";

export default function ProductModal() {
  const { isOpen, product, closeModal } = useProductModal();
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, RemoveFromCart, cart } = useCart();
  if (!isOpen || !product) return null;
  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };
  const isProductInCart = checkProductInCart(product);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const stars = useStars(Number(product.rating));
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl relative w-full max-w-6xl p-8 animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <XIcon />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <ProductImageZoom
              src={product.images[activeImage] || product.images[0]}
              className="w-full h-[380px] rounded-2xl"
            />
            <div className="flex gap-3  mx-auto justify-center mt-4">
              {(product.images.length > 0
                ? product.images
                : [product.thumbnail]
              ).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`border-2 rounded-xl overflow-hidden w-20 h-20 flex items-center justify-center
                    ${
                      activeImage === i
                        ? "border-green-600"
                        : "border-gray-200"
                    }`}
                >
                  <img src={img} className="object-cover  w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-green-600 pb-5 text-sm font-semibold uppercase tracking-wide">
              {product.category}
            </span>
            <h2 className="text-4xl fontMain text-gray-900 leading-tight">
              {product.title}
            </h2>
            <div className=" flex items-center pt-5 gap-1 text-yellow-500">
              {stars}
              <span className="text-sm font-medium text-green-600 me-1">
                {Number(product.rating).toFixed(1)} ({product.reviews?.length}{" "}
                reviews)
              </span>
            </div>
            <div className="flex items-center pt-2 pb-3 border-b border-gray-300 gap-2 text-xl">
              <span className="fontMain text-lg text-gray-900">
                $
                {(
                  product.price -
                  product.price * (product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span className="fontMain line-through text-lg text-gray-500">
                ${product.price}
              </span>
              <span className="text-xs items-center text-red-500 font-semibold">
                {Number(product.discountPercentage).toFixed(0)}% Off
              </span>
            </div>
            <div className="pt-10">
              <QuantitySelector product={product} />
            </div>
            <div className="flex hover:text-black gap-3 mt-6">
              <button
                disabled={product.stock === 0}
                className={`inline-flex items-center px-4 gap-2 py-2 border-2 rounded-lg font-medium fontMain transition
                ${
                  product.stock === 0
                    ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                    : isProductInCart
                    ? "bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-300"
                    : "border-gray-300 text-gray-500 hover:border-green-600 hover:text-white hover:bg-green-600 focus:ring-green-300"
                }`}
                onClick={() => {
                  if (product.stock === 0) return;
                  isProductInCart
                    ? RemoveFromCart(product)
                    : addToCart(product);
                }}
              >
                <CartIcon />
                {product.stock === 0
                  ? "Agotado"
                  : isProductInCart
                  ? "Eliminar del carrito"
                  : "Agregar al carrito"}
              </button>
              <button className="bg-gray-100 text-gray-500 p-3 rounded-xl cursor-pointer hover:text-gray-900 hover:bg-gray-300 transition">
                <HeartIcon />
              </button>
            </div>
            <div className="mt-6 border-t border-gray-300 pt-4 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Código:</span>
                <span className="font-medium">{product.id || "N/A"}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-gray-500">Disponibilidad:</span>
                <span className="font-medium capi">
                  {product.availabilityStatus || "Agotado"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Stock:</span>
                <span className="font-medium capi">
                  {product.stock || "Agotado"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Categoría:</span>
                <span className="font-medium capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Marca:</span>
                <span className="font-medium capitalize">{product.brand}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
