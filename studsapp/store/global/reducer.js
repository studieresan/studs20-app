import {combineReducers} from 'redux';
import loginReducer from 'studsapp/store/global/login/reducer';
import settingReducer from 'studsapp/store/global/settings/reducer';

export default combineReducers({
    login: loginReducer,
    settings: settingReducer,
});
