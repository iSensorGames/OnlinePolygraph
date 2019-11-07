import { combineReducers } from "redux";
import {
  CHAT_CREATEROOM_REQUEST,
  CHAT_CREATEROOM_SUCCESS,
  CHAT_CREATEROOM_FAILURE,
  CHAT_SET_ROOMID,
  CHAT_SETUP_TAB,
  CHAT_SET_TOPIC,
  CHAT_SET_ROOMNAME,
  CHAT_SET_GAMESETUPCOMPLETE,
  CHAT_SET_GROUNDTRUTH,
  CHAT_AVAILABLEROOMS,
  CHAT_OPPONENT_JOIN
} from "../actions/chat";

const INITIAL_ROOM_STATE = {
  roomId: null,
  createdAt: null,
  isCreating: false,
  serverMessage: null,
  errorMessage: null,
  chatSetupTab: "intro",
  topic: null,
  roomName: "Game 1",
  isGameSetupComplete: false,
  groundTruth: null,
  rooms: [],
  opponent: null
};

const room = (state = INITIAL_ROOM_STATE, action) => {
  switch (action.type) {
    case CHAT_CREATEROOM_REQUEST:
      return {
        ...state,
        isCreating: true
      };
    case CHAT_SET_ROOMID:
    case CHAT_CREATEROOM_SUCCESS:
      return {
        ...state,
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
    case CHAT_SET_TOPIC:
      return {
        ...state,
        topic: action.payload
      };
    case CHAT_SET_ROOMNAME:
      return {
        ...state,
        roomName: action.payload
      };
    case CHAT_SET_GAMESETUPCOMPLETE:
      return {
        ...state,
        isGameSetupComplete: true
      };
    case CHAT_SET_GROUNDTRUTH:
      return {
        ...state,
        groundTruth: action.payload
      };
    case CHAT_AVAILABLEROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case CHAT_OPPONENT_JOIN:
      return {
        ...state,
        opponent: action.payload
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

export const getTopic = state => {
  return getRoom(state).topic;
};

export const getRoomName = state => {
  return getRoom(state).roomName;
};

export const getIsGameSetupComplete = state => {
  return getRoom(state).isGameSetupComplete;
};

export const getGroundTruth = state => {
  return getRoom(state).groundTruth;
};

export const getAvailableRooms = state => {
  return getRoom(state).rooms;
};

export const getOpponent = state => {
  return getRoom(state).opponent;
};
