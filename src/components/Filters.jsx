import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useFilters } from "../hooks/useFilters";
import { useCategory } from "../context/category.jsx";
import { CATEGORY } from "../components/Consts.js";

export function Filters() {
  const { products } = useOutletContext();
  const { setFilters } = useFilters();
  const [searchParams, setSearchParams] = useSearchParams();

  const { selectedCategory, selectedSlug, setSelectedSlug, setSelectedCategory } = useCategory();
  const [slugs, setSlugs] = useState([]);
    useEffect(() => {
    const urlSlug = searchParams.get("categories");

    if (!urlSlug) return;

    for (const category in CATEGORY) {
        if (CATEGORY[category].includes(urlSlug)) {
        setSelectedCategory(category);
        setSelectedSlug(urlSlug);
        break;
        }
    }
    }, [searchParams, setSelectedCategory, setSelectedSlug]);

  useEffect(() => {
    if (!selectedCategory) {
      setSlugs([]);
      return;
    }

    const slugList = CATEGORY[selectedCategory];

    if (Array.isArray(slugList)) {
      setSlugs(slugList);
    } else {
      setSlugs([]);
    }
  }, [selectedCategory]);

  const handleSlugClick = (slug) => {
    const updated = selectedSlug === slug ? "" : slug;

    setSelectedSlug(updated);
    setFilters((prev) => ({
      ...prev,
      categories: updated ? [updated] : [],
    }));

    if (updated) searchParams.set("", updated);
    else searchParams.delete("");

    setSearchParams(searchParams);
  };

  return (
    <section className="container mx-auto mt-8 mb-4 px-4">
      <h2 className="fontMain font-bold text-center text-2xl text-gray-800 pb-2">
        {selectedCategory
          ? selectedCategory.replace(/_/g, " ")
          : "Selecciona una categoría arriba"}
      </h2>
      <div className="flex justify-center mt-6">
        <div
          className="grid justify-center gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
            maxWidth: "1000px",
          }}
        >
          {slugs.map((slug) => {
            const productImage = products.find((c) => c.category === slug);
            const isSelected = selectedSlug === slug;

            return (
              <button
                key={slug}
                onClick={() => handleSlugClick(slug)}
                className="flex flex-col cursor-pointer items-center"
              >
                <div
                  className={`w-20 h-20 rounded-full border-2 overflow-hidden shadow transition
                  ${
                    isSelected
                      ? "border-[rgb(10,173,10)] scale-105"
                      : "border-gray-300"
                  }
                `}
                >
                  <img
                    src={
                      productImage
                        ? productImage.thumbnail
                        : "https://via.placeholder.com/150"
                    }
                    className="w-full h-full bg-gray-200 object-cover"
                    alt={slug}
                  />
                </div>

                <span className="mt-2 capitalize text-sm font-medium text-gray-700">
                  {slug.replace("-", " ")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
