import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import Product from "./models/Product.js"; 
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 ADD TEST ROUTE HERE (BEFORE app.listen)
app.get("/test-insert", async (req, res) => {
  const product = await Product.create({
    name: "Test Glass",
    price: 999,
    eyewearType: "sunglasses",
    suitableFaceShapes: ["round", "oval"]
  });

  res.json(product);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Eyewear backend running");
});
app.use("/api/cart", cartRoutes);





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.post("/api/auth/test", (req, res) => {
  res.json({ message: "AUTH ROUTES WORKING" });
});
