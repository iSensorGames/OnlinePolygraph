import io from 'socket.io-client';

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
} from '../actions/socket';

let socket = null;

export const openConnection = (listener, user) => {
  return new Promise((resolve, reject) => {
    try {
      socket = io.connect(`${process.env.PUBLIC_URL}`, {
        secure: true,
        rejectUnauthorized: false,
        path: '/users/socket.io',
        forceNew: true,
        reconnection: false,
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
