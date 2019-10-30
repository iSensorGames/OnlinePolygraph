import {
  SESSION_SERVER_MESSAGE,
  SESSION_ONLINE,
  SESSION_AUTH_SIGNIN,
  SESSION_AUTH_SIGNUP,
  SESSION_AUTH_VERIFY,
  SESSION_LOCATION
} from "../actions/session";

const INITIAL_STATE = {
  session: null,
  location: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        ...state,
        session: action.payload
      };
    case SESSION_LOCATION:
      return {
        ...state,
        location: action.payload
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

export const getPreviousLocation = state => {
  return select(state).location;
};

export const getToken = state => {
  return select(state).token;
};

export default reducer;
