import { combineReducers } from 'redux';

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
    root: rootReducer
});