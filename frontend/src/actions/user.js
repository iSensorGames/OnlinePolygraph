export const USER_SIGNIN_SUCCESS = "user/USER_SIGNIN_SUCCESS";
export const USER_SUBSCRIBE = "users/USER_SUBSCRIBE";
export const USER_UNSUBSCRIBE = "users/USER_UNSUBSCRIBE";
export const USER_CONNECTED = "users/USER_CONNECTED";
export const USER_DATA = "users/USER_DATA";

// Socket Response
export const RESPONSE_DATA = "Data";
export const RESPONSE_USERS = "UsersConnected";

export const saveUser = user => {
  return dispatch => {
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: user
        ? {
            ...user,
            firstName: user.first_name ? user.first_name : user.firstName,
            lastName: user.last_name ? user.last_name : user.lastName
          }
        : null
    });
  };
};

export const subscribeUser = () => {
  return (dispatch, getState, { socket }) => {
    dispatch({ type: USER_SUBSCRIBE });

    const unsubscribe = socket.subscribeUser((type, data) => {
      switch (type) {
        case RESPONSE_DATA:
          return dispatch({
            type: USER_DATA,
            payload: data
          });
        case RESPONSE_USERS:
          return dispatch({
            type: USER_CONNECTED,
            payload: data
          });
      }
    });

    return () => {
      dispatch({ type: USER_UNSUBSCRIBE });
      unsubscribe();
    };
  };
};
