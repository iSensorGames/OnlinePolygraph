import * as sessionSelectors from "../reducers/session";

export const CHAT_CREATEROOM_REQUEST = "chat/CHAT_CREATEROOM_REQUEST";
export const CHAT_CREATEROOM_SUCCESS = "chat/CHAT_CREATEROOM_SUCCESS";
export const CHAT_CREATEROOM_FAILURE = "chat/CHAT_CREATEROOM_FAILURE";
export const CHAT_SETUP_TAB = "chat/CHAT_SETUP_TAB";
export const CHAT_AVAILABLEROOM = "chat/CHAT_AVAILABLEROOM";

export const SOCKET_CREATE_ROOM = "create_room";
export const SOCKET_ROOM_AVAILABLE = "available_room";

export const createRoom = () => {
  return async (dispatch, getState, { api, socket }) => {
    const state = getState();
    const userId = sessionSelectors.getUserId(state);
    const token = sessionSelectors.getToken(state);

    dispatch({
      type: CHAT_CREATEROOM_REQUEST
    });

    const listener = (type, data) => {
      switch (type) {
        case SOCKET_ROOM_AVAILABLE:
          return dispatch({
            type: CHAT_AVAILABLEROOM,
            payload: data
          });
      }
    };

    try {
      // STORE ID
      const response = await api.createConversation(token, userId);
      if (!response.success) {
        throw new Error("Error creating a conversation");
      }

      // CREATE ROOM
      const { insertId } = response;
      socket
        .createRoom(listener, insertId)
        .then(() => {
          console.log("CHAT_CREATEROOM_SUCCESS success");
          dispatch({
            type: CHAT_CREATEROOM_SUCCESS,
            payload: insertId
          });
        })
        .catch(error => {
          console.log("CHAT_CREATEROOM_SUCCESS failure");
          dispatch({
            type: CHAT_CREATEROOM_FAILURE,
            payload: error.message
          });
        });
    } catch (error) {
      dispatch({
        type: CHAT_CREATEROOM_FAILURE,
        payload: error.message
      });
    }

    // socket
    //   .createRoom(listener)
    //   .then(() => {
    //     console.log("creating room");
    //     dispatch({
    //       type: CHAT_CREATEROOM_SUCCESS
    //     });
    //   })
    //   .catch(error => {
    //     console.log("error creting room", error.message);
    //     dispatch({
    //       type: CHAT_CREATEROOM_FAILURE,
    //       payload: error.message
    //     });
    //   });
  };
};
