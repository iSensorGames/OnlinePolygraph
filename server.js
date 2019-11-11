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

const createGame = (
  roomId,
  gameRound,
  creatorOuterRole,
  opponentOuterRole,
  creatorInnerRole,
  opponentInnerRole
) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO games (conversation_id, game_round, role_outer_creator, role_outer_opponent, role_inner_creator, role_inner_opponent, created_at) VALUES (${roomId}, ${gameRound}, ${creatorOuterRole}, ${opponentOuterRole}, ${creatorInnerRole}, ${opponentInnerRole},  NOW())`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

const updateDetectorResponse = (roomId, gameRound, detectorResponse) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE games SET detector_response = '${detectorResponse}' WHERE conversation_id = ${roomId} AND game_round = ${gameRound}`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

const updateGroundTruth = (roomId, gameRound, groundTruth) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE games SET ground_truth = '${groundTruth}' WHERE conversation_id = ${roomId} AND game_round = ${gameRound}`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

const getLastGame = roomId => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, conversation_id, game_round, created_at FROM games WHERE conversation_id = ${roomId} AND game_round = (SELECT max(game_round) FROM games WHERE conversation_id = ${roomId})`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

const getGameRoles = roomId => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT role_inner_creator, role_inner_opponent FROM games where conversation_id = ${roomId}
    `;

    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

io.on('connection', socket => {
  console.log('CONNECTED');
  console.log('socket', socket);
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

  socket.on('disconnect', res => {
    const { user } = socket;

    console.log('---------------------------');
    console.log(user);
    console.log('disconnected from the server. ' + res);

    emitOnlineUsers();
    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
      socket.broadcast.emit('available_rooms', result);
    });
  });

  socket.on('create_room', roomId => {
    socket.join(roomId);
    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
      socket.broadcast.emit('available_rooms', result);
    });
  });

  socket.on('join_room', roomId => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('join_room_opponent', socket.user);
    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
      socket.broadcast.emit('available_rooms', result);
    });
  });

  socket.on('leave_room', roomId => {
    console.log('leave_room', roomId);
    socket.leave(roomId);

    socket.broadcast.to(roomId).emit('leave_room_player', socket.user);

    getAvailableRooms().then(result => {
      socket.emit('available_rooms', result);
      socket.broadcast.emit('available_rooms', result);
    });
  });

  socket.on('game_set', ({ roomId, params }) => {
    const data = {
      ...params,
    };

    const { gameRound, groundTruth } = params;
    updateGroundTruth(roomId, gameRound, groundTruth).then(result => {
      console.log('updateGroundTruth', result);
      io.to(roomId).emit('game_update', data);
      socket.broadcast.to(roomId).emit('game_update', data);
    });
  });

  socket.on('game_start', ({ roomId, detectorResponse }) => {
    getLastGame(roomId).then(result => {
      // Start a new game if there's none
      if (result.length === 0) {
        const initialGameRound = 1;
        const creatorOuterRole = utils.randomize(2);
        const opponentOuterRole = creatorOuterRole === 1 ? 2 : 1;

        const creatorInnerRole =
          creatorOuterRole === 1 ? 1 : utils.randomize(2) === 1 ? 2 : 3;
        const opponentInnerRole =
          creatorInnerRole === 1 ? (utils.randomize(2) === 1 ? 2 : 3) : 1;

        createGame(
          roomId,
          initialGameRound,
          creatorOuterRole,
          opponentOuterRole,
          creatorInnerRole,
          opponentInnerRole
        ).then(({ insertId }) => {
          const data = {
            gameId: insertId,
            isStarted: true,
            tab: 'ground-truth',
            gameRound: initialGameRound,
            creatorOuterRole,
            opponentOuterRole,
            creatorInnerRole,
            opponentInnerRole,
          };
          io.in(roomId).emit('game_update', data);
        });
      } else {
        const { game_round } = result[0];

        updateDetectorResponse(roomId, game_round, detectorResponse).then(
          result => {
            const newGameRound = game_round + 1;

            if (game_round >= 2) {
              getGameRoles(roomId).then(results => {
                let allCreatorInnerRoles = results.map(
                  item => item.role_inner_creator
                );
                console.log('allCreatorInnerRoles', allCreatorInnerRoles);
              });
            } else {
              let creatorOuterRole = utils.randomize(2);
              let opponentOuterRole = creatorOuterRole === 1 ? 2 : 1;

              let creatorInnerRole =
                creatorOuterRole === 1 ? 1 : utils.randomize(2) === 1 ? 2 : 3;
              let opponentInnerRole =
                creatorInnerRole === 1 ? (utils.randomize(2) === 1 ? 2 : 3) : 1;

              createGame(
                roomId,
                newGameRound,
                creatorOuterRole,
                opponentOuterRole,
                creatorInnerRole,
                opponentInnerRole
              ).then(({ insertId }) => {
                const data = {
                  gameId: insertId,
                  isStarted: true,
                  tab: 'ground-truth',
                  gameRound: newGameRound,
                  creatorOuterRole,
                  opponentOuterRole,
                  creatorInnerRole,
                  opponentInnerRole,
                };
                io.in(roomId).emit('game_update', data);
              });
            }
          }
        );
      }
    });
  });

  socket.on('send_message', ({ roomId, params }) => {
    const { gameId, message } = params;
    const sender_id = socket.user.id;
    const query = `INSERT INTO messages (game_id, sender_id, message, created_at) VALUES (${gameId}, ${sender_id}, "${message}", NOW())`;

    console.log('SEND_MESSAGE query', query);
    db.query(query, (err, results) => {
      if (err) {
        throw new Error(err);
      }

      const { insertId } = results;

      console.log('SEND_MESSAGE results', results);

      socket.broadcast.to(roomId).emit('receive_message', {
        id: insertId,
        game_id: gameId,
        sender_id,
        message,
      });
    });
  });

  socket.on('typing', ({ room }) => {
    socket.to(room).emit('typing', 'typing...');
  });

  socket.on('stopped_typing', ({ room }) => {
    socket.to(room).emit('stopped_typing');
  });
});
