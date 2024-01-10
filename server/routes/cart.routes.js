const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");


router.post("/cart", (req, res)=> {
  const { productId, quantity } = req.body;
  const cart = req.session.cart || [];
  console.log("Request Body:", req.body);
  const existingProductIndex = cart.findIndex(
    (item) => item.productId === productId
  );
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity = quantity;
  } else {
    cart.push({ productId, quantity });
  }
  req.session.cart = cart; 
  res.status(201).json(cart);
})

module.exports = router;
