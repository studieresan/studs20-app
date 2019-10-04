import {
    MEMBER_REQUEST,
    MEMBER_SUCCESS,
    MEMBER_ERROR
} from './constants';

import { fetchUsers } from 'studsapp/utils/api';

//actions
export const fetchMembersRequest = () => ({
    type: MEMBER_REQUEST
});

export const fetchMembersSuccess = (result) => ({
    type: MEMBER_SUCCESS,
    payload: result
});

export const fetchMembersError = (errorString) => ({
    type: MEMBER_ERROR,
    payload: errorString
});

//thunks
export const getMembers = () => dispatch => {
    dispatch(fetchMembersRequest);
    fetchUsers()
        .then(result => dispatch(fetchMembersSuccess(result)))
        .catch(error => {
            dispatch(fetchMembersError('Unexpected error when retrieving member information. Please try again.'));
        });
};