const productsContainer = document.getElementById("products");
const loading = document.getElementById("loading");
const alertBox = document.getElementById("alert");

function showAlert(message, type = "success") {
  alertBox.textContent = message;
  alertBox.className = type === "success"
    ? "alert-success"
    : "alert-error";
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}

async function loadProducts() {
  loading.style.display = "block";
  productsContainer.innerHTML = "";

  try {
    const res = await fetch("http://localhost:5050/api/products");
    const products = await res.json();

    loading.style.display = "none";

    if (products.length === 0) {
      productsContainer.innerHTML = "<p>No products found.</p>";
      return;
    }

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
  <img src="http://localhost:5050${product.image}" />
  <div class="card-body">
    <h3>${product.name}</h3>
    <p>₹ ${product.price}</p>
    <p>${product.description || ""}</p>
    <p>Stock: ${product.quantity}</p>
  </div>
  <div class="card-actions">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </div>
`;

     card.querySelector(".delete-btn").addEventListener("click", () =>
  deleteProduct(product._id)
);

card.querySelector(".edit-btn").addEventListener("click", () =>
  openEditModal(product)
);

productsContainer.appendChild(card);

    });

  } catch (err) {
    loading.style.display = "none";
    showAlert("Failed to load products", "error");
  }
}

async function deleteProduct(id) {
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `http://localhost:5050/api/products/${id}`,
      { method: "DELETE" }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    showAlert("Product deleted successfully");
    loadProducts();

  } catch (err) {
    showAlert("Delete failed", "error");
  }
}

loadProducts();
let currentEditId = null;

function openEditModal(product) {
  currentEditId = product._id;

  editName.value = product.name;
  editPrice.value = product.price;
  editDescription.value = product.description || "";
  editQuantity.value = product.quantity;

  document.getElementById("editModal").classList.remove("hidden");
}

cancelEdit.onclick = () => {
  document.getElementById("editModal").classList.add("hidden");
};

qtyPlus.onclick = () => {
  editQuantity.value = Number(editQuantity.value) + 1;
};

qtyMinus.onclick = () => {
  editQuantity.value = Math.max(0, Number(editQuantity.value) - 1);
};

saveEdit.onclick = async () => {
  const formData = new FormData();
  formData.append("name", editName.value);
  formData.append("price", editPrice.value);
  formData.append("description", editDescription.value);
  formData.append("quantity", editQuantity.value);

  if (editImage.files[0]) {
    formData.append("image", editImage.files[0]);
  }

  await fetch(`http://localhost:5050/api/products/${currentEditId}`, {
    method: "PUT",
    body: formData
  });

  document.getElementById("editModal").classList.add("hidden");
  loadProducts();
};
