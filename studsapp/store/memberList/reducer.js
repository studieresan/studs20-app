import {
    MEMBER_REQUEST,
    MEMBER_SUCCESS,
    MEMBER_ERROR
} from './constants';

import { status } from 'studsapp/store/constants';

const defaultState = {
    status: status.INITIAL
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case MEMBER_REQUEST:
            return {
                status: status.LOADING
            };
        case MEMBER_SUCCESS:
            return {
                status: status.SUCCESS,
                data: action.payload
            };
        case MEMBER_ERROR:
            return {
                status: status.ERROR,
                error: action.payload
            }
        default:
            return state;
    }
};

export default reducer;