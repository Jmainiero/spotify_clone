import { ActionTypes } from "../constants/action-types";

export const setRefreshToken = (code) => {
  return {
    type: ActionTypes.SET_REFRESH_TOKEN,
    payload: code
  };
};
export const setAccessToken = (code) => {
  return {
    type: ActionTypes.SET_ACCESS_TOKEN,
    payload: code
  };
};
export const setAuthToken = (code) => {
  return {
    type: ActionTypes.SET_AUTH_TOKEN,
    payload: code
  };
};
export const setExpiration = (code) => {
  return {
    type: ActionTypes.SET_EXPIRATION,
    payload: code
  };
};