import * as sessionSelectors from '../reducers/session';
import * as chatSelectors from '../reducers/chat';

export const CHAT_CREATEROOM_REQUEST = 'chat/CHAT_CREATEROOM_REQUEST';
export const CHAT_CREATEROOM_SUCCESS = 'chat/CHAT_CREATEROOM_SUCCESS';
export const CHAT_CREATEROOM_FAILURE = 'chat/CHAT_CREATEROOM_FAILURE';
export const CHAT_JOIN_REQUEST = 'chat/CHAT_JOIN_REQUEST';
export const CHAT_JOIN_SUCCESS = 'chat/CHAT_JOIN_SUCCESS';
export const CHAT_JOIN_FAILURE = 'chat/CHAT_JOIN_FAILURE';

export const CHAT_SET_ROOM = 'chat/CHAT_SET_ROOM';
export const CHAT_SETUP_TAB = 'chat/CHAT_SETUP_TAB';
export const CHAT_SET_GAME_REQUEST = 'chat/CHAT_SET_GAME_REQUEST';
export const CHAT_SET_GAME_SUCCESS = 'chat/CHAT_SET_GAME_SUCCESS';
export const CHAT_SET_GAME_FAILURE = 'chat/CHAT_SET_GAME_FAILURE';

export const CHAT_AVAILABLEROOMS = 'chat/CHAT_AVAILABLEROOMS';
export const CHAT_OPPONENT_JOIN = 'chat/CHAT_OPPONENT_JOIN';
export const CHAT_PLAYER_LEAVE = 'chat/CHAT_PLAYER_LEAVE';

export const CHAT_SEND_MESSAGE_REQUEST = 'chat/CHAT_SEND_MESSAGE_REQUEST';
export const CHAT_SEND_MESSAGE_SUCCESS = 'chat/CHAT_SEND_MESSAGE_SUCCESS';

export const createRoom = topic => {
  return (dispatch, getState, { api, socket }) => {
    return new Promise(async (resolve, reject) => {
      const state = getState();
      const userId = sessionSelectors.getUserId(state);
      const token = sessionSelectors.getToken(state);
      const name = chatSelectors.getRoom(state).name;

      dispatch({
        type: CHAT_CREATEROOM_REQUEST,
      });

      try {
        // STORE ID
        const response = await api.createConversation(token, {
          userId,
          topic,
          name,
        });
        if (!response.success) {
          reject('Error creating a conversation');
        }

        // CREATE ROOM
        const { insertId } = response;
        socket
          .createRoom(insertId)
          .then(() => {
            dispatch({
              type: CHAT_CREATEROOM_SUCCESS,
              payload: {
                id: insertId,
                creatorId: userId,
              },
            });
            resolve(insertId);
          })
          .catch(error => {
            dispatch({
              type: CHAT_CREATEROOM_FAILURE,
              payload: error.message,
            });
            reject();
          });
      } catch (error) {
        dispatch({
          type: CHAT_CREATEROOM_FAILURE,
          payload: error.message,
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
        type: CHAT_JOIN_REQUEST,
      });

      try {
        socket
          .joinRoom(roomId)
          .then(result => {
            dispatch({
              type: CHAT_JOIN_SUCCESS,
              payload: result,
            });
            resolve(result);
          })
          .catch(error => {
            dispatch({
              type: CHAT_JOIN_FAILURE,
              payload: error.message,
            });
            reject(error.message);
          });
      } catch (error) {
        dispatch({
          type: CHAT_JOIN_FAILURE,
          payload: error.message,
        });
        reject(error.message);
      }
    });
  };
};

export const leaveRoom = roomId => {
  return (dispatch, getState, { socket }) => {
    return new Promise((resolve, reject) => {
      socket
        .leaveRoom(roomId)
        .then(result => {
          dispatch({
            type: CHAT_PLAYER_LEAVE,
            payload: result,
          });
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export const setRoom = room => {
  return dispatch => {
    dispatch({
      type: CHAT_SET_ROOM,
      payload: room,
    });
  };
};

export const startGame = detectorResponse => {
  return (dispatch, getState, { socket }) => {
    dispatch({
      type: CHAT_SET_GAME_REQUEST,
    });

    const state = getState();
    const room = chatSelectors.getRoom(state);

    socket.startGame(room.id, detectorResponse);
  };
};

export const setChatSetupTab = tab => {
  return dispatch => {
    dispatch({
      type: CHAT_SETUP_TAB,
      payload: tab,
    });
  };
};

export const setGame = params => {
  return (dispatch, getState, { socket }) => {
    dispatch({
      type: CHAT_SET_GAME_REQUEST,
    });

    const state = getState();
    const room = chatSelectors.getRoom(state);

    socket
      .setGame(room.id, params)
      .then(result => {
        dispatch({
          type: CHAT_SET_GAME_SUCCESS,
          payload: {
            ...result,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: CHAT_SET_GAME_FAILURE,
          payload: error.message,
        });
      });
  };
};

export const sendMessage = message => {
  return async (dispatch, getState, { socket }) => {
    await dispatch({
      type: CHAT_SEND_MESSAGE_REQUEST,
    });

    const state = await getState();
    const room = await chatSelectors.getRoom(state);
    const game = await chatSelectors.getGame(state);
    const user = await sessionSelectors.getUser(state);
    const data = {
      gameId: game.gameId,
      message,
    };

    await dispatch({
      type: CHAT_SEND_MESSAGE_SUCCESS,
      payload: {
        id: null,
        sender_id: user.id,
        game_id: game.gameId,
        message,
      },
    });

    await socket.sendMessage(room.id, data);
  };
};
