const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

/**************************
 ** ENVIRONENT VARIABLES **
 **************************/
if (process.env.NODE_ENV === "production") require("dotenv").config();

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
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(morgan(environment === "development" ? "dev" : ""));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**************************************
 * SOCKET & DATABASE CONNECTION SETUP *
 **************************************/
const db = require("./services/database");
db.connect(err => {
  if (err) {
    console.log("Err: ", err);
    throw new Error("Could not connect to the Database");
  }

  // ROUTES
  require("./routes")({ app, db });
});

io.sockets.on("connection", socket => {
  console.log("Client connected...");
  socketCount++; // Socket has connected, increase socket count
  io.socket.emit("users connected", socketCount);

  socket.on("join", data => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    socketCount--;
    io.sockets.emit("users connected", socketCount);
  });

  socket.on("initial_messages", ["aaa", "bbb", "ccc", "ddd"]);
});

// SERVER
server.listen(PORT, () => {
  console.log("Server listening to Port: " + PORT);
});
