let count = document.querySelector(".count");
let cloneData = localStorage.getItem("cartProduct");
let convert = JSON.parse(cloneData);
if (convert == null) {
  count.textContent = 0;
} else {
  count.textContent = convert.length;
}
