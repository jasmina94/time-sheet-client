import { createBrowserHistory } from 'history';
import { useState, useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { tokenHelper } from '../helpers/tokenHelper';
import { PrivateRoute } from '../components/shared/PrivateRoute';
import { authenticationService } from '../services/api/authenticationService';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import ForgotPasswordPage from '../pages/forgotPassword/ForgotPasswordPage';
import { UserSessionInfo } from '../model/Model';

export const history = createBrowserHistory();

const initState: UserSessionInfo = {
    email: '',
    firstname: '',
    lastname: ''
};

const App = () => {
    const [token, setToken] = useState(authenticationService.tokenValue);
    const [userInfo, setUserInfo] = useState(initState);

    useEffect(() => {
        if (tokenHelper.isTokenExpired(token)) {
            authenticationService.logout();
        } else {
            setUserInfo(tokenHelper.getUserInfo(token));
        }

        authenticationService.token.subscribe(x => setToken(x));
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={() => <HomePage userInfo={userInfo} />} />
                <Route path="/login" component={LoginPage} />
                <Route path="/forgotPassword" component={ForgotPasswordPage} />
            </Switch>
        </Router>
    )
};

export { App };