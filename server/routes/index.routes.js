const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Received request at /");
  res.json("All good in here");
});

module.exports = router;
