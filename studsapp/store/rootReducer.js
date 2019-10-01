import { combineReducers } from 'redux';
import globalReducer from 'studsapp/store/global/reducer'

export default combineReducers({
    global: globalReducer
});