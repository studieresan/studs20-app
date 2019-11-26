import {
    EVENTS_REQUEST,
    EVENTS_SUCCESS,
    EVENTS_ERROR,
    EVENTS_UPDATE_REQUEST,
    EVENTS_UPDATE_SUCCESS
} from './constants';

import { fetchEvents, fetchEventDetails } from 'studsapp/utils/api';

//actions
export const fetchEventsRequest = () => ({
    type: EVENTS_REQUEST,
});

export const fetchEventsSuccess = (result) => ({
    type: EVENTS_SUCCESS,
    payload: result
});

export const fetchEventsError = (errorString) => ({
    type: EVENTS_ERROR,
    payload: errorString
});

export const fetchEventsUpdateRequest = () => ({
    type: EVENTS_UPDATE_REQUEST,
});

export const fetchEventsUpdateSuccess = (result) => ({
    type: EVENTS_UPDATE_SUCCESS,
    payload: result
});

//thunks
export const getEvents = () => dispatch => {
    dispatch(fetchEventsRequest());
    fetchEvents()
        .then(result => dispatch(fetchEventsSuccess(result)))
        .catch(error => {
            dispatch(fetchEventsError('Oväntat fel vid hämtning av eventinformation.'));
        });
};

export const getEventDetails = (eventId) => dispatch => {
    dispatch(fetchEventsUpdateRequest());
    fetchEventDetails(eventId)
        .then(result => dispatch(fetchEventsUpdateSuccess(result)))
        .catch(error => {
            console.log(error);
            dispatch(fetchEventsError('Oväntat fel vid hämtning av eventinformation.'));
        });
};