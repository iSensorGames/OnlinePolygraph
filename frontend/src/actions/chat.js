import * as sessionSelectors from "../reducers/session";
import * as chatSelectors from "../reducers/chat";

export const CHAT_CREATEROOM_REQUEST = "chat/CHAT_CREATEROOM_REQUEST";
export const CHAT_CREATEROOM_SUCCESS = "chat/CHAT_CREATEROOM_SUCCESS";
export const CHAT_CREATEROOM_FAILURE = "chat/CHAT_CREATEROOM_FAILURE";
export const CHAT_JOIN_REQUEST = "chat/CHAT_JOIN_REQUEST";
export const CHAT_JOIN_SUCCESS = "chat/CHAT_JOIN_SUCCESS";
export const CHAT_JOIN_FAILURE = "chat/CHAT_JOIN_FAILURE";

export const CHAT_SET_ROOMID = "chat/CHAT_SET_ROOMID";
export const CHAT_SETUP_TAB = "chat/CHAT_SETUP_TAB";
export const CHAT_SET_TOPIC = "chat/CHAT_SET_TOPIC";
export const CHAT_SET_ROOMNAME = "chat/CHAT_SET_ROOMNAME";
export const CHAT_SET_GAMESETUPCOMPLETE = "chat/CHAT_SET_GAMESETUPCOMPLETE";
export const CHAT_SET_GROUNDTRUTH = "chat/CHAT_SET_GROUNDTRUTH";
export const CHAT_AVAILABLEROOMS = "chat/CHAT_AVAILABLEROOMS";
export const CHAT_OPPONENT_JOIN = "chat/CHAT_OPPONENT_JOIN";

export const createRoom = topic => {
  return (dispatch, getState, { api, socket }) => {
    return new Promise(async (resolve, reject) => {
      const state = getState();
      const userId = sessionSelectors.getUserId(state);
      const token = sessionSelectors.getToken(state);
      const name = chatSelectors.getRoomName(state);

      dispatch({
        type: CHAT_CREATEROOM_REQUEST
      });

      try {
        // STORE ID
        const response = await api.createConversation(token, {
          userId,
          topic,
          name
        });
        if (!response.success) {
          reject("Error creating a conversation");
        }

        // CREATE ROOM
        const { insertId } = response;
        socket
          .createRoom(insertId)
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

export const joinRoom = roomId => {
  return (dispatch, getState, { socket }) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: CHAT_JOIN_REQUEST
      });

      try {
        socket
          .joinRoom(roomId)
          .then(result => {
            console.log("socket.joinRoom result", result);
            dispatch({
              type: CHAT_JOIN_SUCCESS,
              payload: result
            });
            resolve(result);
          })
          .catch(error => {
            dispatch({
              type: CHAT_JOIN_FAILURE,
              payload: error.message
            });
            reject(error.message);
          });
      } catch (error) {
        dispatch({
          type: CHAT_JOIN_FAILURE,
          payload: error.message
        });
        reject(error.message);
      }
    });
  };
};

export const setRoomId = roomId => {
  return dispatch => {
    dispatch({
      type: CHAT_SET_ROOMID,
      payload: roomId
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

export const setGroundTruth = () => {
  return dispatch => {
    dispatch({
      type: CHAT_SET_GROUNDTRUTH
    });
  };
};
