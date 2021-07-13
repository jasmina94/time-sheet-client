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

    const checkUserExpiration = () => {
        let userExpired = true;
        const authUser = authenticationService.currentUserValue;
        if (authUser && Object.keys(authUser).length !== 0) {
            if (new Date().getTime() <= authUser.expiry) {
                userExpired = false;
            }
        }
        return userExpired;
    }

    useEffect(() => {
        if (checkUserExpiration()) {
            console.log('Session expires ... ');
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