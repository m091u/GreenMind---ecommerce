const router = require("express").Router();
const Product = require("../models/Product.model");

router.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;
  const cart = req.session.cart || [];

  Product.findById(productId)
    .then((productDetails) => {
      if (!productDetails) {
        return Promise.reject({ status: 404, message: "Product not found" });
      }

      const existingProductIndex = cart.findIndex(
        (item) => item.productId === productId
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = quantity;
      } else {
        cart.push({
          productId,
          quantity,
          name: productDetails.name,
          price: productDetails.price,
        });
      }

      req.session.cart = cart;
      res.status(201).json({
        cart: cart,
        productData: {
          name: productDetails.name,
          price: productDetails.price,
        },
      });
    })
    .catch((error) => {
      console.error("Error fetching product details:", error.message);
      const status = error.status || 500;
      res.status(status).json({ error: error.message });
    });
});

module.exports = router;

