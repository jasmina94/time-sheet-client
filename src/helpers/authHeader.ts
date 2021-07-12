import { UserSessionInfo } from "../model/User";
import { authenticationService } from "../services/authenticationService";

export function getAuthHeader() {
    const currentUser: UserSessionInfo = authenticationService.currentUserValue
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}

export const DEFAULT_EXPIRATION_TIME = 20; //default expiration time 20s
export const EXTENDED_EXPIRATION_TIME = 30; 