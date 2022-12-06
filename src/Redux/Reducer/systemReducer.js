import {
  SET_LOGIN_LOGOUT,
  SET_MOTIVE_QUOTE,
  SET_NOTIFY_MESSAGE,
  SYSTEM_NAME,
} from "../ActionType/systemType";

const initialState = {
  systemName: "",
  isLogin: false,
  notifyMessage: "",
  motiveQuote: "",
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_NAME:
      return {
        ...state,
        systemName: action.payload,
      };
    case SET_LOGIN_LOGOUT:
      return {
        ...state,
        isLogin: action.payload,
      };
    case SET_NOTIFY_MESSAGE:
      return {
        ...state,
        notifyMessage: action.payload,
      };
    case SET_MOTIVE_QUOTE:
      return {
        ...state,
        motiveQuote: action.payload,
      };
    default:
      return state;
  }
};

export default systemReducer;
