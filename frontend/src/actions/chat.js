import * as sessionSelectors from "../reducers/session";

export const CHAT_CREATEROOM_REQUEST = "chat/CHAT_CREATEROOM_REQUEST";
export const CHAT_CREATEROOM_SUCCESS = "chat/CHAT_CREATEROOM_SUCCESS";
export const CHAT_CREATEROOM_FAILURE = "chat/CHAT_CREATEROOM_FAILURE";
export const CHAT_AVAILABLEROOM = "chat/CHAT_AVAILABLEROOM";

export const SOCKET_CREATE_ROOM = "create_room";
export const SOCKET_ROOM_AVAILABLE = "available_room";

export const createRoom = () => {
  return async (dispatch, getState, { api, browser }) => {
    const state = getState();
    console.log("createRoom state", state);
    const token = sessionSelectors.getToken(state);

    console.log("createRoom token", token);

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
      const response = await api.createConversation(token);
      console.log("createConversation response", response);
    } catch (error) {
      console.log("createConversatin error", error);
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
