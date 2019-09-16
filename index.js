const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const morgan = require("morgan");

/**
 * Global Variables
 */
const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";
const PORT = process.env.PORT || 5000;
// index.js
global.appRoot = path.resolve(__dirname);

/**
 * Initial Express App Setup
 */
const app = express();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));
// Firebase Setup
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://online-polygraph.firebaseio.com"
});
const db = admin.firestore();
// Middleware
app.use(morgan(environment === "development" ? "dev" : ""));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes Setup
require("./routes")({ app, db });

// Server
app.listen(PORT, () => {
  console.log("Server listening to Port: " + PORT);
});
