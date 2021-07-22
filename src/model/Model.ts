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

export interface MenuItem {
    id: string,
    name: string,
    href: string,
    displayName: string
}

export interface Client {
    id: string,
    name: string,
    address: string,
    city: string,
    zip: string,
    country: string
}

export enum ProjectStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    ARCHIVE = 2
}
export interface Project {
    id: string,
    name: string,
    status: number,
    description: string,
    customer: number,
    lead: number
}