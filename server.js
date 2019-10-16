const express = require("express");
const https = require("https");
const app = express();
const socket = require("socket.io");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const dotenv = require("dotenv");

/**************************
 * SETUP GLOBAL VARIABLES *
 **************************/
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;
let socketCount = 0;
global.appRoot = path.resolve(__dirname);

/*****************************
 * INITIAL EXPRESS APP SETUP *
 *****************************/
if (isProduction) {
  // Load Environment Variables from .env
  dotenv.config();

  app.use(express.static(path.join(__dirname, "frontend/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(morgan(isProduction ? "" : "dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/********************
 *** SERVER SETUP ***
 ********************/
const httpsOptions = {
  key: fs.readFileSync(
    isProduction ? "./security/ssl.key" : "./security/cert.key"
  ),
  cert: fs.readFileSync(
    isProduction ? "./security/ssl.cert" : "./security/cert.pem"
  )
};

const server = https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log("Server listening to Port: " + PORT);
});

/**************************************
 * SOCKET & DATABASE CONNECTION SETUP *
 **************************************/
const io = socket(server, {
  path: "/users/socket.io",
  log: false,
  origin: "*:*"
});

const db = require("./services/database");
db.connect(err => {
  if (err) {
    console.log("Err: ", err);
    throw new Error("Could not connect to the Database");
  }

  // ROUTES
  require("./routes")({ app, db });
});

io.on("connection", socket => {
  console.log("Client connected...");

  socketCount++; // Socket has connected, increase socket count

  socket.on("subscribe", data => {
    console.log("subscribe", data);
    socket.emit("UsersConnected", socketCount);
    socket.emit("Data", {
      data,
      success: true
    });
  });

  socket.on("disconnect", () => {
    socketCount--;
    socket.emit("UsersConnected", socketCount);
  });
});
