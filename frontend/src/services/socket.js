import io from "socket.io-client";

import {
  RESPONSE_DISCONNECT,
  RESPONSE_CONNECT_USER,
  RESPONSE_ONLINE_USERS,
  RESPONSE_SERVER_MESSAGE,
  RESPONSE_CREATE_ROOM,
  RESPONSE_AVAILABLE_ROOMS,
  RESPONSE_JOIN_ROOM,
  RESPONSE_JOIN_ROOM_OPPONENT,
  RESPONSE_LEAVE_ROOM,
  RESPONSE_LEAVE_ROOM_PLAYER,
  RESPONSE_GAME_START,
  RESPONSE_GAME_UPDATE,
  RESPONSE_GAME_SET,
  RESPONSE_GAME_SET_READYTOPLAY,
  RESPONSE_GAME_ROUNDEND,
  RESPONSE_GAME_SENDMESSAGE,
  RESPONSE_GAME_RECEIVEMESSAGE
} from "../actions/socket";

let socket = null;

export const openConnection = (listener, user) => {
  return new Promise((resolve, reject) => {
    try {
      socket = io.connect(`/`, {
        secure: true,
        rejectUnauthorized: false,
        path: `/users/socket.io`,
        forceNew: true,
        reconnection: false
      });

      socket.emit(RESPONSE_CONNECT_USER, user);

      const onlineUsersListener = res => {
        listener(RESPONSE_ONLINE_USERS, { onlineUsers: res, user });
      };

      const availableRoomListener = res => {
        listener(RESPONSE_AVAILABLE_ROOMS, res);
      };

      const joinRoomByOpponent = res => {
        listener(RESPONSE_JOIN_ROOM_OPPONENT, res);
      };

      const leaveRoomByPlayer = res => {
        listener(RESPONSE_LEAVE_ROOM_PLAYER, res);
      };

      const gameUpdateListener = res => {
        listener(RESPONSE_GAME_UPDATE, res);
      };

      const gameSetReadyToPlay = () => {
        listener(RESPONSE_GAME_SET_READYTOPLAY);
      };

      const gameRoundEnd = res => {
        listener(RESPONSE_GAME_UPDATE, res);
      };

      const receiveMessageListener = res => {
        listener(RESPONSE_GAME_RECEIVEMESSAGE, res);
      };

      const serverMessage = res => {
        listener(RESPONSE_SERVER_MESSAGE, res);
      };

      const disconnectListener = res => {
        listener(RESPONSE_DISCONNECT, res);
      };

      socket.on(RESPONSE_ONLINE_USERS, onlineUsersListener);
      socket.on(RESPONSE_AVAILABLE_ROOMS, availableRoomListener);
      socket.on(RESPONSE_JOIN_ROOM_OPPONENT, joinRoomByOpponent);
      socket.on(RESPONSE_LEAVE_ROOM_PLAYER, leaveRoomByPlayer);
      socket.on(RESPONSE_GAME_UPDATE, gameUpdateListener);
      socket.on(RESPONSE_GAME_SET_READYTOPLAY, gameSetReadyToPlay);
      socket.on(RESPONSE_GAME_ROUNDEND, gameRoundEnd);
      socket.on(RESPONSE_GAME_RECEIVEMESSAGE, receiveMessageListener);
      socket.on(RESPONSE_SERVER_MESSAGE, serverMessage);
      socket.on(RESPONSE_DISCONNECT, disconnectListener);

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};

export const createRoom = roomId => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_CREATE_ROOM, roomId);
      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};

export const joinRoom = roomId => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_JOIN_ROOM, roomId);

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};

export const leaveRoom = roomId => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_LEAVE_ROOM, roomId);

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};

export const startGame = (roomId, detectorResponse) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_GAME_START, { roomId, detectorResponse });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const gameRoundEnd = (roomId, detectorResponse) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_GAME_ROUNDEND, { roomId, detectorResponse });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const setGame = (roomId, params) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_GAME_SET, { roomId, params });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const setGameReadyToPlay = roomId => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_GAME_SET_READYTOPLAY, { roomId });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const sendMessage = (roomId, params) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(RESPONSE_GAME_SENDMESSAGE, { roomId, params });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
