import {
  USER_SIGNIN_SUCCESS,
  USER_SUBSCRIBE,
  USER_UNSUBSCRIBE,
  USER_DATA,
  USER_CONNECTED
} from "../actions/user";

const INITIAL_STATE = {
  user: {
    email: "",
    first_name: "",
    last_name: ""
  },
  data: {},
  isSubscribed: false,
  connectedUsersCount: 0
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case USER_SUBSCRIBE:
      return {
        ...state,
        isSubscribed: true
      };
    case USER_UNSUBSCRIBE:
      return {
        ...state,
        isSubscribed: false
      };
    case USER_DATA:
      return {
        ...state,
        data: action.payload
      };
    case USER_CONNECTED:
      console.log("USER_CONNECTED", action.payload);
      return {
        ...state,
        connectedUsersCount: action.payload
      };
    default:
      return state;
  }
};

function select(state) {
  return state.user;
}

export const getUser = state => {
  return select(state);
};

export const getData = state => {
  return select(state).data;
};

export const getIsSubscribed = state => {
  return select(state).isSubscribed;
};

export const getConnectedUsersCount = state => {
  return select(state).connectedUsersCount;
};

export default reducer;
