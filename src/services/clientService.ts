import { BehaviorSubject } from "rxjs";
import { getAuthHeader } from "../helpers/authHeader";
import { handleResponse } from "../api/ResponseHandler";
import { Client } from "../model/Model";
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_GET_CLIENTS_PATH } = process.env;

const SERVER_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT;
const GET_ALL_CLIENTS_PATH = SERVER_PATH + '' + REACT_APP_GET_CLIENTS_PATH;

const clientsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('clients') || 'null'));

export const clientService = {
    getAll,
    clients: clientsSubject.asObservable(),
    get clientsValue(): Client[] { return clientsSubject.value },
};

function getAll() {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader() };
    return fetch(GET_ALL_CLIENTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            let data = response.data;
            localStorage.setItem('clients', JSON.stringify(data));
            clientsSubject.next(data);

            return { success: true, data: data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}