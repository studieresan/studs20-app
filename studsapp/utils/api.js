import { retrieveData } from 'studsapp/utils/storage';

const BASE_URL = process.env.API_BASE_URL || 'https://studs18-overlord.herokuapp.com';//'http://localhost:5040';
const LOGIN = '/login';
const GRAPHQL = '/graphql';

const STATUS_OK = 200;
const STATUS_NOT_OK = 300;

const credentials = {credentials: 'include'};
const authorizationHeader = async () => {
    const token = await retrieveData('token');
    return {
        Authorization: `Bearer ${token}`
    };
};
const jsonHeader = {'Content-Type': 'application/json'};
const graphQLHeader = {'Content-Type': 'application/graphql'};

const checkStatus = (response) => {
    if(response.status >= STATUS_OK && response.status < STATUS_NOT_OK) {
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
    .then(response =>  response.json());

export const attemptLogin = (body) => {
    return executeLoginRequest(body);
};

const EVENT_FIELDS = `
  id
  companyName
  schedule
  privateDescription
  publicDescription
  date
  beforeSurveys
  afterSurveys
  location
  pictures
  published
  responsible
`;

export const fetchEvents = () => {
    const query = `query {
        allEvents {
            ${EVENT_FIELDS}
        }
    }`;
    return executeGraphQLRequest(query)
        .then(result => result.data.allEvents)
        .then(events => events.map(event => ( {
            ...event, 
            date: new Date(event.date)
        })));
};
