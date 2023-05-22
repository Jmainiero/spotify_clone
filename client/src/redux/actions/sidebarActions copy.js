import { ActionTypes } from "../constants/action-types";

export const setPlaylists = (playlists) => {
  return {
    type: ActionTypes.SET_PLAYLISTS,
    payload: playlists,
  };
};

export const selectedPlaylist = (playlist) => {
  return {
    type: ActionTypes.SELECT_PLAYLIST,
    payload: playlist,
  };
};
