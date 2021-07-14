export interface ApiResponse {
    success: boolean,
    error: string,
    data: any
}

export interface User {
    id: number,
    email: string,
    password: string,
    firstname: string,
    lastname: string
}

export interface UserSessionInfo {
    email: string,
    firstname: string,
    lastname: string
}