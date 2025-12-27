document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
    const cart = getFromStorage("cart");
    const container = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!container) return;

    container.innerHTML = "";

    // ❌ Cart empty
    if (cart.length === 0) {
        container.textContent = "Your cart is empty.";

        // Hide checkout button
        if (checkoutBtn) {
            checkoutBtn.style.display = "none";
        }
        return;
    }

    // ✅ Cart has items → show checkout button
    if (checkoutBtn) {
        checkoutBtn.style.display = "inline-flex";
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.style.alignItems = "center";
        row.style.marginBottom = "16px";

        row.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                NPR ${item.price * item.quantity}
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
                <button onclick="decreaseQty(${item.id})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${item.id})">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        container.appendChild(row);
    });
}


/* ➕ Increase quantity */
function increaseQty(id) {
    const cart = getFromStorage("cart");
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += 1;
        saveToStorage("cart", cart);
        updateCartCount();
        renderCart();
    }
}

/* ➖ Decrease quantity */
function decreaseQty(id) {
    const cart = getFromStorage("cart");
    const item = cart.find(p => p.id === id);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        // quantity 1 → remove item
        const index = cart.findIndex(p => p.id === id);
        cart.splice(index, 1);
    }

    saveToStorage("cart", cart);
    updateCartCount();
    renderCart();
}

/* ❌ Remove item completely */
function removeItem(id) {
    let cart = getFromStorage("cart");
    cart = cart.filter(item => item.id !== id);

    saveToStorage("cart", cart);
    updateCartCount();
    renderCart();
}


document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!checkoutBtn) return;

    checkoutBtn.addEventListener("click", () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {
            // ❌ Not logged in → go to login
            alert("Please login to continue checkout.");
            window.location.href = "login.html";
            return;
        }

        // ✅ Logged in → go to checkout
        window.location.href = "checkout.html";
    });
});
