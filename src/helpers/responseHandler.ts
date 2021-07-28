import { authenticationService } from '../services/api/authenticationService';

const UNAUTH = [401, 403];

export function handleResponse(response: any) {
    return response.text()
        .then((text: any) => {
            const data = text && JSON.parse(text);

            if (!response.ok) {
                const status = response.status;
                if (UNAUTH.indexOf(status) !== -1) {
                    authenticationService.logout();
                }

                const error = (data && data.error) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}