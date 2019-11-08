const express = require('express');
const https = require('https');
const app = express();
const socket = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const dotenv = require('dotenv');
const utils = require('./utils');

/**************************
 * SETUP GLOBAL VARIABLES *
 **************************/
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const PORT = process.env.PORT || 5000;
global.appRoot = path.resolve(__dirname);

/*****************************
 * INITIAL EXPRESS APP SETUP *
 *****************************/
if (isProduction || isTest) {
  // Load Environment Variables from .env
  dotenv.config();

  app.use(express.static(path.join(__dirname, 'frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use(morgan(isProduction ? '' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/********************
 *** SERVER SETUP ***
 ********************/
const httpsOptions = {
  key: fs.readFileSync(
    isProduction ? './security/ssl.key' : './security/cert.key'
  ),
  cert: fs.readFileSync(
    isProduction ? './security/ssl.cert' : './security/cert.pem'
  ),
};

const server = https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log('Server listening to Port: ' + PORT);
});

/**************************************
 * SOCKET & DATABASE CONNECTION SETUP *
 **************************************/
const io = socket(server, {
  path: '/users/socket.io',
  log: false,
  origin: '*:*',
});

const db = require('./services/database');
db.connect(err => {
  if (err) {
    console.log('Err: ', err);
    throw new Error('Could not connect to the Database');
  }

  // ROUTES
  require('./routes')({ app, db });
});

const website = 'Real or Spiel Game';
const getOnlineUsers = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s.user);
  return users.filter(u => u != undefined);
};

const getAvailableRooms = () => {
  return new Promise((resolve, reject) => {
    console.log('==============================');
    console.log('io.sockets.adapter.rooms', io.sockets.adapter.rooms);
    const rooms = Object.keys(io.sockets.adapter.rooms);

    if (rooms.length > 0) {
      const roomsFormatted = rooms.map(value => {
        return "'" + value + "'";
      });

      const query = `SELECT id, creator_id, topic, name, created_at FROM conversations WHERE id IN (${roomsFormatted})`;
      db.query(query, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        const roomsObject = io.sockets.adapter.rooms;

        const roomsFormatted = results.map(room => {
          return {
            ...room,
            length: room.id in roomsObject ? roomsObject[room.id].length : 0,
          };
        });

        resolve(roomsFormatted);
      });
    } else {
      resolve([]);
    }
  });
};

io.on('connection', socket => {
  const emitOnlineUsers = () => {
    socket.broadcast.emit('online_users', getOnlineUsers());
  };

  socket.on('connect_user', user => {
    socket.emit('server_message', {
      name: website,
      message: `Welcome to the ${website}`,
    });

    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
    });

    socket.user = user;
    socket.emit('online_users', getOnlineUsers());
    emitOnlineUsers();
  });

  socket.on('disconnect', () => {
    const { user } = socket;

    if (user) {
      socket.broadcast.emit('server_message', {
        name: website,
        message: `${user.name} left Game`,
      });
    }

    emitOnlineUsers();
  });

  socket.on('create_room', roomId => {
    socket.join(roomId);

    console.log('creating ROOMID', roomId);

    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
      socket.broadcast.emit('available_rooms', result);
    });
  });

  socket.on('join_room', roomId => {
    socket.join(roomId);

    console.log('join_room');
    console.log('emitting to roomId', roomId);

    socket.broadcast.to(roomId).emit('join_room_opponent', socket.user);
  });

  socket.on('leave_room', roomId => {
    socket.leave(roomId);

    socket.broadcast.to(roomId).emit('leave_room_player', socket.user);

    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
      socket.broadcast.emit('available_rooms', result);
    });
  });

  socket.on('message', ({ message, room }) => {
    socket.to(room).emit('message', {
      message,
      name: 'Friend',
    });
  });

  socket.on('typing', ({ room }) => {
    socket.to(room).emit('typing', 'typing...');
  });

  socket.on('stopped_typing', ({ room }) => {
    socket.to(room).emit('stopped_typing');
  });
});
