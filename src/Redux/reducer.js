import { combineReducers } from "redux";
import systemReducer from "./Reducer/systemReducer";

const rootReducer = combineReducers({
  systemReducer: systemReducer,
});

export default rootReducer;
