import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart} from "../data/cart.js";

let cartQuantity = 0;

        cart.forEach((cartItem)=>{
            cartQuantity += cartItem.quantity;
        });

    document.querySelector('.js-cart-quantity').innerHTML = `
        ${cartQuantity}
    `

document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('trackingProductId');

    console.log("Retrieved Product ID from LocalStorage:", productId); // Debugging

    if (!productId) {
        console.error("Error: No tracking product found in LocalStorage.");
        return;
    }

    // Ensure products are loaded before getting the product
    loadProductsFetch().then(() => {
        const product = getProduct(productId);

        if (!product) {
            console.error(`Error: Product with ID ${productId} not found in products list.`);
            console.log("Available products:", products); // Debugging
            return;
        }

        const cartItem = cart.find(item => item.productId === productId);
        const productQuantity = cartItem ? cartItem.quantity : 1;

        // Update tracking page with product details
        document.querySelector('.delivery-date').textContent = `Arriving on: August 15`;
        document.querySelector('.product-info').innerHTML = `
            <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
              View all orders
            </a>

            <div class="delivery-date">
            
            </div>

            <div class="product-info">
              ${product.name}
            </div>

            <div class="product-info">
              Quantity: ${productQuantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
              <div class="progress-label">
                Preparing
              </div>
              <div class="progress-label current-status">
                Shipped
              </div>
              <div class="progress-label">
                Delivered
              </div>
            </div>

            <div class="progress-bar-container">
              <div class="progress-bar"></div>
            </div>
          </div>
        `;

        document.querySelector('.product-image').src = product.image;
    }).catch(error => {
        console.error("Error loading products:", error);
    });
});
