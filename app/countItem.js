let count = document.querySelector(".count");
let cloneData = localStorage.getItem("cartProduct");
let convert = JSON.parse(cloneData);
// if (convert == null) {
//   count.textContent = null;
// } else {
//   count.textContent = convert.length;
// }
if (convert) count.textContent = convert.length;
