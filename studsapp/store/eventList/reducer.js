import {
    EVENTS_REQUEST,
    EVENTS_SUCCESS,
    EVENTS_ERROR,
    EVENTS_UPDATE_REQUEST,
    EVENTS_UPDATE_SUCCESS
} from './constants';

import { status } from 'studsapp/store/constants';

const defaultState = {
    status: status.INITIAL,
    data: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case EVENTS_REQUEST:
            return {
                ...state,
                status: status.LOADING
            };
        case EVENTS_SUCCESS:
            return {
                ...state,
                status: status.SUCCESS,
                data: action.payload
            };
        case EVENTS_UPDATE_REQUEST:
            return {
                ...state,
                status: status.UPDATING
            };
        case EVENTS_UPDATE_SUCCESS:
            return {
                ...state,
                status: status.SUCCESS,
                data: {
                    ...state.data,
                    [action.payload.id]: {
                        ...state.data[action.payload.id],
                        ...action.payload,
                    },
                }
            };
        case EVENTS_ERROR:
            return {
                ...state,
                status: status.ERROR,
                error: action.payload
            }
        default:
            return state;
    }
};

export default reducer;