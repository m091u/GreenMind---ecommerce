// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const express = require("express");
const session = require('express-session');  //session for cart
const app = express(); 
const cors = require("cors")

app.use(cors());

//session for cart
app.use(
    session({
      secret: 'your-secret-key', // Replace with a strong and unique secret
      resave: false,
      saveUninitialized: false,
    })
  );


const { isAuthenticated } = require("./middleware/jwt.middleware");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//initialize Nodemailer
// const nodemailer = require("nodemailer");

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const productRoutes = require("./routes/product.routes");
app.use("/api", productRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/api", cartRoutes);

const googleAuthRouter = require("./routes/googleAuth.routes");
app.use("/auth/google", googleAuthRouter);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);

// const stripeRoutes = require("./routes/stripe.routes");
// app.use("/api", isAuthenticated, stripeRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;