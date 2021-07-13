import { BehaviorSubject } from "rxjs";
import { ApiConfig } from "../api/ApiConfig";
import { handleResponse } from "../api/ResponseHandler";
import { DEFAULT_EXPIRATION_TIME, EXTENDED_EXPIRATION_TIME } from "../helpers/authHeader";
import { Response, UserSessionInfo } from "../model/Model";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue():  UserSessionInfo { return currentUserSubject.value },
};

function login(email: string, password: string, rememberMe: boolean) {
    let ret: Response;
    const expirationTime = rememberMe ? EXTENDED_EXPIRATION_TIME : DEFAULT_EXPIRATION_TIME;
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    return fetch(ApiConfig.autenticate, request)
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

            ret = { success: true, data: userInfo, error: ''};

            return ret;
        })
        .catch(error => { 
            ret = { success: false, data: {}, error}
            return ret;
        });
}


function logout() {
    currentUserSubject.next(null);
    localStorage.clear();
}