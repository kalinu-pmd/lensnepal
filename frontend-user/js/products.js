const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");

function getStockStatus(quantity) {
  if (quantity > 5) {
    return { text: "IN STOCK", class: "in" };
  } else if (quantity > 0) {
    return { text: "LOW STOCK – Hurry up!", class: "low" };
  } else {
    return { text: "OUT OF STOCK", class: "out" };
  }
}

async function loadProducts() {
  try {
    const res = await fetch("http://localhost:5050/api/products");
    const products = await res.json();

    loading.style.display = "none";

    if (products.length === 0) {
      productsContainer.innerHTML = "<p>No products available.</p>";
      return;
    }

    products.forEach(product => {
      const stock = getStockStatus(product.quantity);

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
  <img src="http://localhost:5050${product.image}" />
  <div class="card-body">
    <h3>${product.name}</h3>
    <p>₹ ${product.price}</p>
    <p>${product.description || ""}</p>
    <p class="stock ${stock.class}">${stock.text}</p>

    <div class="card-actions">
  <button 
    class="view-btn"
    onclick="viewProduct('${product._id}')"
  >
    View Details
  </button>

  <button 
    class="add-to-cart"
    data-id="${product._id}"
    ${product.quantity === 0 ? "disabled" : ""}
  >
    Add to Cart
  </button>
</div>

  </div>
`;


      productsContainer.appendChild(card);

    });
// 🔑 Attach Add to Cart handlers AFTER rendering
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    handleAddToCart(button.dataset.id);
  });
});

  } catch (error) {
    loading.textContent = "Failed to load products";
  }
}

loadProducts();

async function handleAddToCart(productId) {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("redirectAfterLogin", "products.html");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5050/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId,
        quantity: 1
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to add to cart");
      return;
    }

    // ✅ SUCCESS → go to cart page
    window.location.href = "cart.html";
  } catch (error) {
    alert("Something went wrong while adding to cart");
  }
}
function viewProduct(productId) {
  window.location.href = `product-details.html?id=${productId}`;
}
