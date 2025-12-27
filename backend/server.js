
import express, { json } from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(json());

app.get("/", (req, res) => {
    res.send("Backend with MongoDB Atlas running");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
