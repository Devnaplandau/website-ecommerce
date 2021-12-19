const get = document.querySelector.bind(document);
const getAll = document.querySelectorAll.bind(document);

let listProducts = get(".showListProducts");
let api = "./app/mockupApi/dataProduct.json";
let test = getAll(".nav");
let headingProduct = get(".heading-products");
const pageProduct = {
  handleGetData: function () {
    let _this = this;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        _this.naviProducts(data);
      });
  },
  naviProducts: function (data) {
    const _this = this;
    test.forEach((value) => {
      value.onclick = (e) => {
        e.preventDefault();
        let value = e.target.closest(".nav").getAttribute("data");
        if (value) {
          _this.render(data, value);
        }
      };
    });
  },
  render: function (vlue, options) {
    vlue.forEach((index) => {
      let products = index[options];
      let htmls = products.map((item) => {
        return `  <div class="box">
       <div class="image">
         <img src=${item.image} class="main-img" alt="" />
         <img src=${item.image} class="hover-img" alt="" />
         <div class="icons product-icon">
           <a href="#" class="fas fa-shopping-cart"></a>
           <a href="#" class="fas fa-search-plus"></a>
           <a href="#" class="fas fa-heart"></a>
           <a href="#" class="fas fa-share"></a>
         </div>
       </div>
       <div class="content">
         <h3>${item.name}</h3>
         <div class="price">${item.price.toLocaleString()}VNĐ<span>$399.99</span></div>
         <div class="stars">
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star-half-alt"></i>
         </div>
       </div>
     </div>`;
      });
      listProducts.innerHTML = htmls.join("");
      headingProduct.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    });
  },
  start: function () {
    // chọn các loại sản phảm
    this.naviProducts();
    // gọi các func để xử lí
    this.handleGetData();
  },
};
pageProduct.start();
