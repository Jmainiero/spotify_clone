import { ActionTypes } from "../constants/action-types";

export const setTracks = (tracks) => {
  return {
    type: ActionTypes.SET_TRACKS,
    payload: tracks,
  };
};