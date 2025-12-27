const Product = require("../models/Product");

// Temporary in-memory product list
const products = [
    new Product(
        1,
        "Classic Black Frame",
        2500,
        "Eyeglasses",
        ["Round", "Oval"],
        "/images/classic-black-frame.jpg",
        true
    ),
    new Product(
        2,
        "Slim Metal Frame",
        3200,
        "Eyeglasses",
        ["Oval", "Square"],
        "/images/slim-metal-frame.jpg",
        true
    )
];

// GET /api/products
const getProducts = (req, res) => {
    res.json(products);
};

module.exports = {
    getProducts
};
