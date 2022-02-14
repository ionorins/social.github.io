let productDetails = {};
let creditCardShown = false;

/*
* When the page is loaded, initialise the products and reset the listeners
*/
function init() {
  //initProducts takes a callback function - when the products are loaded the basket will be recalculated
  initProducts(calculateBasket);
  resetListeners();

  // Show a message if no products in basket
  console.log($('.checkoutList').text());
  if (!$('.checkoutList').text()) {
    $('.checkoutList').text('Please add a product to basket!');
  }
}

//When changing the page, you should make sure that each adjust button has exactly one click event
//(otherwise it might trigger multiple times)
function resetListeners() {

  // Go to checkout page when user clicks button
  $('.proceed-to-checkout-btn').on('click', () => window.location.href = 'checkout.html');

  // Listener on quantity changes
  $('.basket-product-quantity').on('change', (e) => {

    // Get the new value
    const newQuantity = e.target.value;

    // Quantity can not be negative
    if (newQuantity > 0) {

      // Get the basket
      let basket = JSON.parse(getCookie("basket"));

      // Get the product id and update basket
      const productID = e.target.dataset.productId;
      basket[productID] = newQuantity;

      // Save changes in the cookie
      setCookie('basket', JSON.stringify(basket));

      // Re-calculate basket
      calculateBasket();


    } else {
      alert('Quantity must be greater than 0');
    }

  });

  // Listener on product removal
  $('.remove-product').on('click', (e) => {

    // Get the basket
    let basket = JSON.parse(getCookie("basket"));

    // Get the product to be deleted
    const productID = e.target.dataset.productId;

    // Delete product from basket
    delete basket[productID];

    // Save changes in the cookie
    setCookie('basket', JSON.stringify(basket));

    // Re-calculate basket
    calculateBasket();

  })
}

//When the pay by credit card link is clicked, show the creditcard.html in an iframe
function showCreditCardPage() {
  if (!creditCardShown) {
    var payIFrame = document.createElement("iframe");
    payIFrame.src = "creditcard.html";
    payIFrame.width = "50%";

    document.querySelector('#customerDetails').appendChild(payIFrame);
  }
}


/*
* Calculate the totals and show the basket
*/
function calculateBasket() {
  let total = 0;
  let basket = JSON.parse(getCookie("basket"));
  document.querySelector('.checkoutList').innerHTML = '';
  let thisProduct='<tr>Please add a product to basket!';
  for (const productID in basket) {
    let quantity = basket[productID];
    let price = productDetails[productID].price;
    let productTotal = price * quantity;
    total = total + productTotal;
    let rowHTML = `<td>${productDetails[productID].name}</td><td><input type='number' min='0' data-product-id='${productID}' class='basket-product-quantity' value='${quantity}'/></input></td><td>${(price / 100).toFixed(2)}</td><td class='product-total'>£${(productTotal / 100).toFixed(2)}</td><td class='remove-product' data-product-id='${productID}'>x</td>`;
    thisProduct = document.createElement("tr");
    thisProduct.innerHTML = rowHTML;
    document.querySelector('.checkoutList').appendChild(thisProduct);
  }

  // Set total price
  $('.total-price').text(`Total: £${(total / 100).toFixed(2)}`);
  
  document.querySelector('.checkoutList').appendChild(thisProduct);

  resetListeners();
}

window.addEventListener("load", init);