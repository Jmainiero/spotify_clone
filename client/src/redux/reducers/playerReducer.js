import { ActionTypes } from "../constants/action-types";
const intialState = {
    currentSong: '',
    controls: false,
    playing: false,
    device: { device: "No Device Selected", id: "" }

};

export const playerReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PLAYER:
            return { ...state, currentSong: payload };
        case ActionTypes.SET_PLAYING:
            return { ...state, playing: payload };
        case ActionTypes.SET_DEVICE:
            return { ...state, device: payload };
        default:
            return state;
    }
};