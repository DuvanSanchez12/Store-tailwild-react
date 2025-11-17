import "./Home.css";
import { useEffect } from "react";
import { initializeSwiperCarousels } from "../hooks/sliders.js";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PopularProducts } from "../components/PopularProducts.jsx";
import { ArrowIcon } from "../components/icons.jsx";
import { Categories } from "../components/Categories.jsx";
import { useOutletContext } from "react-router-dom";
import { useCategoryClick } from "../hooks/FindCategory.jsx";


export default function Home() {
  const { products, categories } = useOutletContext()
  const { handleCategoryClick } = useCategoryClick();

  useEffect(() => {
    initializeSwiperCarousels();
  }, []);

  
  return (
    <>
      <section className="mt-8">
        <div className="container mx-auto">
          <div
            className="swiper-container swiper swiper-fade"
            id="swiper-1"
            data-speed="400"
            data-space-between="100"
            data-pagination="true"
            data-pagination-type="bullets"
            data-navigation="false"
            data-autoplay="true"
            data-autoplay-delay="3000"
            data-effect="fade"
            data-breakpoints='{"480":{"slidesPerView":1},"768":{"slidesPerView":1},"1024":{"slidesPerView":1}}'
          >
            <div className="swiper-wrapper">
              <div className="swiper-slide slide1">
                <div className="lg:py-32 p-12 lg:pl-12 xl:w-2/5 md:w-3/5">
                  <span className="inline-block p-2 text-sm rounded-lg bg-yellow-500 text-gray-900 font-semibold">
                    ¡Gran Descuento de Apertura: 50%!
                  </span>

                  <div className="my-7 flex flex-col gap-2">
                    <h1 className="text-gray-900 text-xl lg:text-5xl font-bold leading-tight">
                      Supermercado de Productos Frescos
                    </h1>
                    <p className="text-md font-light">
                      Productos frescos seleccionados.
                    </p>
                  </div>
                  <a
                    href="#!"
                    className="hidden lg:flex w-42 items-center px-4 gap-2 py-2  font-medium border rounded-lg bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 active:bg-gray-900 active:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                  >
                    Comprar ahora
                    <ArrowIcon />
                  </a>
                </div>
              </div>
              <div className="swiper-slide slide2">
                <div className="lg:py-32 lg:pl-12 lg:pr-6 px-12 py-12 xl:w-2/5 md:w-3/5">
                  <span className="inline-block p-2 text-sm rounded-lg bg-yellow-500 text-gray-900 font-semibold">
                    Envío Gratis desde $100
                  </span>
                  <div className="my-7 flex flex-col gap-2">
                    <h2 className="text-gray-900 text-xl lg:text-5xl font-bold leading-tight">
                      Obtén Envío Gratis <br />
                      desde <span className="text-green-600">$100</span>
                    </h2>
                    <p className="text-md font-light">
                      Envío gratis solo para nuevos clientes.
                    </p>
                  </div>
                  <a
                    href="#!"
                    className="hidden lg:flex w-42 items-center px-4 gap-2 py-2  font-medium border rounded-lg bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 active:bg-gray-900 active:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                  >
                    Comprar ahora
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="swiper-pagination bottom-14!"></div>
            <div className="swiper-navigation swiper-navigation-hidden">
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </section>
      <Categories categories={categories} products={products} />
      <section className="pt-10">
        <div className="container mx-auto">
          <div className="flex md:space-x-2 lg:space-x-6 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2 mb-3">
              <div className="py-10 px-8 rounded-lg baner">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h2 className="fontMain text-xl">Frutas y Vegetales</h2>
                    <p>
                      Obtén hasta
                      <span className="fontMain font-medium text-red-600 px-1">
                        30%
                      </span>
                      de descuento
                    </p>
                  </div>
                  <div className="flex flex-wrap cursor-pointer">
                    <a
                      onClick={() => handleCategoryClick("groceries")}
                      className="hidden lg:flex w-42 items-center px-4 gap-2 py-2  font-medium border rounded-lg bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 active:bg-gray-900 active:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    >
                      Comprar ahora
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="py-10 px-8 rounded-lg baner2">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl fontMain">Freshly Baked Buns</h2>
                    <p>
                      Obtén hasta
                      <span className="fontMain font-medium text-red-600 px-1">
                        25%
                      </span>
                      de descuento
                    </p>
                  </div>
                  <div className="flex flex-wrap">
                    <a
                      href="#!"
                      className="hidden lg:flex w-42 items-center px-4 gap-2 py-2  font-medium border rounded-lg bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 active:bg-gray-900 active:border-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                    >
                      Comprar ahora
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PopularProducts products={products} />
    </>
  );
}
