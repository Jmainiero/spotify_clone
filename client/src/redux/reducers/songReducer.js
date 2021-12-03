import { ActionTypes } from "../constants/action-types";
const intialState = {
  selectedSong: [],
};

export const songReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SONG:
      return { ...state, selectedSong: payload };
    default:
      return state;
  }
};
