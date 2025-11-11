import { useEffect, useState } from "react";
import { Products } from "./components/products.jsx";
import { Header } from "./components/header.jsx";
import { Footer } from "./components/Footer.jsx";
import { IS_DEVELOPMENT } from "./config.js";
// import { useFilters } from "./hooks/useFilters.js";
import { CartProvider } from "./context/cart.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Home } from "./components/Home.jsx";
import ProductModal from "./components/ProductModal.jsx";
import { ProductModalProvider } from "./context/modal.jsx";
import { CartModalProvider } from "./context/cartModal.jsx";
import { Filters } from "./components/Filters.jsx";
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const { filterProducts } = useFilters();
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
  // const filteredProducts = filterProducts(products);
  return (
    <CartProvider>
      <ProductModalProvider>
        <CartModalProvider>
          <Navbar /> 
          <Home products={products} categories={categories} />
          <ProductModal /> 
          {/* <Filters /> 
          <Products products={filteredProducts} />
          {IS_DEVELOPMENT && <Footer />} */}
        </CartModalProvider>
      </ProductModalProvider>
    </CartProvider>
  );
}
export default App;
