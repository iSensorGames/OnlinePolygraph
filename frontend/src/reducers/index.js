import { combineReducers } from "redux";

// Reducers
import session from "./session";
import chat from "./chat";

export default combineReducers({
  session,
  chat
});
