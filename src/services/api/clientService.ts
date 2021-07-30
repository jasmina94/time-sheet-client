import { BehaviorSubject } from 'rxjs';
import { tokenHelper } from '../../helpers/tokenHelper'
import { handleResponse } from '../../helpers/responseHandler';
import { ApiResponse, Client } from '../../model/Model';
const { REACT_APP_CLIENTS_PATH } = process.env;

const CLIENTS_PATH = REACT_APP_CLIENTS_PATH ?? 'http//localhost:8000/clients';

const clientsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('clients') || 'null'));

export const clientService = {
    read,
    create,
    update,
    remove,
    readAll,
    clients: clientsSubject.asObservable(),
    get clientsValue(): Client[] { return clientsSubject.value },
};

function readAll() {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    return fetch(CLIENTS_PATH + '/all', requestOptions)
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

function read(page: number, perPage: number, term: string = '') {
    let result: ApiResponse;
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    const path = getReadPath(page, perPage, term);

    return fetch(path, requestOptions)
        .then(handleResponse)
        .then(response => {
            let clients = response.clients;
            let numOfPages = response.numOfPages;

            localStorage.setItem('clients', JSON.stringify(clients));
            clientsSubject.next(clients);

            result = { success: true, data: { clients, numOfPages }, error: '' };

            return result;
        })
        .catch(error => {
            result = { success: false, data: {}, error: error };

            return result;
        })
}

function create(client: Client) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
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
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
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

function remove(clientId: number) {
    let requestOptions: any = { method: 'DELETE', headers: tokenHelper.getAuthHeader() };

    return fetch(CLIENTS_PATH + '/' + clientId, requestOptions)
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

function getReadPath(page: number, limit: number, searchTerm: string) {
    let path = CLIENTS_PATH + '?page=' + page + '&limit=' + limit;
    path += searchTerm ? '&term=' + searchTerm.trim() : '';
    return path;
}