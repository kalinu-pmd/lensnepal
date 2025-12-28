import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("MONGO_URI USED BY BACKEND:");
    console.log(process.env.MONGO_URI); // 👈 VERY IMPORTANT

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
