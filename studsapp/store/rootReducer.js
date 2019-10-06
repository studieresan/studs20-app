import { combineReducers } from 'redux';
import globalReducer from 'studsapp/store/global/reducer';
import eventReducer from 'studsapp/store/eventList/reducer';
import memberReducer from 'studsapp/store/memberList/reducer';

export default combineReducers({
    global: globalReducer,
    events: eventReducer,
    members: memberReducer
});