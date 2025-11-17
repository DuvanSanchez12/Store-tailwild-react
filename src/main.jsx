import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App.jsx";
import { ProductModalProvider } from "./context/modal.jsx";
import { CartModalProvider } from "./context/cartModal.jsx";
import { CartProvider } from "./context/cart.jsx";
import { FiltersProvider } from "./context/filters.jsx";
import "./index.css";
import { Filters } from "./components/Filters.jsx";
import ProductModal from "./components/ProductModal.jsx";
import { CategoryProvider } from "./context/category.jsx";

const HomePage = lazy(() => import("./routes/Home.jsx"));
const Products = lazy(() => import("./routes/products.jsx"));
const Payment = lazy(() => import("./routes/payment.jsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <>
              <Filters />
              <Products />
            </>
          </Suspense>
        ),
      },
      {
        path: "payment",
        element: (
          <Suspense>
            <>
            <Payment />
            </>
          </Suspense>
        )
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <FiltersProvider>
      <CategoryProvider>
        <ProductModalProvider>
          <CartModalProvider>
            <ProductModal />
            <RouterProvider router={router} />
          </CartModalProvider>
        </ProductModalProvider>
      </CategoryProvider>
    </FiltersProvider>
  </CartProvider>
);
