import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";
import coinReducer from "./coinReducer";

const reducerList = {
  default: defaultReducer,
  coin: coinReducer,
};

export type IReducerName = keyof typeof reducerList;

export default combineReducers(reducerList);
