import { combineReducers } from 'redux';
import loginReducer from 'studsapp/store/global/login/reducer';
import eventListReducer from 'studsapp/store/global/eventList/reducer';

export default combineReducers({
    login: loginReducer,
    events: eventListReducer
});