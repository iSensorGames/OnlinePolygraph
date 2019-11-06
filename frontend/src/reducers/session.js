import { combineReducers } from "redux";
import {
  SESSION_SOCKET_SERVER_MESSAGE,
  SESSION_SOCKET_ONLINE_USERS,
  SESSION_SOCKET_CONNECT_REQUEST,
  SESSION_SOCKET_CONNECT_SUCCESS,
  SESSION_SOCKET_CONNECT_FAILURE,
  SESSION_SOCKET_DISCONNECT,
  SESSION_AUTH_SIGNIN_REQUEST,
  SESSION_AUTH_SIGNIN_SUCCESS,
  SESSION_AUTH_SIGNIN_FAILURE,
  SESSION_AUTH_VERIFY_REQUEST,
  SESSION_AUTH_VERIFY_SUCCESS,
  SESSION_AUTH_VERIFY_FAILURE,
  SESSION_AUTH_SIGNOUT,
  SESSION_LOCATION
} from "../actions/session";

const INITIAL_SOCKET_STATE = {
  isConnecting: false,
  isConnected: false,
  onlineUsers: [],
  serverMessage: null
};

const INITIAL_SIGNIN_STATE = {
  isFetching: false,
  errorMessage: null,
  session: null,
  location: null
};

const socketResponse = (state = INITIAL_SOCKET_STATE, action) => {
  switch (action.type) {
    case SESSION_SOCKET_SERVER_MESSAGE: {
      return {
        ...state,
        serverMessage: action.payload
      };
    }
    case SESSION_SOCKET_ONLINE_USERS: {
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
    case SESSION_SOCKET_CONNECT_REQUEST: {
      return {
        ...state,
        isConnecting: true
      };
    }
    case SESSION_SOCKET_CONNECT_SUCCESS: {
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };
    }
    case SESSION_SOCKET_DISCONNECT:
    case SESSION_SOCKET_CONNECT_FAILURE:
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

const signIn = (state = INITIAL_SIGNIN_STATE, action) => {
  switch (action.type) {
    case SESSION_AUTH_VERIFY_REQUEST:
    case SESSION_AUTH_SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    case SESSION_AUTH_VERIFY_FAILURE:
    case SESSION_AUTH_SIGNIN_FAILURE:
      return {
        ...state,
        session: null,
        isFetching: false,
        errorMessage: action.payload
      };
    case SESSION_AUTH_VERIFY_SUCCESS:
      return {
        ...state,
        session: {
          ...state.session,
          user: {
            firstName: action.payload.first_name,
            lastName: action.payload.last_name,
            ...action.payload
          }
        },
        isFetching: false,
        errorMessage: null
      };
    case SESSION_AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        session: action.payload,
        isFetching: false,
        errorMessage: null
      };
    case SESSION_AUTH_SIGNOUT:
      return {
        ...state,
        session: null
      };
    case SESSION_LOCATION: {
      return {
        ...state,
        location: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  socketResponse,
  signIn
});

const select = state => state.session;
const getSocketResponse = state => select(state).socketResponse;
const getSignIn = state => select(state).signIn;

export const getIsFetching = state => {
  return getSignIn(state).isFetching;
};

export const getErrorMessage = state => {
  return getSignIn(state).errorMessage;
};

export const getSession = state => {
  const session = getSignIn(state).session;
  return session;
};

export const getUser = state => {
  const session = getSession(state);

  if (!session) {
    return null;
  }

  return session.user;
};

export const getUserId = state => {
  const user = getUser(state);

  if (!user) {
    return null;
  }

  return user.id;
};

export const getPreviousLocation = state => {
  const location = getSignIn(state).location;
  return location;
};

export const getToken = state => {
  const session = getSession(state);

  if (!session) {
    return null;
  }

  return session.token;
};

export const getOnlineUsers = state => {
  return getSocketResponse(state).onlineUsers;
};

export const getIsConnecting = state => {
  return getSocketResponse(state).isConnecting;
};

export const getIsConnected = state => {
  return getSocketResponse(state).isConnected;
};
