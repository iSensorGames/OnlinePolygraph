import { combineReducers } from "redux";
import {
  USERS_FETCH_REQUEST,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAILURE
} from "../actions/users";

const INITIAL_USERS_STATE = {
  isFetching: false,
  users: null,
  errorMessage: null
};

const usersReducer = (state = INITIAL_USERS_STATE, action) => {
  switch (action.type) {
    case USERS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload
      };
    case USERS_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  usersReducer
});

const select = state => state.users;
const getUsersReducer = state => select(state).usersReducer;

export const getUsers = state => {
  return getUsersReducer(state).users;
};

export const getIsFetching = state => {
  return getUsersReducer(state).isFetching;
};

export const getErrorMessage = state => {
  return getErrorMessage(state).errorMessage;
};
