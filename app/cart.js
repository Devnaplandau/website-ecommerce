const get = document.querySelector.bind(document);
const getAll = document.querySelectorAll.bind(document);

let box_cart = get(".itemCart");
let showPaymet = get(".overlay-payment");
let btnShowPaymet = get(".btn-payment");
let closePayment = get(".custom");

btnShowPaymet.onclick = (e) => {
  showPaymet.classList.add("active");
};
closePayment.onclick = (e) => {
  e.stopPropagation();
  showPaymet.classList.remove("active");
};

const cartProduct = {
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

      let change = this.productFunc(productsAll);
      this.checkQuantity(change);
      this.del(change);
    });
  },
  checkQuantity: function (data) {
    let cloneData = localStorage.getItem("cartProduct");
    let convert = JSON.parse(cloneData);
    let arrContain = [];
    for (let i = 0; i < convert.length; i++) {
      let saveIndex = convert[i];
      let checkCartLocal = data.filter((item) => {
        if (item.id == `'${saveIndex.id}'`) {
          return (item.quantity = saveIndex.quantity);
        }
      });
      arrContain.push(...checkCartLocal);
      this.renderItem(arrContain);
      this.caculator(arrContain);
    }
  },
  del: function (data) {
    let that = this;
    box_cart.addEventListener("click", del_cart);
    function del_cart(e) {
      cartItem = e.target.parentElement;
      if (e.target.classList.contains("del-cart")) {
        cartItem.remove();
      }
      let cloneData = localStorage.getItem("cartProduct");
      let convert = JSON.parse(cloneData);
      let update = convert.filter((product) => {
        return `'${product.id}'` != cartItem.dataset.id;
      });

      localStorage.setItem("cartProduct", JSON.stringify(update));

      that.count();
      that.checkcal(data);
    }
  },
  checkcal: function (data) {
    let cloneData = localStorage.getItem("cartProduct");
    let convert = JSON.parse(cloneData);
    let arrContain = [];
    for (let i = 0; i < convert.length; i++) {
      let saveIndex = convert[i];
      let checkCartLocal = data.filter((item) => {
        if (item.id == `'${saveIndex.id}'`) {
          return saveIndex.id;
        }
      });

      arrContain.push(...checkCartLocal);
      this.caculator(arrContain);
    }
  },
  caculator: function (data) {
    let total = get(".total");
    let cacu = data?.reduce((total, value) => {
      return (total += value.quantity * value.markDown());
    }, 0);
    total.innerHTML = cacu?.toLocaleString() + " " + "VNĐ" ?? 0;
  },
  renderItem: function (data) {
    // xử lí render
    let nodeCard = get(".itemCart");
    let html = data.map((item) => {
      return ` <div class="box" data-id="${item.id}">
      <i class="fas fa-times del-cart"></i>
      <img src="${item.image}" alt=""/>
      <div class="content">
        <h3>${item.name}</h3>
        <form action="">
        <span>quatity: </span>
        <input type="number" name="" id="" value="${item.quantity}" disabled />
      </form>
        <div class="price item-12qwe">
        <p class="price-down">
        ${item.markDown().toLocaleString()} VNĐ 
          </p>
        <span>${item.price.toLocaleString()}.VNĐ</span></div>
      </div>
    </div>`;
    });
    nodeCard.innerHTML = html.join("");
  },
  count: function () {
    let count = document.querySelector(".count");
    let cloneData = localStorage.getItem("cartProduct");
    let convert = JSON.parse(cloneData);
    if (convert) count.textContent = convert.length;
  },

  runAll: function () {
    this.handleGetData();
  },
};

cartProduct.runAll();
// xử lí linh tinh
