const express = require("express");
const router = express();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const cloudinary = require("cloudinary").v2;
const fileUploader = require("../config/cloudinary.config");

//render profile page
router.get("/profile", isAuthenticated, (req, res) => {
  // Access user information
  const userId = req.payload._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Server error" });
    });
});

//  GET /api/orders -  Retrieves all of the orders
// open question: how do we save order data?

// Edit user profile
router.get("/profile/user/edit/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  User.findById(id).then((foundUser) => {
    if (foundUser) {
      const sentUser = foundUser._doc;
      delete sentUser.password;
      res.status(200).json(sentUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

router.put(
  "/profile/user/edit/:id",
  isAuthenticated,
  fileUploader.single("avatar"),
  (req, res) => {
    // Get the user's ID from the authenticated token
    const { id } = req.params;

    // Extract updated user profile data from the request body
    const { name, email, avatar } = req.body;
    const body = { name, email };

    console.log(req.file);
    if (req.file) {
      body.avatar = req.file.path;
    }

    // Find the user by their ID and update their profile data
    User.findByIdAndUpdate(id, body, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user profile: ", error);
        res.status(500).json({ message: "Server error" });
      });
  }
);

module.exports = router;
