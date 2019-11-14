import {
  CHAT_AVAILABLEROOMS,
  CHAT_OPPONENT_JOIN,
  CHAT_PLAYER_LEAVE,
  CHAT_SET_GAME_SUCCESS,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SET_GAME_READYTOPLAYOPPONENT
} from "./chat";
import * as sessionSelectors from "../reducers/session";
import * as chatSelectors from "../reducers/chat";

export const SOCKET_ONLINE_USERS = "socket/SOCKET_ONLINE_USERS";
export const SOCKET_SERVER_MESSAGE = "socket/SOCKET_SERVER_MESSAGE";
export const SOCKET_DISCONNECT = "socket/SOCKET_DISCONNECT";
export const SOCKET_CONNECT_REQUEST = "socket/SOCKET_CONNECT_REQUEST";
export const SOCKET_CONNECT_SUCCESS = "socket/SOCKET_CONNECT_SUCCESS";
export const SOCKET_CONNECT_FAILURE = "socket/SOCKET_CONNECT_FAILURE";

// Socket Response
export const RESPONSE_SERVER_MESSAGE = "server_message";
export const RESPONSE_ONLINE_USERS = "online_users";
export const RESPONSE_DISCONNECT = "disconnect";
export const RESPONSE_LEAVE_ROOM = "leave_room";
export const RESPONSE_LEAVE_ROOM_PLAYER = "leave_room_player";
export const RESPONSE_JOIN_ROOM = "join_room";
export const RESPONSE_JOIN_ROOM_OPPONENT = "join_room_opponent";
export const RESPONSE_AVAILABLE_ROOMS = "available_rooms";
export const RESPONSE_CONNECT_USER = "connect_user";
export const RESPONSE_CREATE_ROOM = "create_room";

export const RESPONSE_GAME_UPDATE = "game_update";
export const RESPONSE_GAME_SET = "game_set";
export const RESPONSE_GAME_SET_READYTOPLAY = "game_set_readytoplay";
export const RESPONSE_GAME_START = "game_start";
export const RESPONSE_GAME_ROUNDEND = "game_round_end";
export const RESPONSE_GAME_SENDMESSAGE = "send_message";
export const RESPONSE_GAME_RECEIVEMESSAGE = "receive_message";

export const openConnection = () => {
  return async (dispatch, getState, { socket }) => {
    dispatch({
      type: SOCKET_CONNECT_REQUEST
    });

    const disconnect = () => {
      state = getState();
      const room = chatSelectors.getRoom(state);
      console.log("disconnect", room);
      socket.leaveRoom(room.id);
    };

    let state = getState();
    const user = sessionSelectors.getUser(state);

    if (!!!user) {
      return null;
    }

    const listener = (type, data) => {
      switch (type) {
        case RESPONSE_ONLINE_USERS:
          return dispatch({
            type: SOCKET_ONLINE_USERS,
            payload: data
          });
        case RESPONSE_SERVER_MESSAGE:
          return dispatch({
            type: SOCKET_SERVER_MESSAGE,
            payload: data
          });
        case RESPONSE_DISCONNECT:
          disconnect();
          return dispatch({
            type: SOCKET_DISCONNECT
          });
        case RESPONSE_AVAILABLE_ROOMS:
          return dispatch({
            type: CHAT_AVAILABLEROOMS,
            payload: data
          });
        case RESPONSE_JOIN_ROOM_OPPONENT:
          return dispatch({
            type: CHAT_OPPONENT_JOIN,
            payload: data
          });
        case RESPONSE_LEAVE_ROOM_PLAYER:
          return dispatch({
            type: CHAT_PLAYER_LEAVE,
            payload: data
          });
        case RESPONSE_GAME_UPDATE:
          let roleData = {};
          if ("creatorOuterRole" in data) {
            const room = chatSelectors.getRoom(getState());
            const isAuthor = room.creatorId === user.id;
            const {
              creatorInnerRole,
              opponentInnerRole,
              creatorOuterRole,
              opponentOuterRole
            } = data;
            roleData = {
              outerRole: isAuthor ? creatorOuterRole : opponentOuterRole,
              innerRole: isAuthor ? creatorInnerRole : opponentInnerRole
            };
          }
          return dispatch({
            type: CHAT_SET_GAME_SUCCESS,
            payload: {
              ...data,
              ...roleData
            }
          });
        case RESPONSE_GAME_SET_READYTOPLAY:
          return dispatch({
            type: CHAT_SET_GAME_READYTOPLAYOPPONENT
          });
        case RESPONSE_GAME_RECEIVEMESSAGE: {
          return dispatch({
            type: CHAT_SEND_MESSAGE_SUCCESS,
            payload: data
          });
        }
      }
    };

    socket
      .openConnection(listener, user)
      .then(() => {
        dispatch({
          type: SOCKET_CONNECT_SUCCESS
        });
      })
      .catch(err => {
        dispatch({
          type: SOCKET_CONNECT_FAILURE
        });
      });

    return () => {
      disconnect();
    };
  };
};
