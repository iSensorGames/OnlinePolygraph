// Utility functions
import * as utils from '../utils';

// Selectors
import * as sessionSelectors from '../reducers/session';

export const SESSION_AUTH_SIGNIN_REQUEST =
  'session/SESSION_AUTH_SIGNIN_REQUEST';
export const SESSION_AUTH_SIGNIN_SUCCESS =
  'session/SESSION_AUTH_SIGNIN_SUCCESS';
export const SESSION_AUTH_SIGNIN_FAILURE =
  'session/SESSION_AUTH_SIGNIN_FAILURE';

export const SESSION_AUTH_VERIFY_REQUEST =
  'session/SESSION_AUTH_VERIFY_REQUEST';
export const SESSION_AUTH_VERIFY_SUCCESS =
  'session/SESSION_AUTH_VERIFY_SUCCESS';
export const SESSION_AUTH_VERIFY_FAILURE =
  'session/SESSION_AUTH_VERIFY_FAILURE';

export const SESSION_AUTH_SIGNUP_REQUEST =
  'session/SESSION_AUTH_SIGNUP_REQUEST';
export const SESSION_AUTH_SIGNUP_SUCCESS =
  'session/SESSION_AUTH_SIGNUP_SUCCESS';
export const SESSION_AUTH_SIGNUP_FAILURE =
  'session/SESSION_AUTH_SIGNUP_FAILURE';

export const SESSION_AUTH_SIGNOUT = 'session/SESSION_AUTH_SIGNOUT';
export const SESSION_LOCATION = 'session/SESSION_LOCATION';

export const signIn = (email, password) => {
  return async (dispatch, getState, { api, browser }) => {
    return utils.delay(300).then(() => {
      dispatch({
        type: SESSION_AUTH_SIGNIN_REQUEST,
      });

      return api.signIn(email, password).then(
        response => {
          const { token } = response;

          browser.updateSession(token);
          const session = browser.getSession();

          dispatch({
            type: SESSION_AUTH_SIGNIN_SUCCESS,
            payload: {
              ...session,
            },
          });
        },
        error => {
          dispatch({
            type: SESSION_AUTH_SIGNIN_FAILURE,
            payload: error.message || 'Something went wrong',
          });
        }
      );
    });
  };
};

export const signUp = user => {
  return async (dispatch, getState, { api, browser }) => {
    return utils.delay(300).then(() => {
      dispatch({
        type: SESSION_AUTH_SIGNUP_REQUEST,
      });

      api
        .signUp(user)
        .then(response => {
          if ('error' in response) {
            dispatch({
              type: SESSION_AUTH_SIGNUP_FAILURE,
              payload: response.error,
            });
          } else {
            const { token } = response;
            browser.updateSession(token);
            dispatch({
              type: SESSION_AUTH_SIGNUP_SUCCESS,
              payload: {
                ...response,
              },
            });
          }
        })
        .catch(error => {
          dispatch({
            type: SESSION_AUTH_SIGNUP_FAILURE,
            payload: error.message || 'Something went wrong',
          });
        });
    });
  };
};

export const signOut = () => {
  return (dispatch, getState, { browser }) => {
    return new Promise((resolve, reject) => {
      browser.updateSession();
      dispatch({
        type: SESSION_AUTH_SIGNOUT,
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
      type: SESSION_AUTH_VERIFY_REQUEST,
    });

    const token = browser.getToken();
    return api.verifyToken(token).then(
      response => {
        const { data } = response;

        dispatch({
          type: SESSION_AUTH_VERIFY_SUCCESS,
          payload: data,
        });
      },
      error => {
        dispatch({
          type: SESSION_AUTH_VERIFY_FAILURE,
          payload: error.message,
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
      payload: newLocation,
    });
  };
};
