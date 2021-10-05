import { ActionTypes } from "../constants/action-types";
const intialState = {
  refreshTK: '',
  authTK: '',
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_AUTH:
      return { ...state, authTK: payload };
    case ActionTypes.SET_REFRESH:
      return { ...state, refreshTK: payload };
    default:
      return state;
  }
};