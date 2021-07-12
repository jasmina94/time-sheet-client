import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "../services/authenticationService";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser || Object.keys(currentUser).length === 0) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        return <Component {...props} />
    }} />
)