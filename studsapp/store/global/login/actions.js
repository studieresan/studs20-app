import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_INITIAL
} from './constants'; 

import { attemptLogin as apiLogin } from 'studsapp/utils/api';
import { removeData } from 'studsapp/utils/storage';

//actions
export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (result) => ({
    type: LOGIN_SUCCESS,
    payload: result
});

export const loginError = (errorString) => ({
    type: LOGIN_ERROR,
    payload: errorString
});

export const loginInitial = () => ({
    type: LOGIN_INITIAL
});

//thunks
export const setInitialLoginState = () => dispatch => {
    removeData('token')
        .then(result => dispatch(loginInitial()));
}

export const attemptLogin = (email, password) => dispatch => {
    dispatch(loginRequest());
    apiLogin({email, password})
        .then(result => dispatch(loginSuccess({ success: true, token: result.token })))
        .catch(error => {
            if(error.status === 401) {
                dispatch(loginSuccess({success: false}));
            } else {
                dispatch(loginError('Unexpected error when logging in. Please try again.'));
            }
        });
};