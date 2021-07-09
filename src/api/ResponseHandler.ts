import { authenticationService } from "../services/authenticationService";

const UNAUTH = [401, 403];

export function handleResponse(response: any) {
    console.log(response);
    return response.text()
        .then((text: any) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const status = response.status;
                if (UNAUTH.includes(status)) {
                    authenticationService.logout();
                    window.location.reload();
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}