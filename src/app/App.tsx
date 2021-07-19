import { createBrowserHistory } from 'history';
import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { authenticationService } from '../services/authenticationService';
import jwtDecode from 'jwt-decode';
import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import ForgotPasswordPage from '../forgotPassword/ForgotPasswordPage';
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

    const checkUserExpiration = () => {
        let userExpired = false;
        if (token && Object.keys(token).length !== 0) {
            const decoded: any = jwtDecode(token);
            const now = Date.now() / 1000;
            if (decoded.exp < now) {
                userExpired = true;
            }
        } else {
            userExpired = true;
        }

        return userExpired;
    }

    useEffect(() => {
        if (checkUserExpiration()) {
            authenticationService.logout();
        } else {
            const decoded: any = jwtDecode(token);
            setUserInfo(decoded.userInfo);
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