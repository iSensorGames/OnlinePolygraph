const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

/**************************
 * SETUP GLOBAL VARIABLES *
 **************************/
const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";
const PORT = process.env.PORT || 5000;
global.appRoot = path.resolve(__dirname);

/*****************************
 * INITIAL EXPRESS APP SETUP *
 *****************************/
const app = express();
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(morgan(environment === "development" ? "dev" : ""));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*****************************
 * DATABASE CONNECTION SETUP *
 *****************************/
const db = require("./services/database");
db.connect(err => {
  if (err) {
    console.log("Err: ", err);
    throw new Error("Could not connect to the Database");
  }

  // ROUTES
  require("./routes")({ app, db });

  // Server
  app.listen(PORT, () => {
    console.log("Server listening to Port: " + PORT);
  });
});
