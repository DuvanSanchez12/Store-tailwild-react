import { Cart } from "./cart.jsx";
import {
  HeartIcon,
  UserIcon,
  SearchIcon,
  LocateIcon,
  AllIcons,
} from "./icons.jsx";
import "./Navbar.css";

export function Navbar() {
  return (
    <header className="antialiased text-gray-200 border-b">
      <div className="bg-gray-100 py-1  ">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="md:w-1/2 w-full text-center md:text-left  text-gray-500 text-md font-medium">
              <span>🔥 Ofertas especiales en pedidos superiores a $100.</span>
            </div>
          </div>
        </div>
      </div>
      <nav className="bg-white mx-auto container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center">
              <img src="./src/assets/foto.jpg" alt="" className="perfil" />
              <h1 className="font-semibold text-black text-2xl">DuvanShop</h1>
            </a>
          </div>
          <div className="hidden lg:flex flex-1 px-10">
            <div className="relative w-full max-w-100">
              <input
                type="text"
                placeholder="Buscar productos"
                className="w-full border font-semibold text-gray-500 border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:ring-green-500 focus:border-green-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <SearchIcon />
              </span>
            </div>
            <div className="relative group px-3">
              <a
                href="#!"
                className="hidden lg:flex items-center px-4 gap-2 py-2 border-gray-300 text-gray-600 
               font-medium border rounded-lg hover:text-white hover:bg-gray-600 
               hover:border-gray-600 active:bg-gray-600 active:border-gray-600 
               focus:outline-none focus:ring-4 focus:ring-gray-300 
               disabled:opacity-50 disabled:pointer-events-none transition"
              >
                <LocateIcon />
                Localización
              </a>
              <div
                className="absolute left-0 mt-2 w-60 bg-white shadow-xl rounded-lg 
                  border border-gray-200 opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 z-50"
              >
                <ul className="py-2 text-gray-700 font-medium">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Colombia
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    México
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Argentina
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Estados Unidos
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    España
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Chile
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-green-600">
              <a href="">
                <UserIcon />
              </a>
            </button>
            <button className="relative text-gray-500 hover:text-green-600">
              <a href="">
                <HeartIcon />
                {/* <span class="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-2 bg-green-600 text-white text-center font-semibold text-sm">
                  5
                </span> */}
              </a>
            </button>
            <Cart />

          </div>
        </div>
        <div className="hidden lg:flex items-center gap-8 mt-4 font-medium text-gray-700">
          <div className="relative group">
            <a
              href="#!"
              className="hidden lg:flex items-center px-4 gap-2 py-2 btn-color text-white font-medium border rounded-lg border-green-600 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition"
            >
              <AllIcons />
              Categorías
            </a>
            <div className="absolute left-0 mt-2 w-60 bg-white shadow-xl rounded-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <ul className="py-2 text-gray-700 font-medium">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Ropa y Moda
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Tecnología
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Muebles & Hogar
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Frutas y Verduras
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Snacks y Dulces
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Electrodomésticos
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Accesorios
                </li>
              </ul>
            </div>
          </div>
          <a href="#" className="hover:text-green-600">
            Inicio
          </a>
          <a href="#" className="hover:text-green-600 flex items-center gap-1">
            Ropa
          </a>
          <a href="#" className="hover:text-green-600">
            Tecnologia
          </a>
          <a href="#" className="hover:text-green-600">
            Muebles
          </a>
        </div>
      </nav>
    </header>
  );
}
