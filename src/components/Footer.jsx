import { CATEGORY } from "../components/Consts";
import { useCategoryClick } from "../hooks/FindCategory";
import {
  AmericanExpressIcon,
  DinersClubIcon,
  MasterCardIcon,
  VisaIcon,
} from "./icons";
import"./Footer.css"

export function Footer() {
  const categoryEntries = Object.entries(CATEGORY);
  const { handleCategoryClick, handleCategoryClickCategory } =
    useCategoryClick();
  return (
    <footer className="bg-gray-200 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:gap-4 lg:gap-0 py-4 ">
          <div className="w-full lg:w-1/3 flex flex-col gap-4 mb-6">
            <h6 className="text-lg font-semibold">Categories</h6>

            <div className="flex flex-wrap">
              <div className="w-1/2">
                <ul className="flex flex-col gap-2">
                  {categoryEntries.map(([categoryName]) => (
                    <li key={categoryName}>
                      <a
                        onClick={() =>
                          handleCategoryClickCategory(
                            CATEGORY[categoryName],
                            categoryName
                          )
                        }
                        className="hover:text-green-600 hover:underline cursor-pointer text-gray-600"
                      >
                        {categoryName.replace(/_/g, " ")}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap">
              {categoryEntries.map(([categoryName, slugs]) => {
                const visibleSlugs = slugs.slice(0, 5);
                const hasMore = slugs.length > 5;

                return (
                  <div
                    key={categoryName}
                    className="w-1/2 md:w-1/4 flex flex-col gap-4 mb-6"
                  >
                    <a
                      onClick={() =>
                        handleCategoryClickCategory(slugs, categoryName)
                      }
                      className="text-lg font-semibold hover:underline cursor-pointer"
                    >
                      {categoryName.replace(/_/g, " ")}
                    </a>

                    <ul className="flex flex-col gap-2">
                      {visibleSlugs.map((slug) => (
                        <li key={slug}>
                          <a
                            className="hover:text-green-600 hover:underline capitalize text-gray-600 cursor-pointer"
                            onClick={() => handleCategoryClick(slug)}
                          >
                            {slug.replace("-", " ")}
                          </a>
                        </li>
                      ))}

                      {hasMore && (
                        <li>
                          <a
                            className="text-sm text-green-600 hover:underline cursor-pointer"
                            onClick={() =>
                              handleCategoryClickCategory(slugs, categoryName)
                            }
                          >
                            Ver todos →
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 py-4">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <div className="lg:w-2/5 text-center lg:text-left">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <span className="text-gray-900">Socios de pago</span>
                <ul className="flex flex-row gap-4">
                  <li>
                    <VisaIcon />
                  </li>
                  <li>
                    <MasterCardIcon />
                  </li>
                  <li>
                    <AmericanExpressIcon />
                  </li>
                  <li>
                    <DinersClubIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 py-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-full text-center md:text-left">
              <span className="text-sm text-gray-500">
                © 2025 Duvan Rodriguez{" "}
                <a href="#" className="text-green-600">
                  @DuvanSanchez12
                </a>
              </span>
            </div>

            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="flex tech-icons items-center gap-5">
                <span className="text-gray-500">Síguenos en</span>
                <ul className="flex gap-2">
                  <li>
                    <a
                      href="https://github.com/DuvanSanchez12"
                      target="_blank"
                      className="text-white"
                    >
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        width="28"
                        alt="GitHub"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/duvan-camilo-rodriguez-sanchez-810433270"
                      target="_blank"
                      className="text-white"
                    >
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                        width="28"
                        alt="LinkedIn"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/camilo_sanchez547"
                      target="_blank"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                        width="28"
                        alt="Instagram"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
