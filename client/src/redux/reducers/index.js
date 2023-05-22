import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { authReducer } from "./authReducer";
import { playerReducer } from "./playerReducer";
import { trackReducer } from "./trackReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  player: playerReducer,
  tracks: trackReducer,
  user: userReducer
});
export default reducers;