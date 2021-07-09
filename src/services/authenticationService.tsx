import { BehaviorSubject } from "rxjs";
import { ApiConfig } from "../api/ApiConfig";
import { handleResponse} from "../api/ResponseHandler";


const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(email: string, password: string) {
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${ApiConfig}/user/authenticate`, request)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}


function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}