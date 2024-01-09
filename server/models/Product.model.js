const { Schema, model } = require("mongoose");

// additional properties to be added based on the products chosen
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});

module.exports = model("Product", productSchema);
