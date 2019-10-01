import { combineReducers } from 'redux';
import loginReducer from './global/login/reducer'

const defaultState = {
    status: 'LOADING...'
};

const rootReducer = (state = defaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    login: loginReducer
});