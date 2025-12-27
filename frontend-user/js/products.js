const products = [
    { id: 1, name: "Classic Black Frame", price: 2500 },
    { id: 2, name: "Premium Silver Frame", price: 3200 }
];

function addToCart(productId) {
    let cart = getFromStorage("cart");

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveToStorage("cart", cart);
    updateCartCount();
    alert("Product added to cart");
}
