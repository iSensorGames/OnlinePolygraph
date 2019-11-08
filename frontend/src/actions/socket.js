import {
  CHAT_AVAILABLEROOMS,
  CHAT_OPPONENT_JOIN,
  CHAT_PLAYER_LEAVE,
  CHAT_SET_GAME_UPDATE,
} from './chat';
import * as sessionSelectors from '../reducers/session';
import * as chatSelectors from '../reducers/chat';

export const SOCKET_ONLINE_USERS = 'socket/SOCKET_ONLINE_USERS';
export const SOCKET_SERVER_MESSAGE = 'socket/SOCKET_SERVER_MESSAGE';
export const SOCKET_DISCONNECT = 'socket/SOCKET_DISCONNECT';
export const SOCKET_CONNECT_REQUEST = 'socket/SOCKET_CONNECT_REQUEST';
export const SOCKET_CONNECT_SUCCESS = 'socket/SOCKET_CONNECT_SUCCESS';
export const SOCKET_CONNECT_FAILURE = 'socket/SOCKET_CONNECT_FAILURE';

// Socket Response
export const RESPONSE_SERVER_MESSAGE = 'server_message';
export const RESPONSE_ONLINE_USERS = 'online_users';
export const RESPONSE_DISCONNECT = 'disconnect';
export const RESPONSE_LEAVE_ROOM = 'leave_room';
export const RESPONSE_LEAVE_ROOM_PLAYER = 'leave_room_player';
export const RESPONSE_JOIN_ROOM = 'join_room';
export const RESPONSE_JOIN_ROOM_OPPONENT = 'join_room_opponent';
export const RESPONSE_AVAILABLE_ROOMS = 'available_rooms';
export const RESPONSE_CONNECT_USER = 'connect_user';
export const RESPONSE_CREATE_ROOM = 'create_room';

export const RESPONSE_GAME_START = 'game_start';
export const RESPONSE_GAME_UPDATE = 'game_update';

export const openConnection = () => {
  return async (dispatch, getState, { socket }) => {
    dispatch({
      type: SOCKET_CONNECT_REQUEST,
    });

    const state = getState();
    const user = sessionSelectors.getUser(state);
    const room = chatSelectors.getRoom(state);

    if (!!!user) {
      return null;
    }

    const listener = (type, data) => {
      switch (type) {
        case RESPONSE_ONLINE_USERS:
          return dispatch({
            type: SOCKET_ONLINE_USERS,
            payload: data,
          });
        case RESPONSE_SERVER_MESSAGE:
          return dispatch({
            type: SOCKET_SERVER_MESSAGE,
            payload: data,
          });
        case RESPONSE_DISCONNECT:
          return dispatch({
            type: SOCKET_DISCONNECT,
          });
        case RESPONSE_AVAILABLE_ROOMS:
          return dispatch({
            type: CHAT_AVAILABLEROOMS,
            payload: data,
          });
        case RESPONSE_JOIN_ROOM_OPPONENT:
          return dispatch({
            type: CHAT_OPPONENT_JOIN,
            payload: data,
          });
        case RESPONSE_LEAVE_ROOM_PLAYER:
          return dispatch({
            type: CHAT_PLAYER_LEAVE,
            payload: data,
          });
        case RESPONSE_GAME_UPDATE:
          console.log('room', room);
          console.log('user', user);
          console.log('RESPONSE_GAME_UPDATE data', data);
          const {
            game_round,
            creatorInnerRole,
            creatorOuterRole,
            opponentInnerRole,
            opponentOuterRole,
          } = data;
          return dispatch({
            type: CHAT_SET_GAME_UPDATE,
            payload: {
              isStarted: true,
              gameRound: game_round,
              creatorInnerRole,
              opponentInnerRole,
              creatorOuterRole,
              opponentOuterRole,
              user,
            },
          });
      }
    };

    socket
      .openConnection(listener, user)
      .then(() => {
        dispatch({
          type: SOCKET_CONNECT_SUCCESS,
        });
      })
      .catch(err => {
        dispatch({
          type: SOCKET_CONNECT_FAILURE,
        });
      });

    return () => {
      const room = chatSelectors.getRoom(state);
      socket.leaveRoom(room.id);
    };
  };
};
