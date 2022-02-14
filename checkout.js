let productDetails = {};
let creditCardShown = false;

/*
* When the page is loaded, initialise the products and reset the listeners
*/
function init() {
  resetListeners();
}

//When changing the page, you should make sure that each adjust button has exactly one click event
//(otherwise it might trigger multiple times)
function resetListeners() {

  // Listener on checkout back button
  $('.back-to-basket').on('click', (e) => {

    // Prevent form submission
    e.preventDefault();
    
    // Go back to basket
    window.location.replace(`${window.location.origin}/basket.html`)

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


window.addEventListener("load", init);