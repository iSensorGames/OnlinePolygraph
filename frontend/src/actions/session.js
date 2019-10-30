// Selectors
import * as sessionSelectors from "../reducers/session";

export const SESSION_SERVER_MESSAGE = "session/SESSION_SERVER_MESSAGE";
export const SESSION_ONLINE = "session/SESSION_ONLINE";
export const SESSION_AUTH_SIGNIN = "session/SESSION_AUTH_SIGNIN";
export const SESSION_AUTH_SIGNUP = "session/SESSION_AUTH_SIGNUP";
export const SESSION_AUTH_SIGNOUT = "session/SESSION_AUTH_SIGNOUT";
export const SESSION_AUTH_VERIFY = "session/SESSION_AUTH_VERIFY";
export const SESSION_LOCATION = "session/SESSION_LOCATION";

// Socket Response
export const RESPONSE_CONNECT = "connect";
export const RESPONSE_DISCONNECT = "disconnect";
export const RESPONSE_JOIN_ROOM = "join_room";
export const RESPONSE_CONNECT_USER = "connect_user";
export const RESPONSE_USERS = "users";
export const RESPONSE_SERVER_MESSAGE = "server_message";

export const openConnection = () => {
  return async (dispatch, getState, { socket }) => {
    const state = getState();
    const userId = sessionSelectors.getUserId(state);
    const listener = (type, data) => {
      switch (type) {
        case RESPONSE_USERS:
          return dispatch({
            type: SESSION_ONLINE,
            payload: data
          });
        case RESPONSE_SERVER_MESSAGE:
          return dispatch({
            type: SESSION_SERVER_MESSAGE,
            payload: data
          });
      }
    };

    return socket.openConnection(listener, userId);
  };
};

export const signIn = (email, password) => {
  return async (dispatch, getState, { api, browser }) => {
    const response = await api.signIn(email, password);

    console.log("response signIn", response);

    const { token } = await response.json();

    browser.updateSession(token);

    await dispatch({
      type: SESSION_AUTH_SIGNIN,
      payload: response
    });
  };
};

export const signUp = user => {
  return async (dispatch, getState, { api, browser }) => {
    const response = await api.signUp(user);

    console.log("response signUp", response);

    const { token } = await response.json();
    browser.updateSession(token);

    await dispatch({
      type: SESSION_AUTH_SIGNIN,
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

export const verifyToken = () => {
  return async (dispatch, getState, { api, browser }) => {
    const token = browser.getSession();

    if (!token) {
      return {
        error: true
      };
    } else {
      const user = await api.verifyToken(token);

      console.log("verifyToken user", user);

      return dispatch({
        type: SESSION_AUTH_VERIFY,
        payload: user
      });
    }
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
