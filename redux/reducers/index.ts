import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";

const reducerList = {
  default: defaultReducer,
};

export type IReducerName = keyof typeof reducerList;

export default combineReducers(reducerList);
