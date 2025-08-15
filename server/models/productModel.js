import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: String,
    title: {
      type: String,
      required: true,
    },
    brand: String,
    description: String,
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: Number,
    totalStock: Number,
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
