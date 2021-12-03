import { ActionTypes } from "../constants/action-types";

export const setSong = (song) => {
  return {
    type: ActionTypes.SET_SONG,
    payload: song,
  };
};
