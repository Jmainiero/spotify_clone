import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { authReducer } from "./authReducer";
import { playerReducer } from "./playerReducer";
const reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  player: playerReducer
});
export default reducers;