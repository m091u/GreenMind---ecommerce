const express = require("express");
const router = express();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const cloudinary = require("cloudinary").v2;
const fileUploader = require("../config/cloudinary.config");

//render profile page
router.get("/profile", (req, res)=> {
    // Access user information
  const userId = req.payload._id;

  User.findById(userId)
  .then((user)=> {
    if (!user){
        return res.status(404).json({message:"User not found"});
    }
    res.json((user))
  })
  .catch((error)=>{
    console.error("Error fetching user details:", error);
    res.status(500).json({message:"Server error"});
  });
});

//  GET /api/orders -  Retrieves all of the orders
// open question: how do we save order data?

// Edit user profile

module.exports = router;