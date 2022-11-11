import { SYSTEM_NAME } from "../ActionType/systemType";

export const setSystemName = (payload) => {
  return {
    type: SYSTEM_NAME,
    payload,
  };
};
