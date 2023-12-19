const express = require("express");
const passport = require("passport");
const router = express.Router();
// const cookieSession = require("cookie-session");
// const cors = require("cors");
// const session = require("express-session");
// const app = express();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failure",
  });
});

router.get("/", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;

