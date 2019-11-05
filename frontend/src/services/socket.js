import io from "socket.io-client";

import {
  RESPONSE_CONNECT,
  RESPONSE_DISCONNECT,
  RESPONSE_CONNECT_USER,
  RESPONSE_ONLINE_USERS,
  RESPONSE_SERVER_MESSAGE
} from "../actions/session";

const socket = io.connect(`${process.env.PUBLIC_URL}`, {
  secure: true,
  rejectUnauthorized: false,
  path: "/users/socket.io"
});

export const openConnection = (listener, user) => {
  socket.emit(RESPONSE_CONNECT_USER, user);

  const onlineUsersListener = res => {
    listener(RESPONSE_ONLINE_USERS, { onlineUsers: res, user });
  };

  const serverMessage = res => {
    listener(RESPONSE_SERVER_MESSAGE, res);
  };

  const disconnectListener = res => {
    console.log("Disconnected from WS");
    console.log("res", res);
  };

  socket.on(RESPONSE_DISCONNECT, disconnectListener);
  socket.on(RESPONSE_ONLINE_USERS, onlineUsersListener);
  socket.on(RESPONSE_SERVER_MESSAGE, serverMessage);

  return () => {
    socket.emit(RESPONSE_DISCONNECT);
  };
};
