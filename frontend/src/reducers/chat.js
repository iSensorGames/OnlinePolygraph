import { combinedReduceres, combineReducers } from "redux";
import {
  CHAT_CREATEROOM_REQUEST,
  CHAT_CREATEROOM_SUCCESS,
  CHAT_CREATEROOM_FAILURE,
  CHAT_SETUP_TAB,
  CHAT_AVAILABLEROOM
} from "../actions/chat";

const INITIAL_ROOM_STATE = {
  roomId: null,
  createdAt: null,
  isCreating: false,
  serverMessage: null,
  errorMessage: null,
  chatSetupTab: "intro",
  topic: null
};

const room = (state = INITIAL_ROOM_STATE, action) => {
  switch (action.type) {
    case CHAT_CREATEROOM_REQUEST:
      return {
        ...state,
        isCreating: true
      };
    case CHAT_CREATEROOM_SUCCESS:
      return {
        ...state,
        isCreating: false,
        roomId: action.payload
      };
    case CHAT_CREATEROOM_FAILURE:
      return {
        ...state,
        isCreating: false,
        errorMessage: action.payload
      };
    case CHAT_SETUP_TAB:
      return {
        ...state,
        chatSetupTab: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  room
});

const select = state => state.chat;
const getRoom = state => select(state).room;

export const getRoomId = state => {
  const room = getRoom(state);
  console.log("room state", room);
  return room.roomId;
};

export const getIsCreating = state => {
  return getRoom(state).isCreating;
};

export const getServerMessage = state => {
  return getRoom(state).serverMessage;
};

export const getErrorMessage = state => {
  return getRoom(state).errorMessage;
};

export const getChatSetupTab = state => {
  return getRoom(state).chatSetupTab;
};
