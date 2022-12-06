import {
  SET_LOGIN_LOGOUT,
  SET_MOTIVE_QUOTE,
  SET_NOTIFY_MESSAGE,
  SYSTEM_NAME,
} from "../ActionType/systemType";

export const setSystemName = (payload) => {
  return {
    type: SYSTEM_NAME,
    payload,
  };
};

export const isUserLoggedIn = (payload) => {
  return {
    type: SET_LOGIN_LOGOUT,
    payload,
  };
};

export const messageFromServer = (payload) => {
  return {
    type: SET_NOTIFY_MESSAGE,
    payload,
  };
};

export const setMotiveQuotes = (payload) => {
  return {
    type: SET_MOTIVE_QUOTE,
    payload,
  };
};
