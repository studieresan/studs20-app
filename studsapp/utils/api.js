const BASE_URL = process.env.API_BASE_URL || 'http://192.168.1.193:5040';
const LOGIN = '/login';

const STATUS_OK = 200;
const STATUS_NOT_OK = 300;

const credentials = {credentials: 'include'};
const authorizationHeader = {}; //TODO
const jsonHeader = {'Content-Type': 'application/json'};

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
    .then(response =>  response.json())

export const attemptLogin = (body) => {
    return executeLoginRequest(body);
};
