import Swiper from "swiper";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

export function initializeSwiperCarousels() {
  const swiperContainers = document.querySelectorAll(".swiper-container");

  swiperContainers.forEach((swiperContainer) => {
    const speed = swiperContainer.getAttribute("data-speed") || 400;
    const spaceBetween =
      swiperContainer.getAttribute("data-space-between") || 100;
    const paginationEnabled =
      swiperContainer.getAttribute("data-pagination") === "true";
    const navigationEnabled =
      swiperContainer.getAttribute("data-navigation") === "true";
    const autoplayEnabled =
      swiperContainer.getAttribute("data-autoplay") === "true";
    const autoplayDelay =
      swiperContainer.getAttribute("data-autoplay-delay") || 3000;
    const paginationType =
      swiperContainer.getAttribute("data-pagination-type") || "bullets";
    const effect = swiperContainer.getAttribute("data-effect") || "slide";

    const swiperOptions = {
      modules: [EffectFade, Navigation, Pagination, Autoplay], 
      speed: parseInt(speed),
      spaceBetween: parseInt(spaceBetween),
      effect: effect,
      breakpoints: {},
    };

    if (effect === "fade") {
      swiperOptions.fadeEffect = { crossFade: true };
    }

    const paginationEl = swiperContainer.querySelector(".swiper-pagination");
    if (paginationEnabled && paginationEl) {
      swiperOptions.pagination = {
        el: paginationEl,
        clickable: true,
        dynamicBullets: true,
        type: paginationType,
      };
    }

    if (navigationEnabled) {
      swiperOptions.navigation = {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      };
    }

    if (autoplayEnabled) {
      swiperOptions.autoplay = {
        delay: parseInt(autoplayDelay),
      };
    }

    new Swiper(swiperContainer, swiperOptions);
  });
}
