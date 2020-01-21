import { combineReducers } from 'redux';
import loginReducer from 'studsapp/store/global/login/reducer';

export default combineReducers({
    login: loginReducer
});