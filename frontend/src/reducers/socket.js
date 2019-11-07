import { combineReducers } from "redux";

import {
  SOCKET_ONLINE_USERS,
  SOCKET_SERVER_MESSAGE,
  SOCKET_DISCONNECT,
  SOCKET_CONNECT_REQUEST,
  SOCKET_CONNECT_SUCCESS,
  SOCKET_CONNECT_FAILURE
} from "../actions/socket";

const INITIAL_SOCKET_STATE = {
  isConnecting: false,
  isConnected: false,
  serverMessage: null,
  onlineUsers: []
};

const socket = (state = INITIAL_SOCKET_STATE, action) => {
  switch (action.type) {
    case SOCKET_ONLINE_USERS: {
      const { onlineUsers, user } = action.payload;

      if (onlineUsers.length !== state.onlineUsers.length) {
        return {
          ...state,
          onlineUsers: onlineUsers
            ? onlineUsers.filter(onlineUser => onlineUser.id !== user.id)
            : []
        };
      } else {
        return {
          ...state
        };
      }
    }
    case SOCKET_SERVER_MESSAGE: {
      return {
        ...state,
        serverMessage: action.payload
      };
    }
    case SOCKET_CONNECT_REQUEST: {
      return {
        ...state,
        isConnecting: true
      };
    }
    case SOCKET_CONNECT_SUCCESS: {
      console.log("SOCKET_CONNECT_SUCCESS");
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };
    }
    case SOCKET_DISCONNECT:
    case SOCKET_CONNECT_FAILURE:
      console.log("DISCONNECTED");
      return {
        ...state,
        isConnecting: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  socket
});

const select = state => state.socket;
const getSocketResponse = state => select(state).socket;

export const getOnlineUsers = state => {
  return getSocketResponse(state).onlineUsers;
};

export const getIsConnecting = state => {
  return getSocketResponse(state).isConnecting;
};

export const getIsConnected = state => {
  const socketResponse = getSocketResponse(state);
  return socketResponse.isConnected;
};
