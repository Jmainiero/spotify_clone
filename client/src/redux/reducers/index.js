import { combineReducers } from "redux";
import { sidebarReducer } from "./sidebarReducer";
import { authReducer } from "./authReducer";
const reducers = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer
});
export default reducers;