import Product from "../models/Product.js";

// =======================
// ADMIN: Add product
// =======================
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      eyewearType,
      suitableFaceShapes,
      description,
      quantity
    } = req.body;

    if (!name || !price || !eyewearType || quantity === undefined) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const imagePath = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;

    const product = await Product.create({
      name,
      price,
      eyewearType,
      description,
      quantity,
      suitableFaceShapes: suitableFaceShapes
        ? suitableFaceShapes.split(",")
        : [],
      image: imagePath,
      available: true
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// USER: Get all products
// =======================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// USER: Get product by ID  ✅ FIX
// =======================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// ADMIN: Update product
// =======================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity
    };

    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// ADMIN: Delete product
// =======================
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
