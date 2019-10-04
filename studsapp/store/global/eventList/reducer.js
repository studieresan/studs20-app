import {
    FETCH_EVENTS_REQUEST,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_ERROR
} from './constants';

import { status } from 'studsapp/store/constants';

const defaultState = {
    status: status.INITIAL
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_EVENTS_REQUEST:
            return {
                status: status.LOADING
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                status: status.SUCCESS,
                data: action.payload
            };
        case FETCH_EVENTS_ERROR:
            return {
                status: status.ERROR,
                error: action.payload
            }
        default:
            return state;
    }
};

export default reducer;