import { ActionTypes } from "../constants/action-types";
const intialState = {
    tracks: [],
};

export const trackReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_TRACKS:
            return { ...state, tracks: payload };
        default:
            return state;
    }
};