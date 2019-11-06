import io from "socket.io-client";

import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_CONNECT_USER,
  SOCKET_ONLINE_USERS,
  SOCKET_SERVER_MESSAGE
} from "../actions/session";

import { SOCKET_CREATE_ROOM, SOCKET_ROOM_AVAILABLE } from "../actions/chat";

let socket = null;

export const openConnection = (listener, user) => {
  return new Promise((resolve, reject) => {
    try {
      socket = io.connect(`${process.env.PUBLIC_URL}`, {
        secure: true,
        rejectUnauthorized: false,
        path: "/users/socket.io"
      });

      socket.emit(SOCKET_CONNECT_USER, user);

      const onlineUsersListener = res => {
        listener(SOCKET_ONLINE_USERS, { onlineUsers: res, user });
      };

      const serverMessage = res => {
        listener(SOCKET_SERVER_MESSAGE, res);
      };

      const disconnectListener = res => {
        listener(SOCKET_DISCONNECT, res);
      };

      socket.on(SOCKET_DISCONNECT, disconnectListener);
      socket.on(SOCKET_ONLINE_USERS, onlineUsersListener);
      socket.on(SOCKET_SERVER_MESSAGE, serverMessage);

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};

export const createRoom = listener => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit(SOCKET_CREATE_ROOM);

      const availableRooms = res => {
        listener(SOCKET_ROOM_AVAILABLE, res);
      };

      socket.on(SOCKET_ROOM_AVAILABLE, availableRooms);

      resolve();
    } catch (error) {
      reject(error.message);
    }
  });
};
