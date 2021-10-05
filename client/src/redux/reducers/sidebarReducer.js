import { ActionTypes } from "../constants/action-types";
const intialState = {
  sidebarPlaylists: [],
};

export const sidebarReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PLAYLISTS:
      return { ...state, sidebarPlaylists: payload };
    default:
      return state;
  }
};