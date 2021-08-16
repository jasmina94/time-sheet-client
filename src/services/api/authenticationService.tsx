import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../../helpers/responseHandler';
import { ApiResponse } from '../../model/Model';
const { REACT_APP_LOGIN_PATH } = process.env;

const LOGIN_PATH = REACT_APP_LOGIN_PATH ?? 'http//localhost:8000/login';
const tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token') || 'null'));

export const authenticationService = {
    login,
    logout,
    token: tokenSubject.asObservable(),
    get tokenValue(): string { return tokenSubject.value },
};

function login(email: string, password: string, remember: boolean) {
    let ret: ApiResponse;

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
    };

    return fetch(LOGIN_PATH, request)
        .then(handleResponse)
        .then(response => {
            let token = response.token;
            localStorage.setItem('token', JSON.stringify(token));
            tokenSubject.next(token);

            ret = { success: true, data: token, error: '' };

            return ret;
        })
        .catch(error => {
            ret = { success: false, data: {}, error }
            return ret;
        });
}


function logout() {
    tokenSubject.next(null);
    localStorage.clear();
}