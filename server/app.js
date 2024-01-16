require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const cookieSession = require("cookie-session");
const session = require("express-session"); 
const app = express();

app.use(cors());

//session for cart
app.use(
  session({
    secret: "your-secret-key", 
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

const stripeRoutes = require("./routes/stripe.routes");
app.use("/api", stripeRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
