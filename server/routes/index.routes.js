const express = require("express");

const router = express.Router();

// Create a middleware function to log request details
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call the next middleware in the stack
  };
  
  // Apply the middleware to your router
  router.use(logRequest);
  
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
