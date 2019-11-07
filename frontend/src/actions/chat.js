import * as sessionSelectors from "../reducers/session";

export const CHAT_CREATEROOM_REQUEST = "chat/CHAT_CREATEROOM_REQUEST";
export const CHAT_CREATEROOM_SUCCESS = "chat/CHAT_CREATEROOM_SUCCESS";
export const CHAT_CREATEROOM_FAILURE = "chat/CHAT_CREATEROOM_FAILURE";
export const CHAT_SETUP_TAB = "chat/CHAT_SETUP_TAB";
export const CHAT_SET_TOPIC = "chat/CHAT_SET_TOPIC";
export const CHAT_SET_ROOMNAME = "chat/CHAT_SET_ROOMNAME";
export const CHAT_SET_GAMESETUPCOMPLETE = "chat/CHAT_SET_GAMESETUPCOMPLETE";
export const CHAT_AVAILABLEROOM = "chat/CHAT_AVAILABLEROOM";

export const SOCKET_CREATE_ROOM = "create_room";
export const SOCKET_ROOM_AVAILABLE = "available_room";

export const createRoom = () => {
  return (dispatch, getState, { api, socket }) => {
    return new Promise(async (resolve, reject) => {
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
          reject("Error creating a conversation");
        }

        // CREATE ROOM
        const { insertId } = response;
        socket
          .createRoom(listener, insertId)
          .then(() => {
            dispatch({
              type: CHAT_CREATEROOM_SUCCESS,
              payload: insertId
            });
            resolve();
          })
          .catch(error => {
            dispatch({
              type: CHAT_CREATEROOM_FAILURE,
              payload: error.message
            });
            reject();
          });
      } catch (error) {
        dispatch({
          type: CHAT_CREATEROOM_FAILURE,
          payload: error.message
        });
        reject();
      }
    });
  };
};

export const setChatSetupTab = tab => {
  return dispatch => {
    dispatch({
      type: CHAT_SETUP_TAB,
      payload: tab
    });
  };
};

export const setTopic = topic => {
  return dispatch => {
    dispatch({
      type: CHAT_SET_TOPIC,
      payload: topic
    });
  };
};

export const setRoomName = roomName => {
  return dispatch => {
    dispatch({
      type: CHAT_SET_ROOMNAME,
      payload: roomName
    });
  };
};

export const setIsGameSetupComplete = () => {
  return dispatch => {
    dispatch({
      type: CHAT_SET_GAMESETUPCOMPLETE
    });
  };
};
