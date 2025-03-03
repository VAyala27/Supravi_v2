function showPreloader() {
  document.getElementById("preloader").style.display = "flex";
}

function hidePreloader() {
  document.getElementById("preloader").style.display = "none";
}

function displayCartItem() {
  let html = "";
  let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
  let cartHeading = document.querySelector(".cart-heading");
  if (cartItem.length === 0) {
    cartHeading.textContent = "Your Cart Is Empty";
  } else {
    cartHeading.textContent = "Shopping Cart Details";
  }
  cartItem.forEach((item) => {
    html += ` <div class="row mb-5 align-items-center justify-content-center">
        <div class="col-lg-3 col-md-3 col-sm-3">
          <img class="img-fluid" src="${item.image}" alt="">
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3">
          <h5>${item.name}</h5>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1">
         ${item.price}
          </div>
        <div class="col-lg-2 col-md-2 col-sm-2">
          <input
              type="number"
              min="1"
              max="10"
              name="quantity"
              class="w-50 form-control qty"
              value="${item.quantity}"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-sm-3">
          <button class="btn btn-danger d-block removeItem">
            Remove
          </button>
            </div>
      </div>`;
  });

  document.querySelector(".cartdisp").innerHTML = html;
}

displayCartItem();

function removeFromCart() {
  const removeItem = document.getElementsByClassName("removeItem");
  for (var i = 0; i < removeItem.length; i++) {
    let removeBtn = removeItem[i];
    removeBtn.addEventListener("click", function () {
      showPreloader();
      let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
      console.log(
        event.target.parentElement.parentElement.children[1].children[0]
          .textContent
      );

      cartItem.forEach((item) => {
        if (
          item.name !=
          event.target.parentElement.parentElement.children[1].children[0]
            .textContent
        ) {
          products.push(item);
        }
        setTimeout(function () {
          location.reload();
        }, 2000);
      });
      localStorage.setItem("prdInCart", JSON.stringify(products));
    });
  }
}
removeFromCart();

function updateQunatity() {
  const qty = document.getElementsByClassName("qty");
  for (var i = 0; i < qty.length; i++) {
    let qtyInput = qty[i];
    qtyInput.addEventListener("change", function () {
      showPreloader();
      let value = this.value;
      let cartItem = JSON.parse(localStorage.getItem("prdInCart"));

      cartItem.forEach((item) => {
        if (
          item.name ==
          event.target.parentElement.parentElement.children[1].children[0]
            .textContent
        ) {
          item.quantity = value;
          item.totalPrice = value * item.price;
        }
        products.push(item);
      });
      setTimeout(function () {
        location.reload();
      }, 4000);
      localStorage.setItem("prdInCart", JSON.stringify(products));
    });
  }
}

function subTotal() {
  let total = 0;
  let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
  let tax = document.querySelector(".tax").textContent;
  tax = tax.replace(/[^0-9.]/g, "");
  tax = parseFloat(tax);
  let totalAmount = 0;
  cartItem.forEach((item) => {
    total = item.totalPrice += total;
  });
  let subTotalText = document.querySelector(".subtotal");
  subTotalText.textContent = "$" + total.toFixed(2);

  totalAmount = total + tax;
  let totalAmountText = document.querySelector(".total");
  totalAmountText.textContent = totalAmount.toFixed(2);
}
subTotal();

setTimeout(() => {
  hidePreloader();
  updateQunatity();
}, 1000); // Adjust the delay as needed

setTimeout(() => {
  hidePreloader();
  removeFromCart();
}, 1000); // Adjust the delay as needed
