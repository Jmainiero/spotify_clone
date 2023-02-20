import { ActionTypes } from "../constants/action-types";
const intialState = {
  refreshTK: '',
  accessTK: '',
  authTK: '',
  expiration: ''
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_AUTH_TOKEN:
      return { ...state, authTK: payload };
    case ActionTypes.SET_REFRESH_TOKEN:
      return { ...state, refreshTK: payload };
    case ActionTypes.SET_ACCESS_TOKEN:
      return { ...state, accessTK: payload };
    case ActionTypes.SET_EXPIRATION:
      return { ...state, expiration: payload };
    default:
      return state;
  }
};