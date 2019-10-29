import {
  USER_SIGNIN_SUCCESS,
  USER_CONNECT,
  USER_DISCONNECT,
  USER_SERVER_MESSAGE
} from "../actions/user";

const INITIAL_STATE = {
  user: null,
  serverMessage: null,
  isConnected: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case USER_CONNECT:
      return {
        ...state,
        isConnected: true
      };
    case USER_DISCONNECT:
      return {
        ...state,
        isConnected: false
      };
    case USER_SERVER_MESSAGE:
      return {
        ...state,
        serverMessage: action.payload
      };
    default:
      return state;
  }
};

function select(state) {
  return state.user;
}

export const getUser = state => {
  return select(state).user;
};

export const getServerMessage = state => {
  return select(state).serverMessage;
};

export const isConnected = state => {
  return select(state).isConnected;
};

export default reducer;
