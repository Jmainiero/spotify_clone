import { ActionTypes } from "../constants/action-types";
const intialState = {
    currentSong: '',
    controls: false,
    playing: false

};

export const playerReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PLAYER:
            return { ...state, currentSong: payload };
        case ActionTypes.SET_PLAYING:
            return { ...state, playing: payload };
        default:
            return state;
    }
};