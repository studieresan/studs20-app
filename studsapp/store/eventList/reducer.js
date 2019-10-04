import {
    EVENTS_REQUEST,
    EVENTS_SUCCESS,
    EVENTS_ERROR
} from './constants';

import { status } from 'studsapp/store/constants';

const defaultState = {
    status: status.INITIAL
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case EVENTS_REQUEST:
            return {
                status: status.LOADING
            };
        case EVENTS_SUCCESS:
            return {
                status: status.SUCCESS,
                data: action.payload
            };
        case EVENTS_ERROR:
            return {
                status: status.ERROR,
                error: action.payload
            }
        default:
            return state;
    }
};

export default reducer;