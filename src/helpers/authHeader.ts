import { UserSessionInfo } from "../model/Model";
import { authenticationService } from "../services/authenticationService";

export function getAuthHeader() {
    const currentUser: UserSessionInfo = authenticationService.currentUserValue
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}