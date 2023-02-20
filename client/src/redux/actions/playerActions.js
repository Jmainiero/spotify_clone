import { ActionTypes } from "../constants/action-types";

export const setPlayer = (song) => {
    return {
        type: ActionTypes.SET_PLAYER,
        payload: song,
    };
};
export const setPlaying = (state) => {
    return {
        type: ActionTypes.SET_PLAYING,
        payload: state,
    };
};