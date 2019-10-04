import {
    FETCH_EVENTS_REQUEST,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_ERROR
} from './constants';

import { fetchEvents } from 'studsapp/utils/api';

//actions
export const fetchEventsRequest = () => ({
    type: FETCH_EVENTS_REQUEST
});

export const fetchEventsSuccess = (result) => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: result
});

export const fetchEventsError = (errorString) => ({
    type: FETCH_EVENTS_ERROR,
    payload: errorString
});

//thunks
export const getEvents = () => dispatch => {
    dispatch(fetchEventsRequest);
    fetchEvents()
        .then(result => dispatch(fetchEventsSuccess({ success: true, events: result })))
        .catch(error => {
            dispatch(fetchEventsError('Unexpected error when retrieving event information. Please try again.'));
        });
};