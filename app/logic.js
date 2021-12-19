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

let btn = document.querySelectorAll(".btn-contact");
btn.forEach(
  (value) =>
    (value.onclick = (e) => {
      e.preventDefault();
      swal("Good job!", "Thank you for using this service!", "success");
    })
);

function msg() {
  swal("seems to be!", "...This feature is still under development!");
}

let homeBox = document.querySelectorAll(".arrivals .box");
homeBox.forEach(
  (item) =>
    (item.onclick = () => {
      swal("Good job!", "redirect to product page...", "info");
      setTimeout(function () {
        window.location.replace("./products.html");
      }, 1500);
    })
);
