import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { authReducer } from "./authReducer";
import { songReducer } from "./songReducer";
const reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  song: songReducer
});
export default reducers;