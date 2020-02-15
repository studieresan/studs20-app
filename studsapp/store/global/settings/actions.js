import {SET_OFFLINE_MODE} from './constants';

//actions
export const setOfflineMode = offlineMode => ({
    type: SET_OFFLINE_MODE,
    payload: offlineMode,
});
