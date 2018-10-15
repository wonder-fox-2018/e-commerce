const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"]
    },
    picture: {
      type: String
    },
    description: {
      type: String,
      required: [true, "product description is required"]
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "product category is required"]
    },
    stock: {
      type: Number,
      required: [true, "product stock is required and please input number"]
    },
    price: {
      type: Number,
      required: [true, "product price is required and please input number"]
    },
    market: { type: Schema.Types.ObjectId, ref: "Market" }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
