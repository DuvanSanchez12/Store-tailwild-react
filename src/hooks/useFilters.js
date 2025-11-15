import { useContext } from "react";
import { FiltersContext } from "../context/filters.jsx";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) => {
    const { minPrice, categories = [] } = filters;

    return products.filter((product) => {
      const matchPrice = product.price >= minPrice;
      const matchCategory =
        categories.length === 0 || categories.includes(product.category);

      return matchPrice && matchCategory;
    });
  };

  return { filterProducts, setFilters, filters };
}
