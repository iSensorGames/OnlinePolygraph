import { combineReducers } from "redux";

// Reducers
import session from "./session";
import chat from "./chat";
import socket from "./socket";

export default combineReducers({
  session,
  chat,
  socket
});
