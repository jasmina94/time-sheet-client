import { User } from "../../model/Model";
import { tokenHelper } from "../../helpers/tokenHelper";
import { handleResponse } from "../../helpers/responseHandler";
import { conversionService } from "../conversionService";
const { REACT_APP_USERS_PATH } = process.env;
const { REACT_APP_RESET_PASSWORD_PATH } = process.env;

const USERS_PATH = REACT_APP_USERS_PATH ?? 'http://localhost:8000/users';
const RESET_PASSWORD_PATH = REACT_APP_RESET_PASSWORD_PATH ?? 'http://localhost:8000/password';

export const userService = {
    getAll,
    resetPassword,
};

function getAll() {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    return fetch(USERS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            let users: User[] = [];
            const data = response.data;
            data.forEach((item: any) => {
                users.push(conversionService.toUser(item));
            });

            return users;
        });
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