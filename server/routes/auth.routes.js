const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt"); //handles password encryption
const jwt = require("jsonwebtoken")

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
  if (!passwordRegex.text(password)) {
    res.status(400).json({
      message:
        "Password must have atleast 6 characters and contain atleast one number, one lowercase and one uppercase letter",
    });
    return;
  }

  User.findOne({ email }).then((foundUser) => {
    if(foundUser){
        res.status(400).json({message: "This email already exists!"});
        return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return User.create({email, password: hashedPassword})
  })
  .then((createdUser) => {
    const{email, _id} = createdUser;
    const user = { email, _id}; //new object to not expose the password
    res.status(201).json({user: user});
    })
    .catch((err) => next(err));
});

// ------------POST /auth/Login ----------

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
  
  module.exports = router;