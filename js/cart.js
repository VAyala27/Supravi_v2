const add_to_cart = document.getElementsByClassName("add-to-cart");
const products = [];

for (var i = 0; i < add_to_cart.length; i++) {
  let cartBtn = add_to_cart[i];
  cartBtn.addEventListener("click", function () {
    // console.log(event.target.parentElement.children[0].textContent);
    // console.log(event.target.parentElement.parentElement.children[0].children[0].src);
    // console.log(event.target.parentElement.children[1].textContent);
    let cleanedPrice = event.target.parentElement.children[1].textContent;
    cleanedPrice = cleanedPrice.replace(/[^0-9.]/g, "");

    let product = {
      image:
        event.target.parentElement.parentElement.children[0].children[0].src,
      name: event.target.parentElement.children[0].textContent,
      price: cleanedPrice,
      totalPrice: parseFloat(cleanedPrice),
      quantity: 1,
    };
    // console.log(product);
    addItemToLocal(product);
  });
}

function addItemToLocal(product) {
  let cartItem = JSON.parse(localStorage.getItem("prdInCart"));
  if (cartItem === null) {
    products.push(product);
    localStorage.setItem("prdInCart", JSON.stringify(products));
    // console.log(cartItem);
  } else {
    cartItem.forEach((item) => {
      if (product.name == item.name) {
        product.quantity = item.quantity += 1;
        product.totalPrice = item.totalPrice += product.totalPrice;
      } else {
        products.push(item);
      }
    });
    products.push(product);
    window.location.href = "/cart";
  }
  localStorage.setItem("prdInCart", JSON.stringify(products));
}

// function cartNumberDisplay(){
//     let cartNumber = 0;
//     let cartItem = JSON.parse(localStorage.getItem('prdInCart'));
//     cartItem.forEach(item =>{
//         console.log(item);
//         cartNumber = item.quantity += cartNumber;
//     });
//     console.log(cartNumber);
// }
// cartNumberDisplay();

function getCartItemCount() {
  const cart = JSON.parse(localStorage.getItem("prdInCart")) || [];
  // return cart.length;
  let counter = document.querySelector(".counter");
  let mobilecounter = document.querySelector(".mobile-view-counter");
  counter.textContent = cart.length;
  mobilecounter.textContent = cart.length;
}
console.log(getCartItemCount());
