import {
  SET_LOGIN_LOGOUT,
  SET_MOTIVE_QUOTE,
  SET_NOTIFY_MESSAGE,
  SYSTEM_NAME,
  SET_SENSOR_DATA,
} from "../ActionType/systemType";

const initialState = {
  systemName: "",
  isLogin: false,
  notifyMessage: "",
  motiveQuote: "",
  doorStatus: false,
  fireStatus: false,
  lightValue: 0,
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
    case SET_SENSOR_DATA:
      if (
        state.doorStatus !== action.payload.doorStatus ||
        state.fireStatus !== action.payload.fireStatus ||
        state.lightValue !== action.payload.lightValue
      ) {
        return {
          ...state,
          doorStatus:action.payload.doorStatus,
          fireStatus:action.payload.fireStatus,
          lightValue:action.payload.lightValue,
        };
      }
      break;
    default:
      return state;
  }
};

export default systemReducer;
