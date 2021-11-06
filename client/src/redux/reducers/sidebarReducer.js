import { ActionTypes } from "../constants/action-types";
const intialState = {
  sidebarPlaylists: [],
  selectedPlaylist: [],
};

export const sidebarReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PLAYLISTS:
      return { ...state, sidebarPlaylists: payload };
    case ActionTypes.SELECTED_PLAYLIST:
      return { ...state, selectedPlaylist: payload };
    default:
      return state;
  }
};
