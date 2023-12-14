const router = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");

//Code without user authentication

router.get("/cart", (req, res) => {

  const { cart } = req.session;

  if (cart && cart.length > 0) {
    res.status(200).json(cart);
    console.log("These are the items in the cart", cart);
  } else {
    res.status(200).json({ message: "Your cart is empty." });
  }
});

router.post("/cart", (req, res)=> {
  const { productId, quantity } = req.body;
  const cart = req.session.cart || [];
  console.log("Request Body:", req.body);
  // Find the product in the cart
  const existingProductIndex = cart.findIndex(
    (item) => item.productId === productId
  );

  if (existingProductIndex !== -1) {
    // If product already exists, update the quantity
    cart[existingProductIndex].quantity = quantity;
  } else {
    // If product doesn't exist, add it to the cart
    cart.push({ productId, quantity });
  }

  req.session.cart = cart; // Update the session with the modified cart
  res.status(201).json(cart);
})

// PUT: Delete product from cart
router.put("/cart", (req, res) => {
  const { productId } = req.body;
  const cart = req.session.cart || [];

  // Remove the product from the cart
  const updatedCart = cart.filter((item) => item.productId !== productId);

  req.session.cart = updatedCart; // Update the session with the modified cart
  res.status(201).json(updatedCart);
});

// PATCH: Clear user's cart
router.patch("/cart", (req, res) => {
  req.session.cart = []; // Clear the cart in the session
  res.status(201).json([]);
});

// Code with User authentication
//Get user's cart
// router.get("/user/cart", (req, res) => {
//   const { _id } = req.payload;

//   User.findById({ _id })
//     .populate("cart.productId")
//     .then((user) => {
//       if (user.cart.length > 0) {
//         res.status(200).json(user.cart);
//       } else {
//         res.status(200).json({ message: "Your cart is empty." });
//       }
//     })
//     .catch((err) => res.json(err));
// });

// POST: to add / update cart
// router.post("/user/cart", (req, res) => {
//   const { _id } = req.payload;
//   const prodToAdd = {
//     productId: req.body.productId,
//     quantity: req.body.quantity,
//   };

//   let currentUser;

//   User.findById({ _id })
//     .then((foundUser) => {
//       currentUser = foundUser;

//       return Product.findById({ _id: prodToAdd.productId });
//     })
    // .then((product) => {
    //   if (!product) {
    //     return res.status(404).json("Product not found!");
    //   }

    //   if (currentUser.cart.length > 0) {
    //     const existingProduct = currentUser.cart.find(
    //       (item) => item.productId.toString() === prodToAdd.productId
    //     );

    //     if (existingProduct) {
    //       existingProduct.quantity = prodToAdd.quantity;
    //     } else {
    //       currentUser.cart.push(prodToAdd);
    //     }
//         return currentUser.save().then(() => {
//           res.status(201).json(currentUser.cart);
//         });
//       } else {
//         currentUser.cart.push(prodToAdd);
//         return currentUser.save().then(() => {
//           res.status(201).json(currentUser.cart);
//         });
//       }
//     })
//     .catch((err) => res.json(err));
// });

// PUT: Delete product from cart
// router.put("/user/cart", (req, res) => {
//   const { _id } = req.payload;
//   const prodToDelete = { productId: req.body.pdoductId };

//   let currentUser;

//   User.findById({ _id })
//     .then((foundUser) => {
//       currentUser = foundUser;
//       return Product.findOne({ _id: prodToDelete.productId });
//     })
//     .then((product) => {
//       if (!product) {
//         return res.status(404).json("Product not found in the user's cart");
//       }

//       const indexToDelete = currentUser.cart.findIndex(
//         (item) => item.productId.toString() === prodToDelete.productId
//       );
//       if (indexToDelete !== -1) {
//         currentUser.cart.splice(indexToDelete, 1);
//         return currentUser.save().then(() => {
//           res.status(201).json(currentUser.cart);
//         });
//       } else {
//         res.status(404).json("Product not found in the user's cart");
//         return;
//       }
//     })
//     .catch((err) => res.json(err));
// });

// router.patch("/user/cart", (req, res) => {
//   const { _id } = req.payload;

//   User.findById({ _id })
//     .then((foundUser) => {
//       foundUser.cart = [];
//       return foundUser.save().then(() => {
//         res.status(201).json(foundUser.cart);
//       });
//     })
//     .catch((err) => res.json(err));
// });

module.exports = router;
