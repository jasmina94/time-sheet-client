import { getAuthHeader } from "../helpers/authHeader";
import { handleResponse } from "../api/ResponseHandler";
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_GET_USERS_PATH } = process.env;

const GET_ALL_USERS_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT + REACT_APP_GET_USERS_PATH;

export const userService = {
    getAll,
    getById
};

function getAll()  {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader()};
    return fetch(GET_ALL_USERS_PATH, requestOptions).then(handleResponse)
}

function getById() {

}