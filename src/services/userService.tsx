import { getAuthHeader } from "../helpers/authHeader";
import { handleResponse } from "../api/ResponseHandler";
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_GET_USERS_PATH } = process.env;
const { REACT_APP_RESET_PASSWORD_PATH } = process.env;

const SERVER_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT;
const GET_ALL_USERS_PATH = SERVER_PATH + '' + REACT_APP_GET_USERS_PATH;
const RESET_PASSWORD_PATH = SERVER_PATH + '' + REACT_APP_RESET_PASSWORD_PATH;

export const userService = {
    getAll,
    resetPassword,
};

function getAll() {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader() };
    return fetch(GET_ALL_USERS_PATH, requestOptions).then(handleResponse);
}

function resetPassword(email: string) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
    };

    return fetch(RESET_PASSWORD_PATH, request)
        .then(handleResponse)
        .then(response => {
            return { success: true, error: '', data: response.password }
        })
        .catch(error => {
            console.log(error);
            return { success: false, error: error, data: {} }
        });
}