import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from './constants'; 

import { status } from 'studsapp/store/constants';

const defaultState = {
    status: status.INITIAL
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST:
            return {
                status: status.LOADING
            };
        case LOGIN_SUCCESS:
            return {
                status: status.SUCCESS,
                data: action.payload
            };
        case LOGIN_ERROR:
            return {
                status: status.ERROR,
                error: action.payload
            }
        default:
            return state;
    }
};

export default reducer;