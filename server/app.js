// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const express = require("express");
const app = express();
const cookieSession = require("cookie-session"); //handles cookie usage
const passport = require("passport"); //used for authenticate different request
const cors = require("cors")


const { isAuthenticated } = require("./middleware/jwt.middleware");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//initialize Nodemailer
// const nodemailer = require("nodemailer");

// 👇 Start handling routes here
app.use(
    cookieSession({
        name: "session",
        keys: ["mnmecommerce"], //
        maxAge: 24 * 60 * 60 * 100,
    })
);

//used to initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true, 
    })
)

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

// const userRoutes = require("./routes/user.routes");
// app.use("/api", isAuthenticated, userRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/api", productRoutes);

// const cartRoutes = require("./routes/cart.routes");
// app.use("/api", isAuthenticated, cartRoutes);

// const stripeRoutes = require("./routes/stripe.routes");
// app.use("/api", isAuthenticated, stripeRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;