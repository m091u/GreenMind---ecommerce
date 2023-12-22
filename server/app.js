require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const session = require("express-session"); //session for cart
const app = express();

app.use(cors());

//session for google route
app.use(
  session({
    name: "session",
    keys: ["mtnmbecommerce"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
passportStrategy(passport)
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//session for cart
app.use(
  session({
    secret: "your-secret-key", // Replace with a strong and unique secret
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

const userRoutes = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRoutes);

// const stripeRoutes = require("./routes/stripe.routes");
// app.use("/api", isAuthenticated, stripeRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
