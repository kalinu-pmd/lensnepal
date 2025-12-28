const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const addToCartBtn = document.getElementById("addToCartBtn");

async function loadProductDetails() {
  try {
    const res = await fetch(`http://localhost:5050/api/products/${productId}`);
    const product = await res.json();

    if (!res.ok) {
      alert(product.message || "Failed to load product");
      return;
    }

    // ✅ THIS IS THE MISSING PART
    productImage.src = `http://localhost:5050${product.image}`;
    productName.textContent = product.name;
    productPrice.textContent = `₹ ${product.price}`;
    productDescription.textContent = product.description || "";

    addToCartBtn.onclick = () => handleAddToCart(product._id);

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
}

loadProductDetails();
