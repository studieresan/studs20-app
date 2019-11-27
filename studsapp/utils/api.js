import { retrieveData } from 'studsapp/utils/storage';
import { apiBaseURL, mapboxToken } from 'studsapp/utils/config';

const BASE_URL = apiBaseURL;
const LOGIN = '/login';
const GRAPHQL = '/graphql';

const STATUS_OK = 200;
const STATUS_NOT_OK = 300;

const credentials = { credentials: 'include' };
const authorizationHeader = async () => {
    const token = await retrieveData('token');
    return {
        Authorization: `Bearer ${token}`
    };
};
const jsonHeader = { 'Content-Type': 'application/json' };
const graphQLHeader = { 'Content-Type': 'application/graphql' };

const checkStatus = (response) => {
    if (response.status >= STATUS_OK && response.status < STATUS_NOT_OK) {
        return response;
    } else {
        throw response;
    }
};

const executePOSTRequest = async (url, body) => {
    const response = await checkStatus(await fetch(BASE_URL + url, {
        method: 'POST',
        ...credentials,
        headers: {
            ...authorizationHeader,
            ...jsonHeader
        },
        body: JSON.stringify(body)
    }));
    return response.json();
};

const executeGETRequest = async (url) => {
    const response = await checkStatus(await fetch(BASE_URL + url, {
        method: 'GET',
        ...credentials,
        headers: {
            ...authorizationHeader,
            ...jsonHeader
        }
    }));
    return response.json();
};

const executePUTRequest = async (url, body) => {
    const response = await checkStatus(await fetch(BASE_URL + url, {
        method: 'PUT',
        ...credentials,
        headers: {
            ...authorizationHeader,
            ...jsonHeader
        },
        body: JSON.stringify(body)
    }));
    return response.json();
};

const executeGraphQLRequest = async (query) => {
    const authorization = await authorizationHeader();
    return fetch(BASE_URL + GRAPHQL, {
        method: 'POST',
        ...credentials,
        headers: {
            ...authorization,
            ...graphQLHeader
        },
        body: query
    })
        .then(checkStatus)
        .then(response => response.json());
};

const executeLoginRequest = (body) =>
    fetch(BASE_URL + LOGIN, {
        method: 'POST',
        ...credentials,
        headers: {
            ...jsonHeader
        },
        body: JSON.stringify(body)
    })
        .then(checkStatus)
        .then(response => response.json());

export const attemptLogin = (body) => {
    return executeLoginRequest(body);
};

const EVENT_FIELDS = `
  id
  company {
      name
  }
  date
`;

export const fetchEvents = async () => {
    const query = `query {
        allEvents {
            ${EVENT_FIELDS}
        }
    }`;
    const result = await executeGraphQLRequest(query);
    let events = result.data.allEvents;
    events = events.map(event => ({
        ...event,
        date: new Date(event.date)
    }));
    events = events.map(event => ({
        ...event,
        companyName: event.company.name
    }));
    const eventMap = {};
    events.forEach(event => eventMap[event.id] = event);
    return eventMap;
};

const EVENT_DETAILS_FIELDS = `
    id
    privateDescription
    beforeSurveys
    afterSurveys
    location
`;

export const fetchEventDetails = async (eventId) => {
    const query = `query {
        event (eventId: "${eventId}") {
            ${EVENT_DETAILS_FIELDS}
        }
    }`;
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
    const geocodingService = mbxGeocoding({
        accessToken: mapboxToken
    });
    const result = await executeGraphQLRequest(query);
    const event = result.data.event;
    const coordinatesResponse = await geocodingService.forwardGeocode({
        query: event.location,
        limit: 1,
    }).send();
    const coordinates = coordinatesResponse.body.features[0].geometry.coordinates;
    return {
        ...event,
        coordinates: coordinates
    };
};

const CHECK_IN_DETAILS = `
    id
    notCheckedInUsers {
        id
    }
    checkedInUsers {
        id
    }
`;

export const fetchCheckInDetails = async (eventId) => {
    const query = `query {
        event (eventId: "${eventId}") {
            ${CHECK_IN_DETAILS}
        }
    }`;
    const result = await executeGraphQLRequest(query);
    return result.data.event;
};

export const postCheckIn = async (eventID) => {
    const mutation = `
        mutation {
            checkIn(eventId: "${eventID}")
        }
    `;
    const result = await executeGraphQLRequest(mutation);
    return result;
}

const USER_PROFILE_FIELDS = `
  userRole
  firstName
  lastName
  phone
`;

export const fetchUsers = () => {
    const query = `{
        users {
            id,
            profile { ${USER_PROFILE_FIELDS} }
        }
    }`;
    return executeGraphQLRequest(query)
        .then(result => {
            return result.data.users;
        })
        .then(members => {
            const memberMap = {};
            members.forEach(member => memberMap[member.id] = member);
            return memberMap;
        });
};
