import {
  SESSION_INITIALIZE,
  SESSION_SERVER_MESSAGE,
  SESSION_ONLINE,
  SESSION_AUTH_SIGNIN,
  SESSION_AUTH_SIGNUP,
  SESSION_AUTH_VERIFY
} from "../actions/session";

const INITIAL_STATE = {
  isInitialized: false,
  session: null,
  isAuthenticating: false,
  token: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_INITIALIZE:
      return {
        ...state,
        isInitialized: true
      };
    case SESSION_SERVER_MESSAGE:
      return {
        ...state
      };
    case SESSION_ONLINE:
      return {
        ...state
      };
    case SESSION_AUTH_SIGNIN:
      return {
        ...state,
        token: action.payload
      };
    case SESSION_AUTH_SIGNUP:
      return {
        ...state
      };
    case SESSION_AUTH_VERIFY:
      return {
        ...state
      };
    default:
      return state;
  }
};

function select(state) {
  return state.session;
}

export const getSession = state => {
  return select(state).session;
};

export const getUser = state => {
  const session = getSession(state);

  if (!!!session) {
    return null;
  }

  return session.user;
};

export const getUserId = state => {
  const session = getSession(state);

  if (!!!session) {
    return null;
  }

  return session.user.id;
};

export const getToken = state => {
  return select(state).token;
};

export default reducer;
