import { SYSTEM_NAME } from "../ActionType/systemType";

const initialState = {
  systemName: "",
};

const systemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_NAME:
      return {
        ...state,
        systemName: action.payload,
      };
    default:
      return state;
  }
};

export default systemReducer;
