import { ActionTypes } from "../constants/action-types";

export const setAuth = (code) => {
  return {
    type: ActionTypes.SET_AUTH,
    payload: code
  };
};
export const setRefresh = (code) => {
  return {
    type: ActionTypes.SET_REFRESH,
    payload: code
  };
};