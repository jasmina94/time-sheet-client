import { getAuthHeader } from "../helpers/authHeader";
import { ApiConfig } from "../api/ApiConfig";
import { handleResponse } from "../api/ResponseHandler";

export const userService = {
    getAll,
    getById
};

function getAll()  {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader()};
    return fetch(ApiConfig.users.get, requestOptions).then(handleResponse)
}

function getById() {

}