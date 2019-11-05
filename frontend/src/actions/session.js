// Selectors
import * as sessionSelectors from "../reducers/session";

export const SESSION_SERVER_MESSAGE = "session/SESSION_SERVER_MESSAGE";
export const SESSION_ONLINE_USERS = "session/SESSION_ONLINE_USERS";
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
export const RESPONSE_CONNECT = "connect";
export const RESPONSE_DISCONNECT = "disconnect";
export const RESPONSE_JOIN_ROOM = "join_room";
export const RESPONSE_CONNECT_USER = "connect_user";
export const RESPONSE_ONLINE_USERS = "online_users";
export const RESPONSE_SERVER_MESSAGE = "server_message";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const openConnection = () => {
  return async (dispatch, getState, { socket }) => {
    const state = getState();
    const user = sessionSelectors.getUser(state);

    if (!!!user) {
      return null;
    }

    const listener = (type, data) => {
      switch (type) {
        case RESPONSE_ONLINE_USERS:
          return dispatch({
            type: SESSION_ONLINE_USERS,
            payload: data
          });
        case RESPONSE_SERVER_MESSAGE:
          return dispatch({
            type: SESSION_SERVER_MESSAGE,
            payload: data
          });
      }
    };

    return socket.openConnection(listener, user);
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
    browser.updateSession(token);

    await dispatch({
      type: SESSION_AUTH_SIGNUP,
      payload: response
    });
  };
};

export const signOut = () => {
  return async (dispatch, getState, { browser }) => {
    browser.updateSession();

    await dispatch({
      type: SESSION_AUTH_SIGNOUT
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
