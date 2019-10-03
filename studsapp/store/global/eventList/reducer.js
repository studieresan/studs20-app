import { status } from 'studsapp/store/constants';

const defaultState = {
    status: status.INITIAL
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default reducer;