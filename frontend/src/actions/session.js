// Selectors
import * as sessionSelectors from "../reducers/session";

export const SESSION_SOCKET_SERVER_MESSAGE =
  "session/SESSION_SOCKET_SERVER_MESSAGE";
export const SESSION_SOCKET_ONLINE_USERS =
  "session/SESSION_SOCKET_ONLINE_USERS";
export const SESSION_SOCKET_CONNECT_REQUEST =
  "session/SESSION_SOCKET_CONNECT_REQUEST";
export const SESSION_SOCKET_CONNECT_SUCCESS =
  "session/SESSION_SOCKET_CONNECT_SUCCESS";
export const SESSION_SOCKET_CONNECT_FAILURE =
  "session/SESSION_SOCKET_CONNECT_FAILURE";
export const SESSION_SOCKET_DISCONNECT = "session/SESSION_SOCKET_DISCONNECT";

export const SESSION_AUTH_SIGNIN_REQUEST =
  "session/SESSION_AUTH_SIGNIN_REQUEST";
export const SESSION_AUTH_SIGNIN_SUCCESS =
  "session/SESSION_AUTH_SIGNIN_SUCCESS";
export const SESSION_AUTH_SIGNIN_FAILURE =
  "session/SESSION_AUTH_SIGNIN_FAILURE";

export const SESSION_AUTH_VERIFY_REQUEST =
  "session/SESSION_AUTH_VERIFY_REQUEST";
export const SESSION_AUTH_VERIFY_SUCCESS =
  "session/SESSION_AUTH_VERIFY_SUCCESS";
export const SESSION_AUTH_VERIFY_FAILURE =
  "session/SESSION_AUTH_VERIFY_FAILURE";

export const SESSION_AUTH_SIGNUP = "session/SESSION_AUTH_SIGNUP";
export const SESSION_AUTH_SIGNOUT = "session/SESSION_AUTH_SIGNOUT";
export const SESSION_LOCATION = "session/SESSION_LOCATION";

// Socket Response
export const SOCKET_CONNECT = "connect";
export const SOCKET_DISCONNECT = "disconnect";
export const SOCKET_JOIN_ROOM = "join_room";
export const SOCKET_CONNECT_USER = "connect_user";
export const SOCKET_ONLINE_USERS = "online_users";
export const SOCKET_SERVER_MESSAGE = "server_message";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const openConnection = () => {
  return async (dispatch, getState, { socket }) => {
    dispatch({
      type: SESSION_SOCKET_CONNECT_REQUEST
    });

    const state = getState();
    const user = sessionSelectors.getUser(state);

    if (!!!user) {
      return null;
    }

    const listener = (type, data) => {
      switch (type) {
        case SOCKET_ONLINE_USERS:
          return dispatch({
            type: SESSION_SOCKET_ONLINE_USERS,
            payload: data
          });
        case SOCKET_SERVER_MESSAGE:
          return dispatch({
            type: SESSION_SOCKET_SERVER_MESSAGE,
            payload: data
          });
        case SOCKET_DISCONNECT:
          return dispatch({
            type: SESSION_SOCKET_DISCONNECT
          });
      }
    };

    socket
      .openConnection(listener, user)
      .then(() => {
        dispatch({
          type: SESSION_SOCKET_CONNECT_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
          type: SESSION_SOCKET_CONNECT_FAILURE
        });
      });
  };
};

export const signIn = (email, password) => {
  return async (dispatch, getState, { api, browser }) => {
    return delay(300).then(() => {
      dispatch({
        type: SESSION_AUTH_SIGNIN_REQUEST
      });

      return api.signIn(email, password).then(
        response => {
          const { token } = response;

          browser.updateSession(token);
          const session = browser.getSession();

          dispatch({
            type: SESSION_AUTH_SIGNIN_SUCCESS,
            payload: {
              ...session
            }
          });
        },
        error => {
          dispatch({
            type: SESSION_AUTH_SIGNIN_FAILURE,
            payload: error.message || "Something went wrong"
          });
        }
      );
    });
  };
};

export const signUp = user => {
  return async (dispatch, getState, { api, browser }) => {
    const response = await api.signUp(user);
    const { token } = await response.json();

    await browser.updateSession(token);
    await dispatch({
      type: SESSION_AUTH_SIGNUP,
      payload: response
    });
  };
};

export const signOut = () => {
  return (dispatch, getState, { browser }) => {
    return new Promise((resolve, reject) => {
      browser.updateSession();
      dispatch({
        type: SESSION_AUTH_SIGNOUT
      });
      resolve();
    });
  };
};

/**
 * @description Verify token validity
 *              Used for seamless and maintaned login status
 * @since 2019-10-31
 */
export const verifyToken = () => {
  return async (dispatch, getState, { api, browser }) => {
    dispatch({
      type: SESSION_AUTH_VERIFY_REQUEST
    });

    const token = browser.getToken();
    return api.verifyToken(token).then(
      response => {
        const { data } = response;

        dispatch({
          type: SESSION_AUTH_VERIFY_SUCCESS,
          payload: data
        });
      },
      error => {
        dispatch({
          type: SESSION_AUTH_VERIFY_FAILURE,
          payload: error.message
        });
        throw new Error(error.message);
      }
    );
  };
};

export const updateLocation = newLocation => {
  return async dispatch => {
    return await dispatch({
      type: SESSION_LOCATION,
      payload: newLocation
    });
  };
};
