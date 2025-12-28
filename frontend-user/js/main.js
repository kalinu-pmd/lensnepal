console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

function updateCartCount() {
    const cart = getFromStorage("cart");
    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const cartLinks = document.querySelectorAll("a[href='cart.html']");
    cartLinks.forEach(link => {
        link.textContent = `Cart (${total})`;
    });
}
const featuredContainer = document.getElementById("featuredProducts");
const featuredLoading = document.getElementById("featuredLoading");

if (featuredContainer) {
  loadFeaturedProducts();
}

async function loadFeaturedProducts() {
  try {
    const res = await fetch("http://localhost:5050/api/products");
    const products = await res.json();

    featuredLoading.remove();

    if (products.length === 0) {
      featuredContainer.innerHTML = "<p>No products available.</p>";
      return;
    }

    // Take first 4 products as featured
    products.slice(0, 4).forEach(product => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="http://localhost:5050${product.image}" />
        <div class="card-body">
          <h3>${product.name}</h3>
          <p>₹ ${product.price}</p>

          <a href="product-details.html?id=${product._id}" class="primary-btn">
            View Details
          </a>
        </div>
      `;

      featuredContainer.appendChild(card);
    });

  } catch (err) {
    featuredContainer.innerHTML = "<p>Failed to load products</p>";
  }
}

loadFeaturedProducts();
