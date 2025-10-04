

import { products, getProduct, loadProducts } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    console.log("Extracted productId from URL:", productId); // Debugging step

    if (!productId) {
        document.body.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    // Ensure products are loaded before accessing them
    await loadProducts(() => {
        const product = getProduct(productId);
        console.log("Loaded product:", product); // Debugging step

        if (!product) {
            document.body.innerHTML = "<h2>Product not found</h2>";
            return;
        }

        document.querySelector(".product-display").innerHTML = `
            
            <div class="product-d-image">
          <div class="product-icons">
            <img src="${product.image}" alt="" width="60">
            <img src="${product.image}" alt="" width="60">
            <img src="${product.image}" alt="" width="60">
            <img src="${product.image}" alt="" width="60">
            <img src="${product.image}" alt="" width="60">
          </div>
          <div class="product-main-image">
            <img src="${product.image}" alt="" width="400">
          </div>
        </div>
        <div class="product-d-details">
          <p class="product-title">
          ${product.name}
          </p>
          <p class="brand-store">Visit the Senston Store</p>
          <div class="product-rating">
            <div>
              <div>4.3 <img src="/images/assets/rating_img.png" height="20px"></div>
              <p>104,185 ratings | Search this page</p>
            </div>
            <p><span>#1 Best Seller</span> in Rubber Outdoor Basketballs</p>
            <h5>10k+ bought in past month</h5>
          </div>
          <hr>
          <div class="product-d-price">
            <div>
              <p>-35%</p>
              <h1><span>${product.getPrice()}</span></h1>
            </div>
            <h5>List Price $<span>23.50</span></h5>
            <p>Get <b>Fast, Free Shipping</b> with <span>Amazon Prime</span></p>
            <p><span>FREE Returns</span></p>
            <p><span>Join Prime to buy this item at ${product.getPrice()}</span></p>
            <p>Available at a lower price from <span>other sellers</span> that may not offer free Prime shipping.</p>
          </div>

          <div class="product-color-selection">
            <p>Color: <b>Brown</b></p>
            <div class="product-color-options">
              <div class="option">
                <img src="${product.image}" width="30px">
                <p>Black</p>
              </div>
              <div class="option">
                <img src="${product.image}" width="30px">
                <p>Orange</p>
              </div>
              <div class="option">
                <img src="${product.image}" width="30px">
                <p>Pink</p>
              </div>
              <div class="option">
                <img src="${product.image}" width="30px">
                <p>Blue</p>
              </div>
              <div class="option">
                <img src="${product.image}" width="30px">
                <p>Red</p>
              </div>
            </div>
          </div>
          <div class="product-info">
            <p><b>Brand</b></p> <p>SENSTON</p>
            <p><b>Model Name</b></p> <p>G9000</p>
            <p><b>Color</b></p> <p>Brown</p>
            <p><b>Form Factor</b></p> <p>Intermidiate</p>
            <p><b>Material</b></p> <p>Rubber</p>
          </div>
          <hr>
          <div class="product-description">
            <h1>About this item</h1>
            <ul>
              <li>DURABILITY - Our Boldfit Dunkmaster basketball has the quality which works on any wooden and concrete courts, It is a long lasting equipment owing to its ultra durable covering.</li>
              <li>GRIP : These basketballs have superior grip which makes it more convenient to play, as the basketball size 7 provides tenacious grip and friction with minimal slip.</li>
              <li>WATER RESISTANT : Our basketball is water resistant which makes it suitable for playing during rain as well as it becomes easy to wash.</li>
              <li>MATERIAL : Rubber | Core/Bladder Material :Synthetic Rubber | Construction Type : Moulded which allows precise ball control</li>
              <li>PREVENTS FROM DUST & DIRT : Our Dunkmaster basketball pattern is designed in such a way that it helps prevent dust and dirt deposits.</li>
            </ul>
          </div>
        </div>
        <div class="product-d-purchase">
          <div class="title">
            <h3>But new:</h3> <img src="/images/assets/circle_icon.png" width="20px">
          </div>
          <h1 class="price"><span>${product.getPrice()}</</span></h1>
          <div class="gap">
            <p>Get <b>Fast, Free Shipping</b> with <span>Amazon Prime</span></p>
            <p><span>Free Returns</span></p>
          </div>
          <div class="gap">
            <p><span>FREE delivery</span> <b>Saturday</b>,</p>
            <p><b>January 27</b> on orders shipped by Amazon over $35</p>
          </div>
          <div class="gap">
            <p>Or fastest delivery <b>Tomorrow</b>, <b>January 23</b>. Order within <span>10 hrs 56 mins</span></p>
          </div>
          <div class="delivery-location">
            <img src="/images/assets/location_icon_dark.png" width="20px">
            <p><span>Deliver to New York 10014</span></p>
          </div>
          <h2 class="product-stock">In Stock</h2>
          <select class="product-quant">
            <option value="1">Quantity: 1</option>
            <option value="2">Quantity: 2</option>
            <option value="3">Quantity: 3</option>
          </select>

          <button class="btn js-add-to-cart">Add to cart</button>
          <button class="btn product-buy">Buy Now</button>

          <div class="product-seller-info">
            <p>Ships from</p> <p><span>Amazon</span></p>
            <p>Sold by</p> <p><span>Senston Inc.</span></p>
            <p>Returns</p> <p><span>Eligible for Return,  Refund or Replacement within 30 days of reciept</span></p>
            <p>Payment</p> <p><span>Secure transaction</span></p>
          </div>

          <hr>
          <button class="product-add-list">Add to List</button>

        </div>
        `;

        // Add event listener for "Add to Cart" button
        document.querySelector(".js-add-to-cart").addEventListener("click", () => {
            addToCart(productId);
            updateCartQuantity();
            console.log("Product added to cart:", productId); // Debugging step
        });

        function updateCartQuantity() {
            let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
            document.querySelector(".js-cart-quantity").textContent = cartQuantity;
            console.log("Updated cart quantity:", cartQuantity); // Debugging step
        }

        updateCartQuantity(); // Ensure cart updates on page load
    });
});
