import { USER_SIGNIN_SUCCESS } from "../actions/user";

const INITIAL_STATE = {
  email: "",
  first_name: "",
  last_name: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        ...action.payload
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

export default reducer;
