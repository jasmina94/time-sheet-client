import { authenticationService } from "../services/api/authenticationService";

export function getAuthHeader() {
    const jwtToken = authenticationService.tokenValue
    if (jwtToken && jwtToken !== '') {
        return { Authorization: `Bearer ${jwtToken}` };
    } else {
        return {};
    }
}