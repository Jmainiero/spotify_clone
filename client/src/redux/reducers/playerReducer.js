import { ActionTypes } from "../constants/action-types";
const intialState = {
    currentSong: 'https://open.spotify.com/track/1wj5x7RQ84qfjbBNm0PmWw?si=34725e2058904f2d',
    controls: false,
    playing: false

};

export const playerReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_PLAYER:
            return { ...state, currentSong: payload };
        default:
            return state;
    }
};