import {
    EVENTS_REQUEST,
    EVENTS_SUCCESS,
    EVENTS_ERROR
} from './constants';

import { fetchEvents } from 'studsapp/utils/api';

//actions
export const fetchEventsRequest = () => ({
    type: EVENTS_REQUEST
});

export const fetchEventsSuccess = (result) => ({
    type: EVENTS_SUCCESS,
    payload: result
});

export const fetchEventsError = (errorString) => ({
    type: EVENTS_ERROR,
    payload: errorString
});

//thunks
export const getEvents = () => dispatch => {
    dispatch(fetchEventsRequest);
    fetchEvents()
        .then(result => dispatch(fetchEventsSuccess(result)))
        .catch(error => {
            dispatch(fetchEventsError('Oväntat fel vid hämtning av eventinformation.'));
        });
};