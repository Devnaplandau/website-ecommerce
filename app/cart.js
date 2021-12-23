const get = document.querySelector.bind(document);
const getAll = document.querySelectorAll.bind(document);

let showPaymet = get(".overlay-payment");
let btnShowPaymet = get(".btn-payment");
let closePayment = get(".custom");
btnShowPaymet.onclick = (e) => {
  showPaymet.classList.add("active");
};
// showPaymet.onclick = (e) => {
//   e.stopPropagation();
//   showPaymet.classList.remove("active");
// };
closePayment.onclick = (e) => {
  e.stopPropagation();
  showPaymet.classList.remove("active");
};
