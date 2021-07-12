export interface User {
    id: number,
    email: string,
    password: string,
    firstname: string,
    lastname: string
}

export interface UserSessionInfo {
    username: string,
    firstname: string,
    lastname: string,
    token: string,
    expiry: number
}