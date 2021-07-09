import { createBrowserHistory } from 'history';
import { useState } from 'react';
import { useEffect } from 'react';
import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import { Route, Router } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { authenticationService } from '../services/authenticationService';

export const history = createBrowserHistory();

const initialState = {
    isLoggedIn: false,
    currentUser: null
};

/*
** App component -> container forw other parts.
** Strores logic for state and neccessary information about logged in user.
*/
const App = () => {
    const [isLoggedIn, setLoggedIn] = useState(initialState.isLoggedIn);
    const [currentUser, setCurrentUser] = useState(initialState.currentUser);

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    });

    const logout = () => {
        authenticationService.logout()
        history.push('/login');
    };

    return (
        <Router history={history}>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
        </Router>
    )
};


export { App };