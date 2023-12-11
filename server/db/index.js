// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

<<<<<<< HEAD
const MONGO_URI =
  process.env.MONGODB_URI ||  
  // || "mongodb://127.0.0.1:27017/ecommerce-server";
=======
const MONGO_URI = process.env.ATLAS_URI || 'mongodb+srv://test_user:n0PgwB3ipaZWCYJh@cluster0.dmxynb3.mongodb.net/greenmind?retryWrites=true&w=majority'
  // || "mongodb://127.0.0.1:27017/ecommerce-server";
  // mongodb+srv://test_user:n0PgwB3ipaZWCYJh@cluster0.dmxynb3.mongodb.net/greenmind?retryWrites=true&w=majority
>>>>>>> e9e93eb1071ac3edde99290d5e1354d14e1e6379

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
