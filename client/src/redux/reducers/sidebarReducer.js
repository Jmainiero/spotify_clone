import { ActionTypes } from "../constants/action-types";
const intialState = {
  sidebar: [],
};

export const sidebarReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PLAYLISTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};