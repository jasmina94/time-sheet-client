import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "../../services/api/authenticationService";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const jwtToken = authenticationService.tokenValue;
        if (!jwtToken || Object.keys(jwtToken).length === 0) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        return <Component {...props} />
    }} />
)