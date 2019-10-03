export const USER_SIGNIN_SUCCESS = "user/USER_SIGNIN_SUCCESS";

export const saveUser = user => {
  return dispatch => {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
  };
};
