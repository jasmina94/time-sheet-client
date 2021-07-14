import { createBrowserHistory } from 'history';
import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Router } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { authenticationService } from '../services/authenticationService';

import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import ForgotPasswordPage from '../forgotPassword/ForgotPasswordPage';

export const history = createBrowserHistory();

const App = () => {
    const [token, setToken] = useState(authenticationService.tokenValue);

    useEffect(() => {
        authenticationService.token.subscribe(x => setToken(x));
    }, [token]);

    return (
        <Router history={history}>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgotPassword" component={ForgotPasswordPage} />
        </Router>
    )
};

export { App };