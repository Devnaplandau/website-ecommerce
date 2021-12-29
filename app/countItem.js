let count = document.querySelector(".count");
let cloneData = localStorage.getItem("cartProduct");
let convert = JSON.parse(cloneData);
if (convert) count.textContent = convert.length;
