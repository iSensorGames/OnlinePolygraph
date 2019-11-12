import { combineReducers } from "redux";

// Reducers
import chat from "./chat";
import users from "./users";
import session from "./session";
import socket from "./socket";

export default combineReducers({
  chat,
  users,
  session,
  socket
});
