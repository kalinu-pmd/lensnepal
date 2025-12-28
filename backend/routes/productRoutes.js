import express from "express";
import upload from "../config/upload.js";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productControllers.js";

const router = express.Router();

// ADMIN
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

// USER
router.get("/", getProducts);
router.get("/:id", getProductById); // ✅ IMPORTANT

export default router;
