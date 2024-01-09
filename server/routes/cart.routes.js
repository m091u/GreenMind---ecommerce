const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//Code without user authentication

// router.get("/cart", (req, res) => {
//   const { cart } = req.session;
//   if (cart && cart.length > 0) {
//     res.status(200).json(cart);
//   } else {
//     res.status(200).json({ message: "Your cart is empty." });
//   }
// });

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
