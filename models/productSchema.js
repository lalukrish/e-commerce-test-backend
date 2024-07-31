const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  review: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: "true",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
