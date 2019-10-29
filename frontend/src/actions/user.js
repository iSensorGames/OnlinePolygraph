export const USER_SIGNIN_SUCCESS = "user/USER_SIGNIN_SUCCESS";
export const USER_CONNECT = "users/USER_CONNECT";
export const USER_DISCONNECT = "users/USER_DISCONNECT";
export const USER_SERVER_MESSAGE = "users/USER_SERVER_MESSAGE";
export const USERS_ONLINE = "users/USERS_ONLINE";

// Socket Response
export const RESPONSE_CONNECT = "connect";
export const RESPONSE_DISCONNECT = "disconnect";
export const RESPONSE_JOIN_ROOM = "join_room";
export const RESPONSE_CONNECT_USER = "connect_user";
export const RESPONSE_USERS = "users";
export const RESPONSE_SERVER_MESSAGE = "server_message";

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

export const connectUser = () => {
  return (dispatch, getState, { socket }) => {
    dispatch({ type: USER_CONNECT });

    const user = getState().user;

    const disconnectUser = socket.connectUser((type, data) => {
      console.log("type", type);
      console.log("data", data);
      switch (type) {
        case RESPONSE_USERS:
          return dispatch({
            type: USERS_ONLINE,
            payload: data
          });
        case RESPONSE_SERVER_MESSAGE:
          return dispatch({
            type: USER_SERVER_MESSAGE,
            payload: data
          });
      }
    }, user);

    return () => {
      dispatch({ type: USER_DISCONNECT });
      disconnectUser();
    };
  };
};
