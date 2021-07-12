import { createBrowserHistory } from 'history';
import { useState } from 'react';
import { useEffect } from 'react';
import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import { Route, Router } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { authenticationService } from '../services/authenticationService';

export const history = createBrowserHistory();

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    const checkAuthUser = () => {
        let userExpired = false;
        const authUser = authenticationService.currentUserValue;
        if (authUser && Object.keys(authUser).length !== 0) {
            if (new Date().getTime() > authUser.expiry) {
                userExpired = true;
            }
        }
        return userExpired;
    }

    useEffect(() => {
        console.log('use effect app called');

        console.log(authenticationService.currentUserValue);
        console.log(authenticationService.currentUserValue.expiry);

        if (checkAuthUser()) {
            console.log('expires ... ');
            localStorage.removeItem('currentUser');
        }

        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    });

    return (
        <Router history={history}>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
        </Router>
    )
};

export { App };