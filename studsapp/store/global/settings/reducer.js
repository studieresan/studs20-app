import {SET_OFFLINE_MODE} from './constants';

const defaultState = {
    offlineMode: false,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_OFFLINE_MODE:
            return {
                offlineMode: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
