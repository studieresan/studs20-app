import { combineReducers } from 'redux';
import loginReducer from 'studsapp/store/global/login/reducer';
import eventListReducer from 'studsapp/store/global/eventList/reducer';
import authenticationReducer from 'studsapp/store/global/authentication/reducer';

export default combineReducers({
    login: loginReducer,
    eventList: eventListReducer,
    authentication: authenticationReducer
});