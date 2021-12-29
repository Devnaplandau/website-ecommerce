const get = document.querySelector.bind(document);
const getAll = document.querySelectorAll.bind(document);

let listProducts = get(".showListProducts");
let test = getAll(".nav");
let headingProduct = get(".heading-products");

// xử lí

const pageProduct = {
  createIds: function () {
    let id = "";
    id = setTimeout(() => {
      String(new Date().getTime());
    }, 10);
    return id;
  },
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
        this.naviProducts(data);
      });
  },
  naviProducts: function (data) {
    // const _this = this;
    test.forEach((value) => {
      value.onclick = (e) => {
        e.preventDefault();
        let value = e.target.closest(".nav").getAttribute("data");
        if (value) {
          this.render(data, value);
        }
      };
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
      this.filterProduct(addFucProduct);
      // this.handleFavorite(addFucProduct);
      // sắp xếp thứ tự ngẫu nhiên
      addFucProduct.sort(function () {
        return 0.5 - Math.random();
      });
      let htmls = addFucProduct.map((item) => {
        return `  <div class="box">
       <div class="image ">
       <div class="discount">${item.discount * 100}%</div>
         <img src=${item.image} class="main-img screen-image" alt="" />
         <div class="icons product-icon">
           <a href="#" class="fas fa-shopping-cart" onclick="addCart(${
             item.id
           }) ; return false"></a>
           <a href="#" class="fas fa-heart event" onclick="addLike(${
             item.id
           }); return false" ></a>
           <a href="#" class="fas fa-share" onclick="msg(); return false"></a>
         </div>
       </div>
       <div class="content">
         <h3>${item.name}</h3>
         <div class="price">${item
           .markDown()
           .toLocaleString()}VNĐ<span>${item.price.toLocaleString()}.VNĐ</span></div>
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
    });
  },
  // render theo loại
  render: function (vlue, options) {
    vlue.forEach((index) => {
      let products = index[options];
      let renderProduct = this.productFunc(products);
      let htmls = renderProduct.map((item) => {
        return `  <div class="box">
       <div class="image ">
       <div class="discount">${item.discount * 100}%</div>
         <img src=${item.image} class="main-img screen-image" alt="" />
         <div class="icons product-icon">
           <a href="#" class="fas fa-shopping-cart" onclick="addCart(${
             item.id
           }) ; return false"></a>
           <a href="#" class="fas fa-heart event" onclick="addLike(${
             item.id
           }); return false"></a>
           <a href="#" class="fas fa-share" onclick="msg(); return false"></a>
         </div>
       </div>
       <div class="content">
         <h3>${item.name}</h3>
         <div class="price">${item
           .markDown()
           .toLocaleString()}VNĐ<span>${item.price.toLocaleString()}.VNĐ</span></div>
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
  filterProduct: function (data) {
    let that = this;
    let dataInput = document.getElementById("search-box");
    dataInput.oninput = function (e) {
      const dataFilter = data.filter((item) => {
        return item.name.toUpperCase().includes(e.target.value.toUpperCase());
      });
      that.renderFilter(dataFilter);
    };
  },
  renderFilter: function (data) {
    if (data.length == 0) {
      let listProducts = get(".empty-find");
      listProducts.classList.add("active");
    } else {
      let listProducts = get(".empty-find");
      listProducts.classList.remove("active");
    }

    let htmls = data.map((item) => {
      return `  <div class="box">
     <div class="image ">
     <div class="discount">${item.discount * 100}%</div>
       <img src=${item.image} class="main-img screen-image" alt="" />
       <div class="icons product-icon">
         <a href="#" class="fas fa-shopping-cart" onclick="addCart(${
           item.id
         }) ; return false"></a>
         <a href="#" class="fas fa-heart event" onclick="addLike(${
           item.id
         }); return false"></a>
         <a href="#" class="fas fa-share" onclick="msg(); return false"></a>
       </div>
     </div>
     <div class="content">
       <h3>${item.name}</h3>
       <div class="price">${item
         .markDown()
         .toLocaleString()}VNĐ<span>${item.price.toLocaleString()}.VNĐ</span></div>
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
  },
  start: function () {
    // chọn các loại sản phẩm
    this.naviProducts();
    // gọi các func để xử lí
    this.handleGetData();
  },
};
pageProduct.start();

// fix product like
function addLike(data) {
  toast({
    title: "Success",
    message: "Đã thành công !",
    type: "success",
    duration: 1000,
  });

  let callLocal = localStorage.getItem("likeProduct");
  let convert = JSON.parse(callLocal);
  let listIds = [];
  if (callLocal == null) {
    let dataCart = createObjLike(data);
    listIds.push(dataCart);
    let convert = JSON.stringify(listIds);
    localStorage.setItem("likeProduct", convert);
  }

  // if (callLocal != null) {
  //   const itemCart = createObjLike(data);
  //   convert.push(itemCart);
  //   saveListLikeItem(convert);
  // }
  if (callLocal != null) {
    let existItemCart = false;
    // xử lí nếu add trùng
    for (let i = 0; i < convert.length; i++) {
      let saveIndex = convert[i];
      if (saveIndex.id == data) {
        saveIndex.id == data;
        existItemCart = true;
      }
    }
    if (existItemCart == false) {
      const itemCart = createObjLike(data);
      convert.push(itemCart);
    }
    saveListLikeItem(convert);
  }
}

function createObjLike(id, quantity) {
  var itemCart = {};
  itemCart.id = id;
  itemCart.quantity = quantity;
  return itemCart;
}
function saveListLikeItem(listItemCart) {
  var jsonItemCart = JSON.stringify(listItemCart);
  localStorage.setItem("likeProduct", jsonItemCart);
}
///// add item cart
function addCart(data) {
  toast({
    title: "Success",
    message: "Đã thành công !",
    type: "success",
    duration: 1000,
  });

  let callLocal = localStorage.getItem("cartProduct");
  let convert = JSON.parse(callLocal);

  // xử lí bth
  let listIds = [];
  if (callLocal == null) {
    let dataCart = createObjCart(data, 1);
    listIds.push(dataCart);
    let convert = JSON.stringify(listIds);
    localStorage.setItem("cartProduct", convert);
  }

  if (callLocal != null) {
    let existItemCart = false;
    // xử lí nếu add trùng
    for (let i = 0; i < convert.length; i++) {
      let saveIndex = convert[i];
      if (saveIndex.id == data) {
        saveIndex.quantity == saveIndex.quantity++;
        existItemCart = true;
      }
    }
    if (existItemCart == false) {
      const itemCart = createObjCart(data, 1);
      convert.push(itemCart);
    }
    saveListCartItem(convert);
    loadCount();
  }
}

function createObjCart(id, quantity) {
  var itemCart = {};
  itemCart.id = id;
  itemCart.quantity = quantity;
  return itemCart;
}
function saveListCartItem(listItemCart) {
  var jsonItemCart = JSON.stringify(listItemCart);
  localStorage.setItem("cartProduct", jsonItemCart);
}

// toast custom
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    // auto remove
    const removeId = setTimeout(function () {
      main.removeChild(toast);
    }, duration);
    // clicl remove
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        // click sẽ remove lun, và setimeout k chạy nữa
        clearTimeout(removeId);
      }
    };
    toast.classList.add("toast", `toast--${type}`);
    const delay = (duration / 1000).toFixed(2);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
    toast.innerHTML = ` <div class="toast__icon">
    <i class="fas fa-check-circle"></i>
    </div>
  <div class="toast__body">
    <h3 class="toast__title">${title}</h3>
    <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close">
    <i class="fas fa-times"></i>
    </div>
      `;
    main.appendChild(toast);
  }
}

function loadCount() {
  let count = document.querySelector(".count");
  let local = localStorage.getItem("cartProduct");
  let convert = JSON.parse(local);
  count.innerHTML = convert.length;
}
