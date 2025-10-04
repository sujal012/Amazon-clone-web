import { cart } from "./cart.js";
import {getProduct, loadProductsFetch} from "./products.js"

let cartQuantity = 0;

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
function allOrders() {
  let codeHTML = '';
  cart.forEach(cartItem => {
      let productDetails = getProduct(cartItem.productId);
      if (!productDetails) {
          console.log(`Product with ID ${cartItem.productId} not found.`);
          return;
      }

      codeHTML += `
          
              <div class="product-image-container">
                  <img src="${productDetails.image}">
              </div>

              <div class="product-details" data-product-id="${cartItem.productId}">
                  <div class="product-name">${productDetails.name}</div>
                  <div class="product-delivery-date">Arriving on: August 15</div>
                  <div class="product-quantity">Quantity: ${cartItem.quantity}</div>

                  <button class="buy-again-button button-primary">
                      <img class="buy-again-icon" src="images/icons/buy-again.png">
                      <span class="buy-again-message">Buy it again</span>
                  </button>
              </div>

              <div class="product-actions">
                  <button class="track-package-button button-secondary" data-product-id="${cartItem.productId}">
                      Track package
                  </button>
              </div>
          
      `;
  });

  document.querySelector('.order-details-grid').innerHTML = codeHTML;

  // Attach event listener after rendering
  document.querySelectorAll('.track-package-button').forEach(button => {
      button.addEventListener('click', (event) => {
          event.preventDefault();
          const productId = event.target.dataset.productId;

          if (!productId) {
              console.error("Error: No productId found for tracking.");
              return;
          }

          // Store productId for tracking page
          localStorage.setItem('trackingProductId', productId);
          window.location.href = 'tracking.html';
      });
  });
}

loadProductsFetch().then(() => {
  allOrders();
});