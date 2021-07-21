import { BehaviorSubject } from "rxjs";
import { getAuthHeader } from "../../helpers/authHeader";
import { Project } from "../../model/Model";
import { handleResponse } from "./ResponseHandler";
const { REACT_APP_SERVER_PATH } = process.env;
const { REACT_APP_SERVER_PORT } = process.env;
const { REACT_APP_PROJECTS_PATH } = process.env;

const SERVER_PATH = REACT_APP_SERVER_PATH + ':' + REACT_APP_SERVER_PORT;
const PROJECTS_PATH = SERVER_PATH + '' + REACT_APP_PROJECTS_PATH;

const projectsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('projects') || 'null'));

export const projectService = {
    read,
    create,
    update,
    remove,
    projects: projectsSubject.asObservable(),
    get projectsValue(): Project[] { return projectsSubject.value },
};

function read() {
    const requestOptions: any = { method: 'GET', headers: getAuthHeader() };
    return fetch(PROJECTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            let data = response.data;
            localStorage.setItem('projects', JSON.stringify(data));
            projectsSubject.next(data);

            return { success: true, data: data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

function create(project: Project) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(PROJECTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => {
            return { success: true, data: response.data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

function update(project: Project) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    };
    return fetch(PROJECTS_PATH + '/' + project.id, requestOptions)
        .then(handleResponse)
        .then(response => {
            return { success: true, data: response.data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

//TODO: Try to make delete method to return EMPTY content
function remove(id: number) {
    let requestOptions: any = { method: 'DELETE', headers: getAuthHeader() };
    return fetch(PROJECTS_PATH + '/' + id, requestOptions)
        .then(handleResponse)
        .then(response => {
            let data = response.data;
            localStorage.setItem('projects', JSON.stringify(data));
            projectsSubject.next(data);

            return { success: true, data: data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

