import { combineReducers } from "redux";
import {
  SESSION_AUTH_SIGNIN_REQUEST,
  SESSION_AUTH_SIGNIN_SUCCESS,
  SESSION_AUTH_SIGNIN_FAILURE,
  SESSION_AUTH_VERIFY_REQUEST,
  SESSION_AUTH_VERIFY_SUCCESS,
  SESSION_AUTH_VERIFY_FAILURE,
  SESSION_AUTH_SIGNOUT,
  SESSION_LOCATION
} from "../actions/session";

const INITIAL_SIGNIN_STATE = {
  isFetching: false,
  errorMessage: null,
  session: null,
  location: null
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
          token: action.payload.token,
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
  signIn
});

const select = state => state.session;
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
