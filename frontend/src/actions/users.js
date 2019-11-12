import * as sessionSelectors from "../reducers/session";

export const USERS_FETCH_REQUEST = "users/USERS_FETCH_REQUEST";
export const USERS_FETCH_SUCCESS = "users/USERS_FETCH_SUCCESS";
export const USERS_FETCH_FAILURE = "users/USERS_FETCH_FAILURE";

export const getUsers = () => {
  return async (dispatch, getState, { api }) => {
    await dispatch({
      type: USERS_FETCH_REQUEST
    });

    const state = getState();
    const token = sessionSelectors.getToken(state);

    if (!token) {
      await dispatch({
        type: USERS_FETCH_FAILURE,
        payload: "Missing token"
      });
    } else {
      try {
        const response = await api.getUsers(token);

        console.log("getUsers actions response", response);

        await dispatch({
          type: USERS_FETCH_SUCCESS,
          payload: response
        });
      } catch (error) {
        console.log("getUsers actions error", error);
        await dispatch({
          type: USERS_FETCH_FAILURE,
          payload: error
        });
      }
    }
  };
};
