import { combineReducers } from 'redux';
import {
  CHAT_CREATEROOM_REQUEST,
  CHAT_CREATEROOM_SUCCESS,
  CHAT_CREATEROOM_FAILURE,
  CHAT_SET_ROOM,
  CHAT_SET_ROOMID,
  CHAT_SETUP_TAB,
  CHAT_SET_GAMESETUPCOMPLETE,
  CHAT_AVAILABLEROOMS,
  CHAT_OPPONENT_JOIN,
  CHAT_PLAYER_LEAVE,
} from '../actions/chat';

const INITIAL_ROOM_STATE = {
  room: {
    id: null,
    creatorId: null,
    topic: null,
    name: 'Game 1',
    opponent: null,
    groundTruth: null,
    createdAt: null,
  },
  isCreating: false,
  serverMessage: null,
  errorMessage: null,
  chatSetupTab: 'intro',
  isGameSetupComplete: false,
  rooms: [],
};

const roomReducer = (state = INITIAL_ROOM_STATE, action) => {
  switch (action.type) {
    case CHAT_CREATEROOM_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case CHAT_CREATEROOM_SUCCESS:
      return {
        ...state,
        room: {
          ...state.room,
          id: action.payload,
        },
      };
    case CHAT_CREATEROOM_FAILURE:
      return {
        ...state,
        isCreating: false,
        errorMessage: action.payload,
      };
    case CHAT_SETUP_TAB:
      return {
        ...state,
        chatSetupTab: action.payload,
      };
    case CHAT_SET_ROOM:
      return {
        ...state,
        room: {
          ...state.room,
          ...action.payload,
        },
      };
    case CHAT_SET_GAMESETUPCOMPLETE:
      return {
        ...state,
        isGameSetupComplete: true,
      };
    case CHAT_AVAILABLEROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case CHAT_OPPONENT_JOIN:
      return {
        ...state,
        room: {
          ...state.room,
          opponent: action.payload,
        },
      };
    case CHAT_PLAYER_LEAVE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default combineReducers({
  roomReducer,
});

const select = state => state.chat;
const getRoomReducer = state => select(state).roomReducer;

export const getRoom = state => {
  return getRoomReducer(state).room;
};

export const getIsCreating = state => {
  return getRoomReducer(state).isCreating;
};

export const getServerMessage = state => {
  return getRoomReducer(state).serverMessage;
};

export const getErrorMessage = state => {
  return getRoomReducer(state).errorMessage;
};

export const getChatSetupTab = state => {
  return getRoomReducer(state).chatSetupTab;
};

export const getIsGameSetupComplete = state => {
  return getRoomReducer(state).isGameSetupComplete;
};

export const getAvailableRooms = state => {
  return getRoomReducer(state).rooms;
};
