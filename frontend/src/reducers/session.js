import {
  SESSION_SERVER_MESSAGE,
  SESSION_ONLINE,
  SESSION_AUTH_SIGNIN_REQUEST,
  SESSION_AUTH_SIGNIN_SUCCESS,
  SESSION_AUTH_SIGNIN_FAILURE,
  SESSION_AUTH_SIGNUP,
  SESSION_AUTH_VERIFY,
  SESSION_LOCATION
} from "../actions/session";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: null,
  session: null,
  location: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SESSION_AUTH_SIGNIN_REQUEST: {
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    }
    case SESSION_AUTH_SIGNIN_FAILURE: {
      return {
        ...state,
        session: null,
        isFetching: false,
        errorMessage: action.payload
      };
    }
    case SESSION_AUTH_SIGNIN_SUCCESS: {
      return {
        ...state,
        session: action.payload,
        isFetching: false,
        errorMessage: null
      };
    }
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

function select(state) {
  return state.session;
}

export const getIsFetching = state => {
  return select(state).isFetching;
};

export const getErrorMessage = state => {
  return select(state).errorMessage;
};

export const getSession = state => {
  const session = select(state).session;
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

  return user.id;
};

export const getPreviousLocation = state => {
  const location = select(state).location;
  return location;
};

export const getToken = state => {
  const token = getSession(state).token;
  return token;
};

export default reducer;
