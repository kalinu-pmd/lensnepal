const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/productController");

// GET all products
router.get("/", getProducts);

export default router;
