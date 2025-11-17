import { useNavigate } from "react-router-dom";
import { CATEGORY } from "../components/Consts";
import { useFilters } from "./useFilters";
import { useCategory } from "../context/category";

export function useCategoryClick() {
  const { setSelectedCategory, setSelectedSlug } = useCategory();
  const { setFilters } = useFilters();
  const navigate = useNavigate();

  function findCategoryBySlug(slug) {
    for (const categoryName in CATEGORY) {
      if (CATEGORY[categoryName].includes(slug)) {
        return categoryName;
      }
    }
    return null;
  }
    function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 0);
  }

  function handleCategoryClick(slug) {
    const parentCategory = findCategoryBySlug(slug);

    setSelectedCategory(parentCategory);
    setSelectedSlug(slug);
    localStorage.removeItem("selectedSlug");
    setFilters((prev) => ({
      ...prev,
      categories: slug,
    }));

    navigate(`/products?category=${parentCategory}&=${slug}`);
    scrollToTop();
  };

  function handleCategoryClickCategory(slugArray, name) {
    setSelectedCategory(name);
    setSelectedSlug("");
    localStorage.removeItem("selectedSlug");
    setFilters((prev) => ({
      ...prev,
      categories: slugArray,
    }));

    navigate(`/products?category=${name}`);
    scrollToTop();
  };

  return { handleCategoryClick, handleCategoryClickCategory };
}
