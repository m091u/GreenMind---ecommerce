const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); //handles password encryption
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const saltRounds = 10;

// const cors = require("cors");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const cookieSession = require("cookie-session");

// ------------POST /auth/signup: Create a new User in DB----------
router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Email & password are required!" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address!" });
    return;
  }
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have atleast 6 characters and contain atleast one number, one lowercase and one uppercase letter",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "This email already exists!" });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return User.create({ email, password: hashedPassword });
    })
    .then((createdUser) => {
      const { email, _id } = createdUser;
      const user = { email, _id }; //new object to not expose the password
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

// ------------POST /auth/login ----------

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Both email & password are required!" });
    return;
  }
  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email } = foundUser;
        // Create an object that will be set as the token payload (store the user data without pw)
        const payload = { _id, email };
        // Create a JSON Web Token and sign it
        // jwt.sign() method: jwt.sign(payload, secretKey, options)
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Please give the right password!" });
      }
    })
    .catch((err) => next(err));
});

// GET  /auth/verify  -  Used to verify JWT stored on the "client"

router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid, the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);
  console.log("verify route is working!");
  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

// ============================================================================ 

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     function (accessToken, refreshToken, profile, callback) {
//       callback(null, profile);
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // ------------GET /google login ----------
// app.use(
//   cookieSession({
//       name: "session",
//       keys: ["mnmecommerce"], //
//       maxAge: 24 * 60 * 60 * 100,  // Corrected value: 24 hours in milliseconds
//   })
// );

// //used to initialise passport
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
//   cors({
//       origin: "http://localhost:5173",
//       methods: "GET,POST,PUT,DELETE",
//       credentials: true, 
//   })
// )

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       error: false,
//       message: "Successfully logged in",
//       user: req.user,
//     });
//   } else {
//     res.status(403).json({
//       error: true,
//       message: "Not Authorized",
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: "Login failure",
//   });
// });

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });

module.exports = router;
