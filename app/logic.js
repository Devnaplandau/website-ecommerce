let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

// define
let sideBar = $(".side-bar");
let menuShow = $("#menu-btn");
let closeIcon = $("#close-side-bar");
let searchIcon = $("#search-btn");

// handle event
menuShow.onclick = () => {
  sideBar.classList.add("active");
};
closeIcon.onclick = () => {
  sideBar.classList.remove("active");
};

searchIcon.onclick = () => {
  $(".search-form").classList.toggle("active");
};
// handle scroll remove class
window.onscroll = () => {
  sideBar.classList.remove("active");
  $(".search-form").classList.remove("active");
};

// handle click faq
let faqs = $$(".accordion-container .accordion");

faqs.forEach((accor) => {
  accor.onclick = function (e) {
    accor.classList.toggle("active");
  };
});

// lib swiper nav
var swiper = new Swiper(".home-slider", {
  loop: true,
  granCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  granCursor: true,
  spaceBetween: 20,
  breakpoints: {
    450: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
