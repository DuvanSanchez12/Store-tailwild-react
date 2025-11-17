import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=1000&skip=0")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <>
      <Navbar />
      <Outlet context={{ products, categories }} />
      <Footer />
    </>
  );
}
