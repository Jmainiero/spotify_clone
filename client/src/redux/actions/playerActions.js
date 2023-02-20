import { ActionTypes } from "../constants/action-types";

export const setPlayer = (song) => {
    return {
        type: ActionTypes.SET_PLAYER,
        payload: song,
    };
};