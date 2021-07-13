import { UserSessionInfo } from "../model/Model";
import { authenticationService } from "../services/authenticationService";

export const DEFAULT_EXPIRATION_TIME = 2 * 60 * 1000; // 2 minutes
export const EXTENDED_EXPIRATION_TIME = 5 * DEFAULT_EXPIRATION_TIME; // 10 minutes

export function getAuthHeader() {
    const currentUser: UserSessionInfo = authenticationService.currentUserValue
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}