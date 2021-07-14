import { authenticationService } from "../services/authenticationService";

export function getAuthHeader() {
    const jwtToken = authenticationService.tokenValue
    if (jwtToken && jwtToken !== '') {
        return { Authorization: `Bearer ${jwtToken}` };
    } else {
        return {};
    }
}