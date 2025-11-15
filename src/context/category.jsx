/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [allCategories, setAllCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    const savedSlug = localStorage.getItem("selectedSlug");

    if (savedCategory) setSelectedCategory(savedCategory);
    if (savedSlug) setSelectedSlug(savedSlug);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSlug) {
      localStorage.setItem("selectedSlug", selectedSlug);
    }
  }, [selectedSlug]);

  const clearCategory = () => {
    setSelectedCategory("");
    setSelectedSlug("");
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedSlug");
  };

  return (
    <CategoryContext.Provider
      value={{
        allCategories,
        setAllCategories,
        selectedCategory,
        setSelectedCategory,
        selectedSlug,
        setSelectedSlug,
        clearCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
