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
const isTest = process.env.NODE_ENV === "test";
const PORT = process.env.PORT || 5000;
global.appRoot = path.resolve(__dirname);

/*****************************
 * INITIAL EXPRESS APP SETUP *
 *****************************/
if (isProduction || isTest) {
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

const website = "Real or Spiel Game";
const getOnlineUsers = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s.user);
  return users.filter(u => u != undefined);
};

io.on("connection", socket => {
  console.log("Client connected...");

  const emitOnlineUsers = () => {
    socket.broadcast.emit("users", getOnlineUsers());
  };

  socket.on("join_room", room => {
    socket.join(room);
  });

  socket.on("connect_user", user => {
    socket.emit("server_message", {
      name: website,
      message: `Welcome to the ${website}`
    });

    socket.broadcast.emit("server_message", {
      name: website,
      message: `${user.name} joined the Game`
    });

    socket.user = user;
    emitOnlineUsers();
  });

  socket.on("disconnect", () => {
    const { user } = socket;

    if (user) {
      socket.broadcast.emit("server_message", {
        name: website,
        message: `${user.name} left Game`
      });
    }

    emitOnlineUsers();
  });

  socket.on("message", ({ message, room }) => {
    socket.to(room).emit("message", {
      message,
      name: "Friend"
    });
  });

  socket.on("typing", ({ room }) => {
    socket.to(room).emit("typing", "typing...");
  });

  socket.on("stopped_typing", ({ room }) => {
    socket.to(room).emit("stopped_typing");
  });
});
