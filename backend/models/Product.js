import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    description: {
      type: String,
      default: ""
    },

    eyewearType: {
      type: String,
      required: true
    },

    suitableFaceShapes: {
      type: [String],
      default: []
    },

    image: {
      type: String
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
