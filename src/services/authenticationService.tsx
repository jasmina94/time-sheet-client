import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../api/ResponseHandler";
import { Response, UserSessionInfo } from "../model/Model";
const { REACT_APP_DEFAULT_EXPIRATION_TIME } = process.env;
const { REACT_APP_EXTENDED_EXPIRATION_TIME } = process.env;
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_LOGIN_PATH } = process.env;

const DEFAULT_SESSION_EXPIRATION = REACT_APP_DEFAULT_EXPIRATION_TIME ? parseInt(REACT_APP_DEFAULT_EXPIRATION_TIME) : 1234;
const EXTENDED_SESSION_EXPIRATION = REACT_APP_EXTENDED_EXPIRATION_TIME ? parseInt(REACT_APP_EXTENDED_EXPIRATION_TIME) : 12345;

const LOGIN_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT + REACT_APP_LOGIN_PATH;

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue(): UserSessionInfo { return currentUserSubject.value },
};

function login(email: string, password: string, rememberMe: boolean) {
    let ret: Response;
    const expirationTime = rememberMe ? EXTENDED_SESSION_EXPIRATION : DEFAULT_SESSION_EXPIRATION;

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    return fetch(LOGIN_PATH, request)
        .then(handleResponse)
        .then(response => {
            let userInfo: UserSessionInfo = {
                username: response.user.email,
                firstname: response.user.firstname,
                lastname: response.user.lastname,
                token: response.token,
                expiry: new Date().getTime() + expirationTime
            };

            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            currentUserSubject.next(userInfo);

            ret = { success: true, data: userInfo, error: '' };

            return ret;
        })
        .catch(error => {
            ret = { success: false, data: {}, error }
            return ret;
        });
}


function logout() {
    currentUserSubject.next(null);
    localStorage.clear();
}