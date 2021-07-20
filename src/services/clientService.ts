import { BehaviorSubject } from "rxjs";
import { getAuthHeader } from "../helpers/authHeader";
import { handleResponse } from "../api/ResponseHandler";
import { Client } from "../model/Model";
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_CLIENTS_PATH } = process.env;

const SERVER_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT;
const CLIENTS_PATH = SERVER_PATH + '' + REACT_APP_CLIENTS_PATH;

const clientsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('clients') || 'null'));

export const clientService = {
    read,
    create,
    update,
    remove,
    clients: clientsSubject.asObservable(),
    get clientsValue(): Client[] { return clientsSubject.value },
};

function read() {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader() };
    return fetch(CLIENTS_PATH, requestOptions)
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

function create(client: Client) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: client.name, address: client.address, city: client.city, zip: client.zip, country: client.country })
    };
    return fetch(CLIENTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            return { success: true, data: response.data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

function update(client: Client) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: client.name, address: client.address, city: client.city, zip: client.zip, country: client.country })
    };
    return fetch(CLIENTS_PATH + '/' + client.id, requestOptions)
        .then(handleResponse)
        .then(response => {
            return { success: true, data: response.data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

function remove(id: number) {
    let requestOptions: any = { method: 'DELETE', headers: getAuthHeader() };
    return fetch(CLIENTS_PATH + '/' + id, requestOptions)
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