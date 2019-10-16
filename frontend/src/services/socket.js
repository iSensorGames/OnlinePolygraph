import io from "socket.io-client";

import { RESPONSE_DATA, RESPONSE_USERS } from "../actions/user";

export const subscribeUser = listener => {
  const socket = io.connect(`${process.env.PUBLIC_URL}`, {
    secure: true,
    rejectUnauthorized: false,
    path: "/users/socket.io"
  });

  const connectListener = () => {
    socket.emit("subscribe", { message: "From Frontend" });
  };

  const dataListener = res => {
    listener(RESPONSE_DATA, res);
  };

  const usersConnectedListener = res => {
    listener(RESPONSE_USERS, res);
  };

  const disconnectListener = res => {
    console.log("Disconnected from WS");
    console.log("res", res);
  };

  socket.on("connect", connectListener);
  socket.on("disconnect", disconnectListener);
  socket.on(RESPONSE_DATA, dataListener);
  socket.on(RESPONSE_USERS, usersConnectedListener);

  return () => {
    socket.emit("unsubscribe");
  };
};
