import { getAuthHeader } from "../helpers/authHeader";
import { handleResponse } from "../api/ResponseHandler";
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_GET_CLIENTS_PATH } = process.env;

const SERVER_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT;
const GET_ALL_CLIENTS_PATH = SERVER_PATH + '' + REACT_APP_GET_CLIENTS_PATH;

export const userService = {
    getAll
};

function getAll() {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader() };
    return fetch(REACT_APP_GET_CLIENTS_PATH, requestOptions).then(handleResponse);
}