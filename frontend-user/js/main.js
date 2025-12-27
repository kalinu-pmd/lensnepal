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
