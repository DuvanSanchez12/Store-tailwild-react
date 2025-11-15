import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "./categories.css";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../context/category.jsx";

export function Categories({ categories, products }) {
  const { setSelectedCategory, setAllCategories } = useCategory();
  const navigate = useNavigate();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (categories?.length > 0) {
      setAllCategories(categories.map((cat) => cat.slug));
    }
  }, [categories, setAllCategories]);

  const handleCategoryClick = (slug) => {
    setSelectedCategory(slug);
    navigate("/products");
  };
  return (
    <section className="categories-section container mx-auto pt-7">
      <div className="flex items-center justify-between mb-3">
        <h2 className="categories-title font-bold text-2xl text-gray-800">
          Explora nuestras categorías
        </h2>
        <div className="flex items-center gap-3">
          <button
            className={`custom-prev p-2 rounded-full border transition ${
              isBeginning
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-green-600 hover:bg-green-600 hover:text-white"
            }`}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={`custom-next p-2 rounded-full border transition ${
              isEnd
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-green-600 hover:bg-green-600 hover:text-white"
            }`}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={6}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="categories-slider overflow-visible"
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onAfterInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {categories.map((category) => {
          const productInCategory = products.find(
            (p) => p.category === category.slug
          );
          return (
            <SwiperSlide key={category.slug}>
              <div
                onClick={() => handleCategoryClick(category.slug)}
                className="cursor-pointer w-full"
              >
                <div className="wrap-break-word cursor-pointer mt-1 rounded-lg border border-gray-300 transition duration-75 hover:transition hover:duration-500 ease-in-out hover:shadow-md hover:border-green-600">
                  <img
                    src={
                      productInCategory
                        ? productInCategory.thumbnail
                        : "https://via.placeholder.com/150"
                    }
                    className="mx-auto w-28 py-3"
                    alt={category.name}
                  />
                  <p className="text-center pb-4 text-gray-600 font-medium">
                    {category.name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
