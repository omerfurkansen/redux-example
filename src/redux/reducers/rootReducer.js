import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import catReducer from "./catReducer";

export default combineReducers({
  counter: counterReducer,
  cat: catReducer
})