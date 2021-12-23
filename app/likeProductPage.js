const get = document.querySelector.bind(document);
const getAll = document.querySelectorAll.bind(document);
// xử lí
const pageProduct = {
  productFunc: function (data) {
    let arrNull = [];
    data.forEach((item) => {
      let sp = {};
      sp.name = item.name;
      sp.price = item.price;
      sp.discount = item.discount;
      sp.image = item.image;
      sp.quantity = 1;
      // if (item.id != "") {
      //   sp.id = item.id;
      // } else {
      //   sp.id = this.createIds();
      // }
      sp.id = item.id;
      sp.markDown = function () {
        let disc = this.price * (1 - this.discount);
        return disc;
      };
      if (sp) {
        arrNull.push(sp);
      }
    });
    return arrNull;
  },
  handleGetData: function () {
    // let _this = this;
    fetch("dataProduct.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.renderAll(data);
      });
  },

  renderAll: function (data) {
    data.forEach((vale) => {
      let productsAll = vale.Tshirts.concat(
        vale.Jackets,
        vale.Pants,
        vale.Bags,
        vale.Accessories
      );
      let addFucProduct = this.productFunc(productsAll);
      this.handleFavorite(addFucProduct);
      // sắp xếp thứ tự ngẫu nhiên
    });
  },
  handleFavorite: function (data) {
    let callLocal = localStorage.getItem("likeProduct");
    let convert = JSON.parse(callLocal);
    let arr = [];
    convert.forEach((item) => {
      let filter = data.filter((idProduct) => {
        return `'${idProduct.id}'`.includes(item.id);
      });
      arr.push(...filter);
    });
    this.renderPageLike(arr);
  },
  renderPageLike: function (data) {
    let favorite = get(".favorite");
    let html = data.map((item) => {
      return ` <div class="box ">
    
      <img src="${item.image}" alt=""/>
      <div class="content">
        <h3>${item.name}</h3>
        <div class="price">${item
          .markDown()
          .toLocaleString()}VNĐ  <span>${item.price.toLocaleString()}.VNĐ</span></div>
      </div>
    </div>`;
    });
    favorite.innerHTML = html.join("");
  },
  clearLikeProduct: function () {
    let btnClear = get(".clearAllLikeProduct");
    btnClear.onclick = () => {
      localStorage.removeItem("likeProduct");
      this.renderEmpty();
    };
  },
  renderEmpty: function () {
    let favorite = get(".favorite");
    let emptyHtml = ` <div class="empty-product">
     <img src="images/empty-removebg-preview.png" alt="" class="empty" />
     <div class="title-empty">
      <h3>You don't have any favorites yet?</h3>
     </div>
      </div>`;
    favorite.innerHTML = emptyHtml;
  },
  start: function () {
    // gọi các func để xử lí
    this.handleGetData();
    this.clearLikeProduct();
    this.renderEmpty();
  },
};
pageProduct.start();

// check form
