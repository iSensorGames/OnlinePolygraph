const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./services/database");

/**************************
 * SETUP GLOBAL VARIABLES *
 **************************/
const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";
const PORT = process.env.PORT || 5000;
const socketCount = 0;
global.appRoot = path.resolve(__dirname);

/*****************************
 * INITIAL EXPRESS APP SETUP *
 *****************************/
const app = express();
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(morgan(environment === "development" ? "dev" : ""));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**************************************
 * SOCKET & DATABASE CONNECTION SETUP *
 **************************************/
// io.sockets.on("connection", socket => {
//   socketCount++; // Socket has connected, increase socket count
//   io.socket.emit("users connected", socketCount);

//   socket.on("disconnect", () => {
//     socketCount--;
//     io.sockets.emit("users connected", socketCount);
//   });

//   socket.on("initial_messages", ["aaa", "bbb", "ccc", "ddd"]);

db.connect(err => {
  if (err) {
    console.log("Err: ", err);
    throw new Error("Could not connect to the Database");
  }

  // ROUTES
  require("./routes")({ app, db });

  // SERVER
  app.listen(PORT, () => {
    console.log("Server listening to Port: " + PORT);
  });
});
// });
