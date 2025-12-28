const form = document.getElementById("productForm");
const message = document.getElementById("message");

const name = document.getElementById("name");
const price = document.getElementById("price");
const eyewearType = document.getElementById("eyewearType");
const description = document.getElementById("description");
const quantity = document.getElementById("quantity");
const image = document.getElementById("image");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  message.textContent = "Uploading...";

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("eyewearType", eyewearType.value);
  formData.append("description", description.value);
  formData.append("quantity", quantity.value);

  if (image.files[0]) {
    formData.append("image", image.files[0]);
  }

  // collect checked face shapes
  const faceShapes = [];
  document
    .querySelectorAll(".checkbox-group input:checked")
    .forEach(cb => faceShapes.push(cb.value));

  formData.append("suitableFaceShapes", faceShapes.join(","));

  try {
    const response = await fetch("http://localhost:5050/api/products", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Upload failed");
    }

    message.textContent = "Product added successfully!";
    form.reset();
    alert("Product added successfully!");
  } catch (error) {
    message.textContent = error.message;
  }
});
