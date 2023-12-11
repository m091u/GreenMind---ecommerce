const router = require("express").Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Product = require("../models/Product.model");

// ADMIN ONLY
// POST /api/products  -  Creates a new product
// DELETE  /api/products/:productId  -  Deletes a specific product by id
// PUT  /api/product/:productId  -  Updates a specific product by id

// GET /api/products -  Retrieves all products
router.get("/products", (req, res) => {
  Product.find()
    .then((allProducts) => {
      res.status(200).json(allProducts);
    })
    .catch((err) => res.json(err));
});

//  GET /api/products/:productId -  Retrieves a specific products by id
router.get("/products/:productId", (req, res) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json("Product not found!");
      }

      res.status(200).json(product);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
